import tkinter as tk
import ttkbootstrap as ttk
from src.database import get_db
from src.models.models import Team, Tournament, User, TeamMember
from src.views.base_view import BaseView
from sqlalchemy.orm import Session
import re
from tkinter import messagebox
from datetime import datetime

class TeamManagement(BaseView):
    def __init__(self, master):
        super().__init__(master)
        self.create_widgets()
        self.load_tournaments()

    def create_widgets(self):
        # Titre et recherche
        header_frame = ttk.Frame(self)
        header_frame.pack(fill='x', pady=10)
        
        title_frame = ttk.Frame(header_frame)
        title_frame.pack(side='left', fill='x', expand=True)
        
        title = ttk.Label(
            title_frame,
            text="Gestion des Équipes",
            font=("Helvetica", 16, "bold")
        )
        title.pack(side='left', padx=10)
        
        # Zone de recherche
        search_frame = ttk.Frame(header_frame)
        search_frame.pack(side='right', padx=10)
        
        ttk.Label(search_frame, text="Rechercher:").pack(side='left')
        self.search_var = tk.StringVar()
        self.search_var.trace('w', self.filter_view)
        ttk.Entry(search_frame, textvariable=self.search_var).pack(side='left', padx=5)
        
        # Bouton retour
        ttk.Button(
            header_frame,
            text="Retour au Dashboard",
            command=self.back_to_dashboard,
            style='primary.TButton'
        ).pack(side='right', padx=10)
        
        # Frame principal
        main_frame = ttk.Frame(self)
        main_frame.pack(fill='both', expand=True, padx=10, pady=10)
        
        # Treeview pour afficher la hiérarchie tournois/équipes/membres
        self.tree = ttk.Treeview(main_frame, columns=('members', 'teams'), show='tree headings')
        self.tree['columns'] = ('ID', 'Nom', 'Membres', 'Date de création')
        
        # Configuration des colonnes
        self.tree.column('#0', width=300)  # Colonne pour la hiérarchie
        self.tree.column('ID', width=0, stretch=tk.NO)
        self.tree.column('Nom', width=200)
        self.tree.column('Membres', width=200)
        self.tree.column('Date de création', width=150)
        
        self.tree.heading('#0', text='Nom')
        self.tree.heading('ID', text='ID')
        self.tree.heading('Nom', text='Nom')
        self.tree.heading('Membres', text='Membres')
        self.tree.heading('Date de création', text='Date de création')
        
        # Scrollbar
        scrollbar = ttk.Scrollbar(main_frame, orient='vertical', command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        # Placement des widgets
        self.tree.pack(side='left', fill='both', expand=True)
        scrollbar.pack(side='right', fill='y')
        
        # Frame pour les boutons d'action
        buttons_frame = ttk.Frame(self)
        buttons_frame.pack(fill='x', padx=10, pady=10)
        
        ttk.Button(
            buttons_frame,
            text="Nouvelle Équipe",
            command=self.create_team,
            style='success.TButton'
        ).pack(side='left', padx=5)
        
        ttk.Button(
            buttons_frame,
            text="Modifier",
            command=self.edit_team,
            style='info.TButton'
        ).pack(side='left', padx=5)
        
        ttk.Button(
            buttons_frame,
            text="Supprimer",
            command=self.delete_team,
            style='danger.TButton'
        ).pack(side='left', padx=5)

    def load_tournaments(self):
        try:
            db = get_db()
            tournaments = db.query(Tournament).all()
            
            # Nettoyer l'arbre
            for item in self.tree.get_children():
                self.tree.delete(item)
            
            # Ajouter les tournois et leurs équipes
            for tournament in tournaments:
                # Compter les équipes et membres pour ce tournoi
                teams = db.query(Team).filter_by(tournamentId=tournament.id).all()
                teams_count = len(teams)
                members_count = db.query(TeamMember).join(Team).filter(Team.tournamentId == tournament.id).count()
                
                # Créer l'entrée du tournoi
                tournament_id = self.tree.insert('', 'end', 
                    text=f"{tournament.tournamentName}",
                    values=(tournament.id, tournament.tournamentName, f"{members_count} membre{'s' if members_count > 1 else ''}", ''),
                    tags=('tournament',))
                
                # Ajouter les équipes du tournoi
                for team in teams:
                    # Compter les membres de l'équipe
                    team_members = db.query(TeamMember).filter(TeamMember.teamId == team.id).all()
                    team_members_count = len(team_members)
                    
                    # Créer l'entrée de l'équipe
                    team_id = self.tree.insert(tournament_id, 'end',
                        text=f"{team.teamName}",
                        values=(team.id, team.teamName, f"{team_members_count} membre{'s' if team_members_count > 1 else ''}", team.createdAt.strftime('%Y-%m-%d %H:%M') if team.createdAt else ''),
                        tags=('team',))
                    
                    # Ajouter les membres de l'équipe
                    for member in team_members:
                        user = db.query(User).filter_by(id=member.userId).first()
                        if user:
                            self.tree.insert(team_id, 'end',
                                text=f"{user.pseudo}",
                                values=('', '', '', ''),
                                tags=('member',))
            
            db.close()
        except Exception as e:
            messagebox.showerror("Erreur", f"Erreur lors du chargement des tournois : {str(e)}")

    def filter_view(self, *args):
        search_term = self.search_var.get().lower()
        self.load_tournaments()  # Recharger tous les éléments
        
        if not search_term:
            return
        
        # Parcourir tous les éléments et cacher ceux qui ne correspondent pas
        def check_item(item):
            text = self.tree.item(item)['text'].lower()
            if re.search(search_term, text):
                return True
            
            # Vérifier les enfants
            for child in self.tree.get_children(item):
                if check_item(child):
                    return True
            
            return False
        
        # Parcourir les éléments racine
        for item in self.tree.get_children():
            if not check_item(item):
                self.tree.detach(item)  # Cacher l'élément
            else:
                # Développer l'arbre si un élément correspond
                self.tree.item(item, open=True)
                for child in self.tree.get_children(item):
                    if check_item(child):
                        self.tree.item(child, open=True)

    def get_tournaments(self):
        try:
            db = get_db()
            tournaments = db.query(Tournament).all()
            db.close()
            return tournaments
        except Exception as e:
            messagebox.showerror("Erreur", f"Erreur lors de la récupération des tournois : {str(e)}")

    def create_team(self):
        try:
            db = get_db()
            tournaments = db.query(Tournament).all()
            db.close()
        except Exception as e:
            messagebox.showerror("Erreur", f"Erreur lors de la récupération des tournois : {str(e)}")
            return
        
        if not tournaments:
            messagebox.showerror("Erreur", "Aucun tournoi n'existe. Veuillez d'abord créer un tournoi.")
            return
        
        # Créer une nouvelle fenêtre pour le formulaire
        dialog = ttk.Toplevel(self)
        dialog.title("Nouvelle Équipe")
        dialog.geometry("400x300")
        
        # Variables
        name_var = tk.StringVar()
        tournament_var = tk.StringVar()
        tournament_map = {t.tournamentName: t.id for t in tournaments}
        
        # Formulaire
        ttk.Label(dialog, text="Nom de l'équipe:").pack(pady=5)
        ttk.Entry(dialog, textvariable=name_var).pack(pady=5)
        
        ttk.Label(dialog, text="Tournoi:").pack(pady=5)
        tournament_combo = ttk.Combobox(dialog, textvariable=tournament_var)
        tournament_combo['values'] = list(tournament_map.keys())
        tournament_combo.set(tournament_combo['values'][0] if tournament_combo['values'] else '')
        tournament_combo.pack(pady=5)
        
        # Boutons
        buttons_frame = ttk.Frame(dialog)
        buttons_frame.pack(pady=20)
        
        def save():
            name = name_var.get().strip()
            tournament_id = tournament_map.get(tournament_var.get())
            
            if not name or not tournament_id:
                messagebox.showerror("Erreur", "Veuillez remplir tous les champs")
                return
            
            try:
                db = get_db()
                new_team = Team(teamName=name, tournamentId=tournament_id)
                db.add(new_team)
                db.commit()
                db.close()
                dialog.destroy()
                self.load_tournaments()
                messagebox.showinfo("Succès", "Équipe créée avec succès")
            except Exception as e:
                db.rollback()
                db.close()
                messagebox.showerror("Erreur", str(e))
        
        ttk.Button(
            buttons_frame,
            text="Annuler",
            command=dialog.destroy,
            style='danger.TButton'
        ).pack(side='left', padx=5)
        
        ttk.Button(
            buttons_frame,
            text="Créer",
            command=save,
            style='success.TButton'
        ).pack(side='left', padx=5)

    def edit_team(self):
        # Vérifier qu'une équipe est sélectionnée
        selection = self.tree.selection()
        if not selection or 'team' not in self.tree.item(selection[0])['tags']:
            messagebox.showwarning("Attention", "Veuillez sélectionner une équipe à modifier")
            return
        
        # Récupérer l'équipe sélectionnée et la liste des tournois
        team_name = self.tree.item(selection[0])['text']
        
        try:
            db = get_db()
            team = db.query(Team).filter_by(teamName=team_name).first()
            tournaments = db.query(Tournament).all()
            db.close()
        except Exception as e:
            messagebox.showerror("Erreur", f"Erreur lors de la récupération des données : {str(e)}")
            return
        
        if not team:
            messagebox.showerror("Erreur", "Équipe non trouvée")
            return
        
        # Créer une nouvelle fenêtre pour le formulaire
        dialog = ttk.Toplevel(self)
        dialog.title("Modifier l'équipe")
        dialog.geometry("400x300")
        
        # Variables
        name_var = tk.StringVar(value=team.teamName)
        tournament_var = tk.StringVar()
        tournament_map = {t.tournamentName: t.id for t in tournaments}
        
        # Trouver le nom du tournoi actuel
        current_tournament = next((t for t in tournaments if t.id == team.tournamentId), None)
        if current_tournament:
            tournament_var.set(current_tournament.tournamentName)
        
        # Formulaire
        ttk.Label(dialog, text="Nom de l'équipe:").pack(pady=5)
        ttk.Entry(dialog, textvariable=name_var).pack(pady=5)
        
        ttk.Label(dialog, text="Tournoi:").pack(pady=5)
        tournament_combo = ttk.Combobox(dialog, textvariable=tournament_var)
        tournament_combo['values'] = list(tournament_map.keys())
        tournament_combo.pack(pady=5)
        
        # Boutons
        buttons_frame = ttk.Frame(dialog)
        buttons_frame.pack(pady=20)
        
        def save():
            name = name_var.get().strip()
            tournament_id = tournament_map.get(tournament_var.get())
            
            if not name or not tournament_id:
                messagebox.showerror("Erreur", "Veuillez remplir tous les champs")
                return
            
            try:
                db = get_db()
                team.teamName = name
                team.tournamentId = tournament_id
                db.commit()
                db.close()
                dialog.destroy()
                self.load_tournaments()
                messagebox.showinfo("Succès", "Équipe mise à jour avec succès")
            except Exception as e:
                db.rollback()
                db.close()
                messagebox.showerror("Erreur", str(e))
        
        ttk.Button(
            buttons_frame,
            text="Annuler",
            command=dialog.destroy,
            style='danger.TButton'
        ).pack(side='left', padx=5)
        
        ttk.Button(
            buttons_frame,
            text="Enregistrer",
            command=save,
            style='success.TButton'
        ).pack(side='left', padx=5)

    def delete_team(self):
        # Vérifier qu'une équipe est sélectionnée
        selection = self.tree.selection()
        if not selection or 'team' not in self.tree.item(selection[0])['tags']:
            messagebox.showwarning("Attention", "Veuillez sélectionner une équipe à supprimer")
            return
        
        # Demander confirmation
        if not messagebox.askyesno("Confirmation", "Êtes-vous sûr de vouloir supprimer cette équipe ?"):
            return
        
        # Récupérer l'équipe sélectionnée
        team_name = self.tree.item(selection[0])['text']
        
        try:
            db = get_db()
            team = db.query(Team).filter_by(teamName=team_name).first()
            
            if team:
                db.delete(team)
                db.commit()
                db.close()
                self.load_tournaments()
                messagebox.showinfo("Succès", "Équipe supprimée avec succès")
        except Exception as e:
            db.rollback()
            db.close()
            messagebox.showerror("Erreur", str(e))
