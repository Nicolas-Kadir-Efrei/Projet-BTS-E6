import tkinter as tk
import ttkbootstrap as ttk
from src.views.dashboard import Dashboard
from src.views.teams import TeamManagement
from src.views.tournaments import TournamentManagement
from src.views.users import UserManagement
from src.views.games import GameList
from src.views.tournament_types import TournamentTypeManager
from src.views.login import Login
from src.database import init_db
from src.utils.session import SessionManager

class MainContainer(ttk.Frame):
    def __init__(self, master):
        super().__init__(master)
        self.pack(fill='both', expand=True)

class App(ttk.Window):
    def __init__(self):
        super().__init__(themename="darkly")
        
        # Initialiser la base de données
        init_db()
        
        # Configuration de la fenêtre
        self.title("Gestionnaire de Tournois")
        self.geometry("1200x800")
        
        # Conteneur principal
        self.main_container = MainContainer(self)
        
        # Gestionnaire de session
        self.session_manager = SessionManager()
        
        # Dictionnaire des frames
        self.frames = {}
        
        # Enregistrer toutes les vues
        for F in (Login, Dashboard, TeamManagement, TournamentManagement, UserManagement, GameList, TournamentTypeManager):
            frame = F(self.main_container)
            self.frames[F] = frame
            frame.pack(fill='both', expand=True)
            frame.pack_forget()  # Cacher initialement
        
        # Afficher la vue de connexion au démarrage
        self.show_frame(Login)
    
    def show_frame(self, frame_class):
        # Cacher le frame actuel s'il existe
        if hasattr(self, 'current_frame'):
            self.current_frame.pack_forget()
        
        # Créer et afficher le nouveau frame
        self.current_frame = self.frames[frame_class]
        self.current_frame.pack(fill='both', expand=True)

if __name__ == "__main__":
    app = App()
    app.mainloop()
