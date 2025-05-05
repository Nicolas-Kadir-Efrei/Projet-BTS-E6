import tkinter as tk
from tkinter import ttk, messagebox
from src.database import get_db
from src.models.models import User
import hashlib
from datetime import datetime

class LoginView(ttk.Frame):
    def __init__(self, parent, on_login_success):
        super().__init__(parent)
        self.parent = parent
        self.on_login_success = on_login_success
        self.create_widgets()

    def create_widgets(self):
        # Frame principal
        main_frame = ttk.Frame(self, padding="20")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        # Titre
        title_label = ttk.Label(main_frame, text="Connexion", font=('Helvetica', 16, 'bold'))
        title_label.grid(row=0, column=0, columnspan=2, pady=(0, 20))

        # Email
        ttk.Label(main_frame, text="Email :").grid(row=1, column=0, sticky=tk.W, pady=5)
        self.email_var = tk.StringVar()
        self.email_entry = ttk.Entry(main_frame, textvariable=self.email_var, width=30)
        self.email_entry.grid(row=1, column=1, sticky=tk.W, pady=5)

        # Mot de passe
        ttk.Label(main_frame, text="Mot de passe :").grid(row=2, column=0, sticky=tk.W, pady=5)
        self.password_var = tk.StringVar()
        self.password_entry = ttk.Entry(main_frame, textvariable=self.password_var, show="*", width=30)
        self.password_entry.grid(row=2, column=1, sticky=tk.W, pady=5)

        # Bouton de connexion
        login_button = ttk.Button(main_frame, text="Se connecter", command=self.login)
        login_button.grid(row=3, column=0, columnspan=2, pady=20)

        # Centrer le frame principal
        self.grid_rowconfigure(0, weight=1)
        self.grid_columnconfigure(0, weight=1)

        # Lier la touche Entrée au bouton de connexion
        self.email_entry.bind('<Return>', lambda e: self.login())
        self.password_entry.bind('<Return>', lambda e: self.login())

        # Focus sur le champ email
        self.email_entry.focus()

    def login(self):
        email = self.email_var.get().strip()
        password = self.password_var.get().strip()

        if not email or not password:
            messagebox.showerror("Erreur", "Veuillez remplir tous les champs")
            return

        try:
            db = get_db()
            user = db.query(User).filter(User.email == email).first()

            if user and user.password == hashlib.sha256(password.encode()).hexdigest():
                # Mettre à jour la date de dernière connexion
                user.last_auth = datetime.now()
                db.commit()
                db.close()

                # Appeler la fonction de callback avec l'utilisateur connecté
                self.on_login_success(user)
            else:
                messagebox.showerror("Erreur", "Email ou mot de passe incorrect")
        except Exception as e:
            messagebox.showerror("Erreur", f"Une erreur est survenue : {str(e)}")
        finally:
            if 'db' in locals():
                db.close()
