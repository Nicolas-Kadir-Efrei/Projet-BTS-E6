import tkinter as tk
from tkinter import ttk
from src.database import init_db
from src.views.dashboard import Dashboard
from src.views.login import LoginView
from src.session_manager import SessionManager

class App(tk.Tk):
    def __init__(self):
        super().__init__()

        # Configuration de la fenêtre principale
        self.title("Gestion de Tournois")
        self.geometry("1200x800")

        # Initialiser le gestionnaire de session
        self.session_manager = SessionManager()

        # Conteneur principal
        self.main_container = ttk.Frame(self)
        self.main_container.pack(side="top", fill="both", expand=True)

        # Configuration de la grille
        self.main_container.grid_rowconfigure(0, weight=1)
        self.main_container.grid_columnconfigure(0, weight=1)

        # Dictionnaire pour stocker les frames
        self.frames = {}

        # Initialiser la base de données
        init_db()

        # Afficher la vue de connexion
        self.show_login()

    def show_login(self):
        # Nettoyer le conteneur principal
        for widget in self.main_container.winfo_children():
            widget.destroy()

        # Créer et afficher la vue de connexion
        login_view = LoginView(self.main_container, self.on_login_success)
        login_view.grid(row=0, column=0, sticky="nsew")

    def show_dashboard(self):
        # Nettoyer le conteneur principal
        for widget in self.main_container.winfo_children():
            widget.destroy()

        # Créer et afficher le tableau de bord
        dashboard = Dashboard(self.main_container)
        dashboard.grid(row=0, column=0, sticky="nsew")

    def on_login_success(self, user):
        # Stocker l'utilisateur dans le gestionnaire de session
        self.session_manager.set_user(user)
        # Afficher le tableau de bord
        self.show_dashboard()

    def show_frame(self, frame_class):
        # Nettoyer le conteneur principal
        for widget in self.main_container.winfo_children():
            widget.destroy()

        # Créer et afficher la nouvelle vue
        if frame_class == LoginView:
            frame = frame_class(self.main_container, self.on_login_success)
        else:
            frame = frame_class(self.main_container)
        frame.grid(row=0, column=0, sticky="nsew")

if __name__ == "__main__":
    app = App()
    app.mainloop()
