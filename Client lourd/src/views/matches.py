import tkinter as tk
import ttkbootstrap as ttk
from sqlalchemy.orm import Session
from ..utils.database import get_db
from ..models.models import Match, Tournament, Team
from datetime import datetime

class MatchList(ttk.Frame):
    def __init__(self, master):
        super().__init__(master)
        self.pack(fill='both', expand=True, padx=20, pady=20)
        self.create_widgets()
        self.load_matches()

    def create_widgets(self):
        # Titre
        title = ttk.Label(self, text="Liste des Matchs", font=("Helvetica", 16, "bold"))
        title.pack(pady=10)

        # Tableau des matchs
        columns = ("id", "tournament", "team1", "team2", "score", "winner", "date", "status")
        self.tree = ttk.Treeview(self, columns=columns, show='headings')

        # Définir les en-têtes
        self.tree.heading('id', text='ID')
        self.tree.heading('tournament', text='Tournoi')
        self.tree.heading('team1', text='Équipe 1')
        self.tree.heading('team2', text='Équipe 2')
        self.tree.heading('score', text='Score')
        self.tree.heading('winner', text='Vainqueur')
        self.tree.heading('date', text='Date')
        self.tree.heading('status', text='Statut')

        # Configurer les colonnes
        self.tree.column('id', width=50)
        self.tree.column('tournament', width=200)
        self.tree.column('team1', width=150)
        self.tree.column('team2', width=150)
        self.tree.column('score', width=100)
        self.tree.column('winner', width=150)
        self.tree.column('date', width=150)
        self.tree.column('status', width=100)

        # Ajouter la barre de défilement
        scrollbar = ttk.Scrollbar(self, orient=tk.VERTICAL, command=self.tree.yview)
        self.tree.configure(yscroll=scrollbar.set)

        # Placement des widgets
        self.tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

    def load_matches(self):
        try:
            db = get_db()
            matches = db.query(Match).join(Tournament).all()

            # Nettoyer les données existantes
            for item in self.tree.get_children():
                self.tree.delete(item)

            for match in matches:
                team1 = db.query(Team).filter(Team.id == match.team1Id).first()
                team2 = db.query(Team).filter(Team.id == match.team2Id).first()
                winner = db.query(Team).filter(Team.id == match.winnerId).first() if match.winnerId else None

                score = f"{match.team1Score}-{match.team2Score}" if match.team1Score is not None else "vs"

                self.tree.insert('', tk.END, values=(
                    match.id,
                    match.tournament.tournamentName,
                    team1.teamName if team1 else "N/A",
                    team2.teamName if team2 else "N/A",
                    score,
                    winner.teamName if winner else "N/A",
                    match.matchDate.strftime('%Y-%m-%d %H:%M'),
                    match.status
                ))

            db.close()
        except Exception as e:
            messagebox.showerror("Erreur", f"Erreur lors du chargement des matches : {str(e)}")

