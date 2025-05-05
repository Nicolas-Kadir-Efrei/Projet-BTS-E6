import ttkbootstrap as ttk
from ttkbootstrap.constants import *
from datetime import datetime, timedelta
import calendar
from sqlalchemy import func
from ..models.models import Tournament, TournamentStatus, Game
from ..utils.database import SessionLocal

class StatsCard(ttk.Frame):
    def __init__(self, parent, title, value, color="primary"):
        super().__init__(parent, padding=10)
        self.configure(bootstyle=f"{color}")
        
        self.title_label = ttk.Label(
            self,
            text=title,
            font=("Helvetica", 12),
            bootstyle=f"{color}"
        )
        self.title_label.pack(anchor="w")
        
        self.value_label = ttk.Label(
            self,
            text=str(value),
            font=("Helvetica", 24, "bold"),
            bootstyle=f"{color}"
        )
        self.value_label.pack(anchor="e", pady=(5, 0))

class TournamentCalendar(ttk.Frame):
    def __init__(self, parent):
        super().__init__(parent, padding=10)
        self.configure(bootstyle="default")
        
        # En-tête
        ttk.Label(
            self,
            text="Calendrier des tournois",
            font=("Helvetica", 14, "bold")
        ).pack(anchor="w", pady=(0, 10))
        
        # Treeview pour la liste des tournois
        self.tree = ttk.Treeview(
            self,
            columns=("date", "name", "game", "status"),
            show="headings",
            height=10
        )
        
        # Configuration des colonnes
        self.tree.heading("date", text="Date")
        self.tree.heading("name", text="Tournoi")
        self.tree.heading("game", text="Jeu")
        self.tree.heading("status", text="Statut")
        
        self.tree.column("date", width=100)
        self.tree.column("name", width=200)
        self.tree.column("game", width=100)
        self.tree.column("status", width=100)
        
        # Scrollbar
        scrollbar = ttk.Scrollbar(self, orient="vertical", command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        # Placement des widgets
        self.tree.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

class GameStatsChart(ttk.Frame):
    def __init__(self, parent):
        super().__init__(parent, padding=10)
        self.configure(bootstyle="default")
        
        # En-tête
        ttk.Label(
            self,
            text="Tournois par jeu",
            font=("Helvetica", 14, "bold")
        ).pack(anchor="w", pady=(0, 10))
        
        # Treeview pour les statistiques par jeu
        self.tree = ttk.Treeview(
            self,
            columns=("game", "count"),
            show="headings",
            height=5
        )
        
        # Configuration des colonnes
        self.tree.heading("game", text="Jeu")
        self.tree.heading("count", text="Nombre de tournois")
        
        self.tree.column("game", width=200)
        self.tree.column("count", width=150)
        
        self.tree.pack(fill="both", expand=True)

def get_tournament_stats():
    db = SessionLocal()
    try:
        now = datetime.now()
        
        # Tournois actifs (en cours)
        active_tournaments = db.query(Tournament)\
            .join(TournamentStatus)\
            .filter(TournamentStatus.status == "active")\
            .count()
            
        # Tournois à venir (date de début > maintenant)
        upcoming_tournaments = db.query(Tournament)\
            .filter(Tournament.startDate > now)\
            .count()
            
        # Statistiques par jeu
        game_stats = db.query(
            Game.name,
            func.count(Tournament.id).label('tournament_count')
        ).join(Tournament)\
         .group_by(Game.name)\
         .all()
        
        # Prochains tournois (pour le calendrier)
        upcoming_calendar = db.query(
            Tournament.startDate,
            Tournament.tournamentName,
            Game.name.label('game_name'),
            TournamentStatus.status
        ).join(Game)\
         .join(TournamentStatus)\
         .filter(Tournament.startDate >= now)\
         .order_by(Tournament.startDate)\
         .limit(10)\
         .all()
        
        return {
            'active': active_tournaments,
            'upcoming': upcoming_tournaments,
            'game_stats': game_stats,
            'calendar': upcoming_calendar
        }
    finally:
        db.close()
