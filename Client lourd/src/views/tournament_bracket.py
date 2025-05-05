import tkinter as tk
import ttkbootstrap as ttk
from sqlalchemy.orm import Session
from ..utils.database import get_db
from ..models.models import Tournament, Team, Match
from datetime import datetime
import math

class TournamentBracket(ttk.Frame):
    def __init__(self, master, tournament_id):
        super().__init__(master)
        self.tournament_id = tournament_id
        self.pack(fill='both', expand=True, padx=20, pady=20)
        self.matches = {}  # Pour stocker les références aux widgets de match
        print("Initialisation du bracket...")
        self.load_tournament()
        self.create_widgets()
        self.load_matches()

    def load_tournament(self):
        try:
            db = get_db()
            self.tournament = db.query(Tournament).get(self.tournament_id)
            if not self.tournament:
                raise ValueError(f"Tournament not found with ID: {self.tournament_id}")
            print(f"Tournoi trouvé: {self.tournament.tournamentName}")
            
            # Calculer le nombre de rounds nécessaires
            self.num_teams = self.tournament.numTeams
            self.num_rounds = math.ceil(math.log2(self.num_teams))
            self.losers_rounds = self.num_rounds - 1
            print(f"Nombre d'équipes: {self.num_teams}")
            print(f"Nombre de rounds: {self.num_rounds}")
            db.close()
        except Exception as e:
            db.close()
            tk.messagebox.showerror(
                "Erreur",
                f"Erreur lors du chargement du tournoi : {str(e)}"
            )

    def create_widgets(self):
        print("Création des widgets...")
        # Style pour les matches
        style = ttk.Style()
        style.configure('Match.TFrame', background='#1E1E1E')
        style.configure('MatchBorder.TFrame', background='#2D2D2D')
        style.configure('Winner.TLabel', background='#2E7D32', foreground='white')
        style.configure('Bracket.TLabelframe', background='#1E1E1E', foreground='white')
        style.configure('Bracket.TLabelframe.Label', font=('Helvetica', 12, 'bold'), foreground='white')
        style.configure('Match.TLabel', background='#2D2D2D', foreground='white')
        style.configure('Title.TLabel', background='#1E1E1E', foreground='white')

        # Frame principal avec scrollbars
        self.main_frame = ttk.Frame(self, style='Match.TFrame')
        self.main_frame.pack(fill='both', expand=True)

        # Canvas pour le scrolling
        self.canvas = tk.Canvas(self.main_frame, background='#1E1E1E', highlightthickness=0)
        self.canvas.pack(side='left', fill='both', expand=True)

        # Scrollbars
        self.v_scrollbar = ttk.Scrollbar(self.main_frame, orient='vertical', command=self.canvas.yview)
        self.v_scrollbar.pack(side='right', fill='y')
        
        self.h_scrollbar = ttk.Scrollbar(self, orient='horizontal', command=self.canvas.xview)
        self.h_scrollbar.pack(side='bottom', fill='x')

        # Configurer le canvas
        self.canvas.configure(
            xscrollcommand=self.h_scrollbar.set,
            yscrollcommand=self.v_scrollbar.set
        )

        # Frame pour contenir tout le contenu
        self.content_frame = ttk.Frame(self.canvas, style='Match.TFrame')
        
        # Titre principal
        title = ttk.Label(
            self.content_frame,
            text=f"Bracket - {self.tournament.tournamentName}",
            font=("Helvetica", 16, "bold"),
            style='Title.TLabel'
        )
        title.pack(pady=10)

        # Frame pour les brackets
        brackets_frame = ttk.Frame(self.content_frame, style='Match.TFrame')
        brackets_frame.pack(fill='both', expand=True, padx=20, pady=10)

        # Frame pour le winner bracket
        self.winner_frame = ttk.LabelFrame(
            brackets_frame,
            text="Winner Bracket",
            style='Bracket.TLabelframe'
        )
        self.winner_frame.pack(fill='both', expand=True, pady=(0, 20))

        # Frame pour le loser bracket
        self.loser_frame = ttk.LabelFrame(
            brackets_frame,
            text="Loser Bracket",
            style='Bracket.TLabelframe'
        )
        self.loser_frame.pack(fill='both', expand=True, pady=(0, 20))

        # Frame pour la grande finale
        self.final_frame = ttk.LabelFrame(
            brackets_frame,
            text="Grande Finale",
            style='Bracket.TLabelframe'
        )
        self.final_frame.pack(fill='both', expand=True)

        # Créer la fenêtre dans le canvas
        self.canvas.create_window(
            (0, 0),
            window=self.content_frame,
            anchor='nw',
            width=1200,
            height=1000
        )

        # Configurer le scrolling
        self.content_frame.bind('<Configure>', self.on_frame_configure)
        self.bind_mouse_wheel()

        print("Widgets créés")

    def create_match_widget(self, parent, match, x, y):
        print(f"Création du match: {match.id} à la position ({x}, {y})")
        
        # Container frame pour le match et ses connexions
        container = ttk.Frame(parent, style='Match.TFrame')
        container.grid(row=y, column=x, padx=10, pady=5, sticky='nsew')

        # Frame pour le match
        match_frame = ttk.Frame(container, style='Match.TFrame')
        match_frame.pack(fill='both', expand=True)

        # Frame pour le match avec bordure
        match_border = ttk.Frame(match_frame, style='MatchBorder.TFrame', relief='solid', borderwidth=1)
        match_border.pack(fill='both', expand=True, ipadx=10, ipady=5)

        # Frame pour l'équipe 1
        team1_frame = ttk.Frame(match_border, style='MatchBorder.TFrame')
        team1_frame.pack(fill="x", pady=2)
        
        # Nom de l'équipe 1
        team1_name = ttk.Label(
            team1_frame,
            text=match.team1.teamName if match.team1 else "TBD",
            width=20,
            style='Winner.TLabel' if match.winnerId == match.team1Id else 'Match.TLabel'
        )
        team1_name.pack(side="left", padx=5)
        
        # Score équipe 1
        team1_score = ttk.Label(
            team1_frame,
            text=str(match.team1Score) if match.team1Score is not None else "-",
            width=3,
            style='Match.TLabel'
        )
        team1_score.pack(side="left", padx=5)
        
        # Bouton victoire équipe 1
        if match.status != 'completed' and match.team1Id is not None:
            team1_win = ttk.Button(
                team1_frame,
                text="Victoire",
                command=lambda: self.declare_winner(match.id, match.team1Id),
                style='success.TButton',
                width=10
            )
            team1_win.pack(side="right", padx=5)

        # Séparateur
        separator = ttk.Separator(match_border, orient="horizontal")
        separator.pack(fill="x", padx=5, pady=5)

        # Frame pour l'équipe 2
        team2_frame = ttk.Frame(match_border, style='MatchBorder.TFrame')
        team2_frame.pack(fill="x", pady=2)
        
        # Nom de l'équipe 2
        team2_name = ttk.Label(
            team2_frame,
            text=match.team2.teamName if match.team2 else "TBD",
            width=20,
            style='Winner.TLabel' if match.winnerId == match.team2Id else 'Match.TLabel'
        )
        team2_name.pack(side="left", padx=5)
        
        # Score équipe 2
        team2_score = ttk.Label(
            team2_frame,
            text=str(match.team2Score) if match.team2Score is not None else "-",
            width=3,
            style='Match.TLabel'
        )
        team2_score.pack(side="left", padx=5)
        
        # Bouton victoire équipe 2
        if match.status != 'completed' and match.team2Id is not None:
            team2_win = ttk.Button(
                team2_frame,
                text="Victoire",
                command=lambda: self.declare_winner(match.id, match.team2Id),
                style='success.TButton',
                width=10
            )
            team2_win.pack(side="right", padx=5)

        return container

    def load_matches(self):
        try:
            db = get_db()
            matches = (
                db.query(Match)
                .filter(Match.tournamentId == self.tournament_id)
                .order_by(Match.round_number, Match.matchDate)
                .all()
            )
            print(f"Nombre de matches trouvés: {len(matches)}")

            # Organiser les matches par round et bracket
            winner_matches = [[] for _ in range(self.num_rounds)]
            loser_matches = [[] for _ in range(self.losers_rounds)]
            final_matches = []

            for match in matches:
                print(f"Match {match.id}: {match.bracket_type} - Round {match.round_number}")
                if match.bracket_type == 'winner':
                    winner_matches[match.round_number].append(match)
                elif match.bracket_type == 'loser':
                    loser_matches[match.round_number].append(match)
                else:  # finale
                    final_matches.append(match)

            # Configurer les colonnes du winner bracket
            for i in range(self.num_rounds):
                self.winner_frame.columnconfigure(i, weight=1, minsize=300)
            for i in range(len(winner_matches[0])):
                self.winner_frame.rowconfigure(i, weight=1, minsize=150)

            # Afficher les matches du winner bracket
            for round_num, round_matches in enumerate(winner_matches):
                for match_num, match in enumerate(round_matches):
                    self.create_match_widget(self.winner_frame, match, round_num, match_num)

            # Configurer les colonnes du loser bracket
            for i in range(self.losers_rounds):
                self.loser_frame.columnconfigure(i, weight=1, minsize=300)
            for i in range(len(loser_matches[0]) if loser_matches else 0):
                self.loser_frame.rowconfigure(i, weight=1, minsize=150)

            # Afficher les matches du loser bracket
            for round_num, round_matches in enumerate(loser_matches):
                for match_num, match in enumerate(round_matches):
                    self.create_match_widget(self.loser_frame, match, round_num, match_num)

            # Configurer la colonne de la finale
            self.final_frame.columnconfigure(0, weight=1, minsize=300)
            self.final_frame.rowconfigure(0, weight=1, minsize=150)

            # Afficher la grande finale
            if final_matches:
                self.create_match_widget(self.final_frame, final_matches[0], 0, 0)

            print("Matches chargés et affichés")
            db.close()
        except Exception as e:
            db.close()
            tk.messagebox.showerror(
                "Erreur",
                f"Erreur lors du chargement des matches : {str(e)}"
            )

    def declare_winner(self, match_id, winner_id):
        try:
            db = get_db()
            match = db.query(Match).get(match_id)
            if not match:
                return

            # Mettre à jour le match actuel
            match.winnerId = winner_id
            match.status = 'completed'
            
            # Si c'est l'équipe 1 qui gagne
            if winner_id == match.team1Id:
                match.team1Score = 1
                match.team2Score = 0
            # Si c'est l'équipe 2 qui gagne
            else:
                match.team1Score = 0
                match.team2Score = 1

            # Trouver le prochain match dans le winner bracket
            if match.bracket_type == 'winner':
                next_match = (
                    db.query(Match)
                    .filter(
                        Match.tournamentId == self.tournament_id,
                        Match.bracket_type == 'winner',
                        Match.round_number == match.round_number + 1
                    )
                    .first()
                )
                if next_match:
                    # Placer le gagnant dans le prochain match
                    if not next_match.team1Id:
                        next_match.team1Id = winner_id
                    else:
                        next_match.team2Id = winner_id

                # Placer le perdant dans le loser bracket
                loser_id = match.team1Id if winner_id == match.team1Id else match.team2Id
                loser_match = (
                    db.query(Match)
                    .filter(
                        Match.tournamentId == self.tournament_id,
                        Match.bracket_type == 'loser',
                        Match.round_number == match.round_number
                    )
                    .first()
                )
                if loser_match:
                    if not loser_match.team1Id:
                        loser_match.team1Id = loser_id
                    else:
                        loser_match.team2Id = loser_id

            # Gérer la progression dans le loser bracket
            elif match.bracket_type == 'loser':
                next_match = (
                    db.query(Match)
                    .filter(
                        Match.tournamentId == self.tournament_id,
                        Match.bracket_type == 'loser',
                        Match.round_number == match.round_number + 1
                    )
                    .first()
                )
                if next_match:
                    if not next_match.team1Id:
                        next_match.team1Id = winner_id
                    else:
                        next_match.team2Id = winner_id

                # Si c'est le dernier match du loser bracket, le gagnant va en finale
                elif match.round_number == self.losers_rounds - 1:
                    final_match = (
                        db.query(Match)
                        .filter(
                            Match.tournamentId == self.tournament_id,
                            Match.bracket_type == 'final'
                        )
                        .first()
                    )
                    if final_match:
                        final_match.team2Id = winner_id

            db.commit()
            print("Base de données mise à jour")

            # Recharger l'affichage
            self.load_matches()
            db.close()
        except Exception as e:
            if db:
                db.rollback()
                db.close()
            tk.messagebox.showerror(
                "Erreur",
                f"Erreur lors de la déclaration du vainqueur : {str(e)}"
            )

    def bind_mouse_wheel(self):
        def on_mouse_wheel(event):
            if event.state & 4:  # Si Ctrl est pressé
                self.canvas.xview_scroll(-1 * (event.delta // 120), "units")
            else:
                self.canvas.yview_scroll(-1 * (event.delta // 120), "units")

        self.canvas.bind_all("<MouseWheel>", on_mouse_wheel)

    def on_frame_configure(self, event=None):
        self.canvas.configure(scrollregion=self.canvas.bbox('all'))