class UpdateScores(ttk.Frame):
    def __init__(self, master):
        super().__init__(master)
        self.pack(fill='both', expand=True, padx=20, pady=20)
        self.create_widgets()
        self.load_data()

    def create_widgets(self):
        # Titre
        title = ttk.Label(self, text="Mise à jour des Scores", font=("Helvetica", 16, "bold"))
        title.pack(pady=10)

        # Frame pour la sélection du match
        select_frame = ttk.Frame(self)
        select_frame.pack(fill='x', pady=10)

        ttk.Label(select_frame, text="Match:").pack(side=tk.LEFT, padx=5)
        self.match_var = tk.StringVar()
        self.match_combobox = ttk.Combobox(select_frame, textvariable=self.match_var)
        self.match_combobox.pack(side=tk.LEFT, fill='x', expand=True)
        self.match_combobox.bind('<<ComboboxSelected>>', self.on_match_selected)

        # Frame pour les scores
        score_frame = ttk.Frame(self)
        score_frame.pack(fill='x', pady=10)

        # Score équipe 1
        self.team1_label = ttk.Label(score_frame, text="Équipe 1:")
        self.team1_label.pack(side=tk.LEFT, padx=5)
        self.score1_var = tk.StringVar()
        self.score1_entry = ttk.Entry(score_frame, textvariable=self.score1_var, width=5)
        self.score1_entry.pack(side=tk.LEFT, padx=5)

        # Score équipe 2
        self.team2_label = ttk.Label(score_frame, text="Équipe 2:")
        self.team2_label.pack(side=tk.LEFT, padx=5)
        self.score2_var = tk.StringVar()
        self.score2_entry = ttk.Entry(score_frame, textvariable=self.score2_var, width=5)
        self.score2_entry.pack(side=tk.LEFT, padx=5)

        # Bouton de mise à jour
        update_button = ttk.Button(
            score_frame,
            text="Mettre à jour",
            command=self.update_score,
            style='primary.TButton'
        )
        update_button.pack(side=tk.LEFT, padx=20)

    def load_data(self):
        try:
            db = get_db()
            matches = db.query(Match).join(Tournament).filter(Match.status != 'completed').all()

            self.matches = {}
            for match in matches:
                team1 = db.query(Team).filter(Team.id == match.team1Id).first()
                team2 = db.query(Team).filter(Team.id == match.team2Id).first()
                match_str = f"{match.tournament.tournamentName}: {team1.teamName} vs {team2.teamName}"
                self.matches[match_str] = match

            self.match_combobox['values'] = list(self.matches.keys())
            db.close()
        except Exception as e:
            messagebox.showerror("Erreur", f"Erreur lors du chargement des données : {str(e)}")

    def on_match_selected(self, event):
        match_str = self.match_var.get()
        if match_str in self.matches:
            match = self.matches[match_str]
            if match.team1Score is not None:
                self.score1_var.set(str(match.team1Score))
            if match.team2Score is not None:
                self.score2_var.set(str(match.team2Score))

            try:
                db = get_db()
                team1 = db.query(Team).filter(Team.id == match.team1Id).first()
                team2 = db.query(Team).filter(Team.id == match.team2Id).first()
                self.team1_label.config(text=f"{team1.teamName}:")
                self.team2_label.config(text=f"{team2.teamName}:")
                db.close()
            except Exception as e:
                messagebox.showerror("Erreur", f"Erreur lors de la sélection du match : {str(e)}")

    def update_score(self):
        match_str = self.match_var.get()
        if not match_str or match_str not in self.matches:
            tk.messagebox.showerror(
                "Erreur",
                "Veuillez sélectionner un match"
            )
            return

        try:
            score1 = int(self.score1_var.get())
            score2 = int(self.score2_var.get())
        except ValueError:
            tk.messagebox.showerror(
                "Erreur",
                "Les scores doivent être des nombres entiers"
            )
            return

        if score1 < 0 or score2 < 0:
            tk.messagebox.showerror(
                "Erreur",
                "Les scores ne peuvent pas être négatifs"
            )
            return

        match = self.matches[match_str]
        try:
            db = get_db()
            match.team1Score = score1
            match.team2Score = score2

            # Déterminer le vainqueur
            if score1 > score2:
                match.winnerId = match.team1Id
            elif score2 > score1:
                match.winnerId = match.team2Id
            else:
                match.winnerId = None

            # Mettre à jour le statut
            match.status = 'completed'

            db.commit()
            tk.messagebox.showinfo(
                "Succès",
                "Les scores ont été mis à jour"
            )

            # Recharger les données
            self.load_data()
            self.score1_var.set("")
            self.score2_var.set("")
            self.team1_label.config(text="Équipe 1:")
            self.team2_label.config(text="Équipe 2:")
            db.close()
        except Exception as e:
            if db:
                db.rollback()
                db.close()
            tk.messagebox.showerror(
                "Erreur",
                f"Une erreur est survenue: {str(e)}"
            )
