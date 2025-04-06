import tkinter as tk
import ttkbootstrap as ttk
from src.database import get_db
from src.models.models import User
from src.views.base_view import BaseView
import hashlib

class Login(BaseView):
    def __init__(self, master):
        super().__init__(master)
        self.create_widgets()

    def create_widgets(self):
        # Frame central
        login_frame = ttk.Frame(self)
        login_frame.pack(expand=True)
        
        # Titre
        title = ttk.Label(
            login_frame,
            text="Connexion",
            font=("Helvetica", 24, "bold")
        )
        title.pack(pady=20)
        
        # Champs de connexion
        form_frame = ttk.Frame(login_frame)
        form_frame.pack(pady=20)
        
        # Email
        ttk.Label(form_frame, text="Email:").pack(fill='x', pady=2)
        self.email_var = tk.StringVar()
        ttk.Entry(
            form_frame,
            textvariable=self.email_var,
            width=30
        ).pack(fill='x', pady=5)
        
        # Mot de passe
        ttk.Label(form_frame, text="Mot de passe:").pack(fill='x', pady=2)
        self.password_var = tk.StringVar()
        ttk.Entry(
            form_frame,
            textvariable=self.password_var,
            show="*",
            width=30
        ).pack(fill='x', pady=5)
        
        # Bouton de connexion
        ttk.Button(
            form_frame,
            text="Se connecter",
            command=self.login,
            style='primary.TButton',
            width=20
        ).pack(pady=20)

    def login(self):
        email = self.email_var.get()
        password = self.password_var.get()
        
        if not email or not password:
            tk.messagebox.showerror("Erreur", "Veuillez remplir tous les champs")
            return
        
        # Hash du mot de passe
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        # Vérifier les identifiants
        db = next(get_db())
        user = db.query(User).filter_by(email=email, password=hashed_password).first()
        db.close()
        
        if user:
            # Stocker l'utilisateur dans le gestionnaire de session
            self.master.master.session_manager.set_user(user)
            
            # Rediriger vers le tableau de bord
            from src.views.dashboard import Dashboard
            self.master.master.show_frame(Dashboard)
        else:
            tk.messagebox.showerror("Erreur", "Email ou mot de passe incorrect")
