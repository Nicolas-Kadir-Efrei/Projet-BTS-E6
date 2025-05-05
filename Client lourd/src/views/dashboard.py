import tkinter as tk
import ttkbootstrap as ttk
from src.views.base_view import BaseView
from src.views.teams import TeamManagement
from src.views.tournaments import TournamentManagement
from src.views.users import UserManagement
from src.views.games import GameList
from src.views.tournament_types import TournamentTypeManager
from src.views.messages import MessageManagement

class Dashboard(BaseView):
    def __init__(self, master):
        super().__init__(master, show_dashboard_button=False)
        self.create_widgets()

    def create_widgets(self):
        # Titre
        title = ttk.Label(
            self,
            text="Tableau de Bord",
            font=("Helvetica", 24, "bold")
        )
        title.pack(pady=20)

        # Frame pour les boutons
        buttons_frame = ttk.Frame(self)
        buttons_frame.pack(expand=True)
        
        # Configurer la grille
        buttons_frame.columnconfigure(0, weight=1)
        buttons_frame.columnconfigure(1, weight=1)
        
        # Boutons de navigation
        ttk.Button(
            buttons_frame,
            text="Gestion des Équipes",
            command=lambda: self.master.master.show_frame(TeamManagement),
            style='primary.TButton'
        ).grid(row=0, column=0, padx=5, pady=5, sticky='nsew')
        
        ttk.Button(
            buttons_frame,
            text="Gestion des Tournois",
            command=lambda: self.master.master.show_frame(TournamentManagement),
            style='primary.TButton'
        ).grid(row=0, column=1, padx=5, pady=5, sticky='nsew')
        
        ttk.Button(
            buttons_frame,
            text="Gestion des Utilisateurs",
            command=lambda: self.master.master.show_frame(UserManagement),
            style='primary.TButton'
        ).grid(row=1, column=0, padx=5, pady=5, sticky='nsew')
        
        ttk.Button(
            buttons_frame,
            text="Gestion des Jeux",
            command=lambda: self.master.master.show_frame(GameList),
            style='primary.TButton'
        ).grid(row=1, column=1, padx=5, pady=5, sticky='nsew')
        
        ttk.Button(
            buttons_frame,
            text="Types de Tournois",
            command=lambda: self.master.master.show_frame(TournamentTypeManager),
            style='primary.TButton'
        ).grid(row=2, column=0, padx=5, pady=5, sticky='nsew')
        
        ttk.Button(
            buttons_frame,
            text="Gérer les Messages",
            command=lambda: self.master.master.show_frame(MessageManagement),
            style='info.TButton'
        ).grid(row=2, column=1, padx=5, pady=5, sticky='nsew')
        
        # Bouton de déconnexion
        ttk.Button(
            buttons_frame,
            text="Déconnexion",
            command=self.logout,
            style='danger.TButton'
        ).grid(row=3, column=0, columnspan=2, padx=5, pady=5, sticky='nsew')

    def logout(self):
        # Effacer l'utilisateur de la session
        self.master.master.session_manager.clear_user()
        
        # Rediriger vers la page de connexion
        from src.views.login import LoginView
        self.master.master.show_frame(LoginView)
