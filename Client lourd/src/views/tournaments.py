from datetime import datetime
import tkinter as tk
from tkinter import ttk, messagebox
import ttkbootstrap as ttk
from sqlalchemy.orm import Session
from src.database import get_db
from src.models.models import Tournament, Game, TournamentType, TournamentStatus
from src.views.base_view import BaseView

class TournamentManagement(BaseView):
    def __init__(self, master):
        super().__init__(master)
        self.selected_status = tk.StringVar(value="Tous")
        self.create_widgets()
        self.load_tournaments()

    def create_widgets(self):
        # Titre et recherche
        header_frame = ttk.Frame(self)
        header_frame.pack(fill='x', padx=10, pady=5)
        
        title_frame = ttk.Frame(header_frame)
        title_frame.pack(side='left')
        
        ttk.Label(
            title_frame,
            text="Gestion des tournois",
            style='Title.TLabel'
        ).pack(side='left')
        
        # Recherche
        search_frame = ttk.Frame(header_frame)
        search_frame.pack(side='left', padx=10)
        
        ttk.Label(search_frame, text="Rechercher:").pack(side='left')
        
        self.search_var = tk.StringVar()
        self.search_var.trace('w', self.filter_view)
        ttk.Entry(search_frame, textvariable=self.search_var).pack(side='left', padx=5)
        
        # Filtre de statut
        status_filter_frame = ttk.Frame(header_frame)
        status_filter_frame.pack(side='right', padx=10)
        
        ttk.Label(status_filter_frame, text="Filtrer par statut:").pack(side='left')
        status_filter = ttk.Combobox(status_filter_frame, textvariable=self.selected_status)
        status_filter['values'] = ('Tous', 'En attente', 'En cours', 'Terminé', 'Annulé')
        status_filter.pack(side='left', padx=5)
        status_filter.bind('<<ComboboxSelected>>', lambda e: self.load_tournaments())
        
        # Bouton retour
        ttk.Button(
            header_frame,
            text="Retour",
            command=self.back_to_dashboard,
            style='secondary.TButton'
        ).pack(side='right')
        
        # Treeview pour la liste des tournois
        columns = (
            'id',
            'name',
            'game',
            'type',
            'date',
            'time',
            'status',
            'teams',
            'players'
        )
        
        self.tree = ttk.Treeview(
            self,
            columns=columns,
            show='headings',
            selectmode='browse'
        )
        
        # Configuration des colonnes
        self.tree.heading('id', text='ID')
        self.tree.heading('name', text='Nom')
        self.tree.heading('game', text='Jeu')
        self.tree.heading('type', text='Type')
        self.tree.heading('date', text='Date')
        self.tree.heading('time', text='Heure')
        self.tree.heading('status', text='Statut')
        self.tree.heading('teams', text='Équipes')
        self.tree.heading('players', text='Joueurs')
        
        self.tree.column('id', width=50)
        self.tree.column('name', width=200)
        self.tree.column('game', width=100)
        self.tree.column('type', width=100)
        self.tree.column('date', width=100)
        self.tree.column('time', width=100)
        self.tree.column('status', width=100)
        self.tree.column('teams', width=100)
        self.tree.column('players', width=100)
        
        self.tree.pack(fill='both', expand=True, padx=10, pady=5)
        
        # Scrollbar
        scrollbar = ttk.Scrollbar(self, orient='vertical', command=self.tree.yview)
        scrollbar.pack(side='right', fill='y')
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        # Boutons d'action
        action_frame = ttk.Frame(self)
        action_frame.pack(fill='x', padx=10, pady=5)
        
        ttk.Button(
            action_frame,
            text="Nouveau tournoi",
            command=self.create_tournament,
            style='success.TButton'
        ).pack(side='left', padx=5)
        
        ttk.Button(
            action_frame,
            text="Modifier",
            command=self.edit_tournament,
            style='info.TButton'
        ).pack(side='left', padx=5)
        
        ttk.Button(
            action_frame,
            text="Supprimer",
            command=self.delete_tournament,
            style='danger.TButton'
        ).pack(side='left', padx=5)

        ttk.Button(
            action_frame,
            text="Changer le statut",
            command=self.show_status_dialog,
            style='info.TButton'
        ).pack(side='left', padx=5)

        # Menu contextuel pour changer le statut
        self.status_menu = tk.Menu(self, tearoff=0)
        self.status_menu.add_command(label="En attente", command=lambda: self.change_tournament_status("En attente"))
        self.status_menu.add_command(label="En cours", command=lambda: self.change_tournament_status("En cours"))
        self.status_menu.add_command(label="Terminé", command=lambda: self.change_tournament_status("Terminé"))
        self.status_menu.add_command(label="Annulé", command=lambda: self.change_tournament_status("Annulé"))

        # Bind le clic droit sur un tournoi
        self.tree.bind("<Button-3>", self.show_status_menu)

    def show_status_menu(self, event):
        item = self.tree.identify_row(event.y)
        if item:
            self.tree.selection_set(item)
            self.status_menu.post(event.x_root, event.y_root)

    def change_tournament_status(self, new_status):
        selected_item = self.tree.selection()
        if not selected_item:
            return

        tournament_id = self.tree.item(selected_item[0])['values'][0]
        try:
            db = get_db()
            # Mettre à jour le statut existant ou créer un nouveau
            status = db.query(TournamentStatus).filter_by(tournamentId=tournament_id).first()
            if status:
                status.status = new_status
                status.updatedAt = datetime.now()
            else:
                status = TournamentStatus(
                    tournamentId=tournament_id,
                    status=new_status,
                    updatedAt=datetime.now()
                )
                db.add(status)
            
            db.commit()
            self.load_tournaments()
            db.close()
        except Exception as e:
            print(f"Erreur lors de la mise à jour du statut : {e}")
            if 'db' in locals():
                db.rollback()
                db.close()
        finally:
            if 'db' in locals():
                db.close()

    def load_tournaments(self):
        # Nettoyer l'arbre
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        try:
            # Charger les tournois depuis la base de données
            db = get_db()
            query = db.query(
                Tournament,
                Game.name.label('game_name'),
                TournamentType.type.label('tournament_type'),
                TournamentStatus.status.label('status')
            ).join(
                Game, Tournament.gameId == Game.id
            ).join(
                TournamentType, Tournament.tournament_typeId == TournamentType.id
            ).outerjoin(
                TournamentStatus, Tournament.id == TournamentStatus.tournamentId
            )

            # Appliquer le filtre de statut
            if self.selected_status.get() != "Tous":
                query = query.filter(
                    # Si le statut est "En attente", inclure aussi les tournois sans statut
                    (TournamentStatus.status == self.selected_status.get()) |
                    (TournamentStatus.status == None if self.selected_status.get() == "En attente" else False)
                )

            tournaments = query.all()
            
            # Insérer les tournois dans l'arbre
            for t in tournaments:
                tournament = t[0]  # L'objet Tournament
                game_name = t.game_name
                tournament_type = t.tournament_type
                status = t.status or "En attente"  # Valeur par défaut si pas de statut
                
                # Formater la date et l'heure
                start_date = tournament.startDate.strftime('%d/%m/%Y')
                start_time = tournament.startTime.strftime('%H:%M')
                
                self.tree.insert('', 'end', values=(
                    tournament.id,
                    tournament.tournamentName,
                    game_name,
                    tournament_type,
                    start_date,
                    start_time,
                    status,
                    tournament.numTeams,
                    tournament.totalPlayers
                ))
            db.close()
        except Exception as e:
            print(f"Erreur lors du chargement des tournois : {e}")
            messagebox.showerror("Erreur", f"Erreur lors du chargement des tournois : {str(e)}")
        finally:
            if 'db' in locals():
                db.close()

    def get_games(self):
        try:
            db = get_db()
            return db.query(Game).all()
        finally:
            db.close()

    def get_tournament_types(self):
        try:
            db = get_db()
            return db.query(TournamentType).all()
        finally:
            db.close()

    def filter_view(self, *args):
        search_term = self.search_var.get().lower()
        for item in self.tree.get_children():
            values = self.tree.item(item)['values']
            if any(str(value).lower().find(search_term) >= 0 for value in values):
                self.tree.reattach(item, '', 'end')
            else:
                self.tree.detach(item)

    def create_tournament(self):
        dialog = tk.Toplevel(self)
        dialog.title("Créer un nouveau tournoi")
        dialog.geometry("500x700")
        
        form_frame = ttk.Frame(dialog, padding="20")
        form_frame.pack(fill='both', expand=True)
        
        # Champs du formulaire
        name_var = tk.StringVar()
        ttk.Label(form_frame, text="Nom du tournoi:").pack(fill='x', pady=5)
        ttk.Entry(form_frame, textvariable=name_var).pack(fill='x', pady=5)
        
        # Sélection du jeu
        game_var = tk.StringVar()
        ttk.Label(form_frame, text="Jeu:").pack(fill='x', pady=5)
        games = self.get_games()
        game_combo = ttk.Combobox(form_frame, textvariable=game_var)
        game_combo['values'] = [game.name for game in games]
        game_combo.pack(fill='x', pady=5)
        
        # Type de tournoi
        type_var = tk.StringVar()
        ttk.Label(form_frame, text="Type de tournoi:").pack(fill='x', pady=5)
        types = self.get_tournament_types()
        type_combo = ttk.Combobox(form_frame, textvariable=type_var)
        type_combo['values'] = [t.type for t in types]
        type_combo.pack(fill='x', pady=5)
        
        # Date
        date_frame = ttk.Frame(form_frame)
        date_frame.pack(fill='x', pady=5)
        ttk.Label(date_frame, text="Date:").pack(side='left')
        
        day_var = tk.StringVar(value="01")
        month_var = tk.StringVar(value="01")
        year_var = tk.StringVar(value="2024")
        
        ttk.Spinbox(date_frame, from_=1, to=31, width=3, textvariable=day_var).pack(side='left', padx=2)
        ttk.Label(date_frame, text="/").pack(side='left')
        ttk.Spinbox(date_frame, from_=1, to=12, width=3, textvariable=month_var).pack(side='left', padx=2)
        ttk.Label(date_frame, text="/").pack(side='left')
        ttk.Spinbox(date_frame, from_=2024, to=2030, width=5, textvariable=year_var).pack(side='left', padx=2)
        
        # Heure
        time_frame = ttk.Frame(form_frame)
        time_frame.pack(fill='x', pady=5)
        ttk.Label(time_frame, text="Heure:").pack(side='left')
        
        hour_var = tk.StringVar(value="00")
        minute_var = tk.StringVar(value="00")
        
        ttk.Spinbox(time_frame, from_=0, to=23, width=3, textvariable=hour_var).pack(side='left', padx=2)
        ttk.Label(time_frame, text=":").pack(side='left')
        ttk.Spinbox(time_frame, from_=0, to=59, width=3, textvariable=minute_var).pack(side='left', padx=2)
        
        # Règles
        ttk.Label(form_frame, text="Règles:").pack(fill='x', pady=5)
        rules_text = tk.Text(form_frame, height=4)
        rules_text.pack(fill='x', pady=5)
        
        # Récompenses
        ttk.Label(form_frame, text="Récompenses:").pack(fill='x', pady=5)
        rewards_text = tk.Text(form_frame, height=4)
        rewards_text.pack(fill='x', pady=5)
        
        # Nombre d'équipes et joueurs
        num_teams_var = tk.StringVar(value="0")
        ttk.Label(form_frame, text="Nombre d'équipes:").pack(fill='x', pady=5)
        ttk.Entry(form_frame, textvariable=num_teams_var).pack(fill='x', pady=5)
        
        players_per_team_var = tk.StringVar(value="0")
        ttk.Label(form_frame, text="Joueurs par équipe:").pack(fill='x', pady=5)
        ttk.Entry(form_frame, textvariable=players_per_team_var).pack(fill='x', pady=5)
        
        # Total des joueurs (calculé automatiquement)
        total_players_label = ttk.Label(form_frame, text="Total des joueurs: 0")
        total_players_label.pack(fill='x', pady=5)
        
        def update_total():
            try:
                teams = int(num_teams_var.get())
                players = int(players_per_team_var.get())
                total_players_label.config(text=f"Total des joueurs: {teams * players}")
            except ValueError:
                total_players_label.config(text="Total des joueurs: 0")
        
        num_teams_var.trace('w', lambda *args: update_total())
        players_per_team_var.trace('w', lambda *args: update_total())
        
        def save():
            name = name_var.get().strip()
            game_name = game_var.get()
            type_name = type_var.get()
            
            if not name or not game_name or not type_name:
                messagebox.showerror("Erreur", "Tous les champs sont requis")
                return
            
            try:
                db = get_db()
                
                # Trouver les IDs
                game = db.query(Game).filter(Game.name == game_name).first()
                tournament_type = db.query(TournamentType).filter(TournamentType.type == type_name).first()
                
                if not game or not tournament_type:
                    messagebox.showerror("Erreur", "Jeu ou type de tournoi non trouvé")
                    return
                
                # Créer la date et l'heure
                date_str = f"{year_var.get()}-{month_var.get().zfill(2)}-{day_var.get().zfill(2)}"
                time_str = f"{hour_var.get().zfill(2)}:{minute_var.get().zfill(2)}"
                
                # Créer le tournoi
                tournament = Tournament(
                    tournamentName=name,
                    gameId=game.id,
                    tournament_typeId=tournament_type.id,
                    startDate=datetime.strptime(date_str, "%Y-%m-%d").date(),
                    startTime=datetime.strptime(time_str, "%H:%M").time(),
                    rules=rules_text.get("1.0", "end-1c"),
                    rewards=rewards_text.get("1.0", "end-1c"),
                    numTeams=int(num_teams_var.get()),
                    playersPerTeam=int(players_per_team_var.get()),
                    totalPlayers=int(num_teams_var.get()) * int(players_per_team_var.get())
                )
                
                db.add(tournament)
                db.commit()
                
                # Créer le statut initial
                status = TournamentStatus(
                    tournamentId=tournament.id,
                    status="En attente",
                    updatedAt=datetime.now()
                )
                db.add(status)
                db.commit()
                
                dialog.destroy()
                self.load_tournaments()
                messagebox.showinfo("Succès", "Tournoi créé avec succès")
                
            except Exception as e:
                if 'db' in locals():
                    db.rollback()
                    db.close()
                messagebox.showerror("Erreur", str(e))
            finally:
                if 'db' in locals():
                    db.close()
        
        # Boutons
        button_frame = ttk.Frame(form_frame)
        button_frame.pack(fill='x', pady=20)
        
        ttk.Button(
            button_frame,
            text="Créer",
            command=save,
            style='success.TButton'
        ).pack(side='left', padx=5)
        
        ttk.Button(
            button_frame,
            text="Annuler",
            command=dialog.destroy,
            style='danger.TButton'
        ).pack(side='left', padx=5)

    def edit_tournament(self):
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("Attention", "Veuillez sélectionner un tournoi à modifier")
            return
        
        tournament_id = self.tree.item(selected[0])['values'][0]
        
        try:
            db = get_db()
            tournament = db.query(Tournament).filter_by(id=tournament_id).first()
            if not tournament:
                messagebox.showerror("Erreur", "Tournoi non trouvé")
                return
            
            dialog = tk.Toplevel(self)
            dialog.title("Modifier le tournoi")
            dialog.geometry("500x700")
            
            form_frame = ttk.Frame(dialog, padding="20")
            form_frame.pack(fill='both', expand=True)
            
            # Nom
            name_var = tk.StringVar(value=tournament.tournamentName)
            ttk.Label(form_frame, text="Nom du tournoi:").pack(fill='x', pady=5)
            ttk.Entry(form_frame, textvariable=name_var).pack(fill='x', pady=5)
            
            # Jeu
            games = self.get_games()
            game_var = tk.StringVar()
            current_game = next(g for g in games if g.id == tournament.gameId)
            game_var.set(current_game.name)
            
            ttk.Label(form_frame, text="Jeu:").pack(fill='x', pady=5)
            game_combo = ttk.Combobox(form_frame, textvariable=game_var)
            game_combo['values'] = [g.name for g in games]
            game_combo.pack(fill='x', pady=5)
            
            # Type
            types = self.get_tournament_types()
            type_var = tk.StringVar()
            current_type = next(t for t in types if t.id == tournament.tournament_typeId)
            type_var.set(current_type.type)
            
            ttk.Label(form_frame, text="Type:").pack(fill='x', pady=5)
            type_combo = ttk.Combobox(form_frame, textvariable=type_var)
            type_combo['values'] = [t.type for t in types]
            type_combo.pack(fill='x', pady=5)
            
            # Date
            date_frame = ttk.Frame(form_frame)
            date_frame.pack(fill='x', pady=5)
            ttk.Label(date_frame, text="Date:").pack(side='left')
            
            day_var = tk.StringVar(value=tournament.startDate.day)
            month_var = tk.StringVar(value=tournament.startDate.month)
            year_var = tk.StringVar(value=tournament.startDate.year)
            
            ttk.Spinbox(date_frame, from_=1, to=31, width=3, textvariable=day_var).pack(side='left', padx=2)
            ttk.Label(date_frame, text="/").pack(side='left')
            ttk.Spinbox(date_frame, from_=1, to=12, width=3, textvariable=month_var).pack(side='left', padx=2)
            ttk.Label(date_frame, text="/").pack(side='left')
            ttk.Spinbox(date_frame, from_=2024, to=2030, width=5, textvariable=year_var).pack(side='left', padx=2)
            
            # Heure
            time_frame = ttk.Frame(form_frame)
            time_frame.pack(fill='x', pady=5)
            ttk.Label(time_frame, text="Heure:").pack(side='left')
            
            hour_var = tk.StringVar(value=tournament.startTime.hour)
            minute_var = tk.StringVar(value=tournament.startTime.minute)
            
            ttk.Spinbox(time_frame, from_=0, to=23, width=3, textvariable=hour_var).pack(side='left', padx=2)
            ttk.Label(time_frame, text=":").pack(side='left')
            ttk.Spinbox(time_frame, from_=0, to=59, width=3, textvariable=minute_var).pack(side='left', padx=2)
            
            # Règles
            ttk.Label(form_frame, text="Règles:").pack(fill='x', pady=5)
            rules_text = tk.Text(form_frame, height=4)
            rules_text.insert("1.0", tournament.rules or "")
            rules_text.pack(fill='x', pady=5)
            
            # Récompenses
            ttk.Label(form_frame, text="Récompenses:").pack(fill='x', pady=5)
            rewards_text = tk.Text(form_frame, height=4)
            rewards_text.insert("1.0", tournament.rewards or "")
            rewards_text.pack(fill='x', pady=5)
            
            # Nombre d'équipes et joueurs
            num_teams_var = tk.StringVar(value=tournament.numTeams)
            ttk.Label(form_frame, text="Nombre d'équipes:").pack(fill='x', pady=5)
            ttk.Entry(form_frame, textvariable=num_teams_var).pack(fill='x', pady=5)
            
            players_per_team_var = tk.StringVar(value=tournament.playersPerTeam)
            ttk.Label(form_frame, text="Joueurs par équipe:").pack(fill='x', pady=5)
            ttk.Entry(form_frame, textvariable=players_per_team_var).pack(fill='x', pady=5)
            
            # Total des joueurs
            total_players_label = ttk.Label(form_frame, text=f"Total des joueurs: {tournament.totalPlayers}")
            total_players_label.pack(fill='x', pady=5)
            
            def update_total():
                try:
                    teams = int(num_teams_var.get())
                    players = int(players_per_team_var.get())
                    total_players_label.config(text=f"Total des joueurs: {teams * players}")
                except ValueError:
                    total_players_label.config(text="Total des joueurs: 0")
            
            num_teams_var.trace('w', lambda *args: update_total())
            players_per_team_var.trace('w', lambda *args: update_total())
            
            def save_changes():
                try:
                    # Validation
                    if not all([name_var.get(), game_var.get(), type_var.get()]):
                        messagebox.showerror("Erreur", "Veuillez remplir tous les champs obligatoires")
                        return
                    
                    # Trouver les IDs
                    game = next(g for g in games if g.name == game_var.get())
                    tournament_type = next(t for t in types if t.type == type_var.get())
                    
                    # Créer la date et l'heure
                    date_str = f"{year_var.get()}-{month_var.get().zfill(2)}-{day_var.get().zfill(2)}"
                    time_str = f"{hour_var.get().zfill(2)}:{minute_var.get().zfill(2)}"
                    
                    # Mettre à jour le tournoi
                    tournament.tournamentName = name_var.get()
                    tournament.gameId = game.id
                    tournament.tournament_typeId = tournament_type.id
                    tournament.startDate = datetime.strptime(date_str, "%Y-%m-%d").date()
                    tournament.startTime = datetime.strptime(time_str, "%H:%M").time()
                    tournament.rules = rules_text.get("1.0", "end-1c")
                    tournament.rewards = rewards_text.get("1.0", "end-1c")
                    tournament.numTeams = int(num_teams_var.get())
                    tournament.playersPerTeam = int(players_per_team_var.get())
                    tournament.totalPlayers = int(num_teams_var.get()) * int(players_per_team_var.get())
                    tournament.updatedAt = datetime.now()
                    
                    db.commit()
                    dialog.destroy()
                    self.load_tournaments()
                    db.close()
                    
                except Exception as e:
                    messagebox.showerror("Erreur", str(e))
                    db.rollback()
                    db.close()
            
            # Boutons
            button_frame = ttk.Frame(form_frame)
            button_frame.pack(fill='x', pady=20)
            
            ttk.Button(
                button_frame,
                text="Enregistrer",
                command=save_changes,
                style='success.TButton'
            ).pack(side='left', padx=5)
            
            ttk.Button(
                button_frame,
                text="Annuler",
                command=dialog.destroy,
                style='danger.TButton'
            ).pack(side='left', padx=5)
            
        except Exception as e:
            messagebox.showerror("Erreur", str(e))
        finally:
            db.close()

    def delete_tournament(self):
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("Attention", "Veuillez sélectionner un tournoi à supprimer")
            return
        
        if not messagebox.askyesno("Confirmation", "Voulez-vous vraiment supprimer ce tournoi ?"):
            return
        
        tournament_id = self.tree.item(selected[0])['values'][0]
        
        try:
            db = get_db()
            tournament = db.query(Tournament).filter_by(id=tournament_id).first()
            if tournament:
                # Supprimer d'abord les statuts associés
                db.query(TournamentStatus).filter_by(tournamentId=tournament.id).delete()
                db.delete(tournament)
                db.commit()
                self.load_tournaments()
                db.close()
        except Exception as e:
            messagebox.showerror("Erreur", str(e))
            if 'db' in locals():
                db.rollback()
                db.close()
        finally:
            if 'db' in locals():
                db.close()

    def show_status_dialog(self):
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("Attention", "Veuillez sélectionner un tournoi")
            return

        tournament_id = self.tree.item(selected[0])['values'][0]
        tournament_name = self.tree.item(selected[0])['values'][1]
        current_status = self.tree.item(selected[0])['values'][6]  # Index 6 est la colonne du statut

        # Créer une fenêtre de dialogue
        dialog = tk.Toplevel(self)
        dialog.title("Changer le statut du tournoi")
        dialog.geometry("400x200")

        # Frame principal
        main_frame = ttk.Frame(dialog, padding="20")
        main_frame.pack(fill='both', expand=True)

        # Information sur le tournoi
        ttk.Label(
            main_frame,
            text=f"Tournoi : {tournament_name}",
            style='Title.TLabel'
        ).pack(fill='x', pady=(0, 10))

        ttk.Label(
            main_frame,
            text=f"Statut actuel : {current_status}",
        ).pack(fill='x', pady=(0, 20))

        # Variable pour le nouveau statut
        new_status_var = tk.StringVar(value=current_status)

        # Combobox pour sélectionner le nouveau statut
        ttk.Label(main_frame, text="Nouveau statut :").pack(fill='x')
        status_combo = ttk.Combobox(main_frame, textvariable=new_status_var)
        status_combo['values'] = ('En attente', 'En cours', 'Terminé', 'Annulé')
        status_combo['state'] = 'readonly'  # Empêche la saisie manuelle
        status_combo.pack(fill='x', pady=(5, 20))

        # Frame pour les boutons
        button_frame = ttk.Frame(main_frame)
        button_frame.pack(fill='x', pady=(20, 0))

        def apply_status():
            if new_status_var.get() != current_status:
                self.change_tournament_status(new_status_var.get())
            dialog.destroy()

        # Boutons
        ttk.Button(
            button_frame,
            text="Appliquer",
            command=apply_status,
            style='success.TButton'
        ).pack(side='left', padx=5)

        ttk.Button(
            button_frame,
            text="Annuler",
            command=dialog.destroy,
            style='danger.TButton'
        ).pack(side='left', padx=5)
