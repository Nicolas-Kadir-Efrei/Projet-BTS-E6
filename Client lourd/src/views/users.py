import tkinter as tk
import ttkbootstrap as ttk
from src.database import get_db
from src.models.models import User
from src.views.base_view import BaseView
import hashlib
from sqlalchemy.orm import Session

class UserManagement(BaseView):
    def __init__(self, master):
        super().__init__(master)
        self.create_widgets()
        self.load_users()

    def create_widgets(self):
        # Titre
        title_frame = ttk.Frame(self)
        title_frame.pack(fill='x', pady=10)
        
        title = ttk.Label(
            title_frame,
            text="Gestion des Utilisateurs",
            font=("Helvetica", 16, "bold")
        )
        title.pack(side='left', padx=10)
        
        # Bouton retour
        ttk.Button(
            title_frame,
            text="Retour au Dashboard",
            command=self.back_to_dashboard,
            style='primary.TButton'
        ).pack(side='right', padx=10)
        
        # Frame pour la liste des utilisateurs
        self.users_frame = ttk.Frame(self)
        self.users_frame.pack(fill='both', expand=True, padx=10, pady=10)
        
        # Treeview pour afficher les utilisateurs
        columns = ('id', 'pseudo', 'name', 'last_name', 'email', 'role')
        self.tree = ttk.Treeview(self.users_frame, columns=columns, show='headings')
        
        # Définir les en-têtes
        self.tree.heading('id', text='ID')
        self.tree.heading('pseudo', text='Pseudo')
        self.tree.heading('name', text='Prénom')
        self.tree.heading('last_name', text='Nom')
        self.tree.heading('email', text='Email')
        self.tree.heading('role', text='Rôle')
        
        # Définir les largeurs des colonnes
        self.tree.column('id', width=50)
        self.tree.column('pseudo', width=100)
        self.tree.column('name', width=100)
        self.tree.column('last_name', width=100)
        self.tree.column('email', width=200)
        self.tree.column('role', width=100)
        
        # Ajouter une scrollbar
        scrollbar = ttk.Scrollbar(self.users_frame, orient='vertical', command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        # Placement des widgets
        self.tree.pack(side='left', fill='both', expand=True)
        scrollbar.pack(side='right', fill='y')
        
        # Frame pour les boutons d'action
        buttons_frame = ttk.Frame(self)
        buttons_frame.pack(fill='x', padx=10, pady=10)
        
        ttk.Button(
            buttons_frame,
            text="Nouvel Utilisateur",
            command=self.create_user,
            style='success.TButton'
        ).pack(side='left', padx=5)
        
        ttk.Button(
            buttons_frame,
            text="Modifier",
            command=self.edit_user,
            style='info.TButton'
        ).pack(side='left', padx=5)
        
        ttk.Button(
            buttons_frame,
            text="Supprimer",
            command=self.delete_user,
            style='danger.TButton'
        ).pack(side='left', padx=5)

    def load_users(self):
        # Nettoyer l'arbre
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        # Charger les utilisateurs depuis la base de données
        db: Session = next(get_db())
        users = db.query(User).all()
        
        # Insérer les utilisateurs dans l'arbre
        for user in users:
            self.tree.insert('', 'end', values=(
                user.id,
                user.pseudo,
                user.name,
                user.last_name,
                user.email,
                user.role
            ))
        
        db.close()

    def create_user(self):
        # Créer une nouvelle fenêtre pour le formulaire
        dialog = ttk.Toplevel(self)
        dialog.title("Nouvel Utilisateur")
        dialog.geometry("400x500")
        
        # Variables
        pseudo_var = tk.StringVar()
        name_var = tk.StringVar()
        last_name_var = tk.StringVar()
        email_var = tk.StringVar()
        password_var = tk.StringVar()
        role_var = tk.StringVar()
        
        # Formulaire
        ttk.Label(dialog, text="Pseudo:").pack(pady=5)
        ttk.Entry(dialog, textvariable=pseudo_var).pack(pady=5)
        
        ttk.Label(dialog, text="Prénom:").pack(pady=5)
        ttk.Entry(dialog, textvariable=name_var).pack(pady=5)
        
        ttk.Label(dialog, text="Nom:").pack(pady=5)
        ttk.Entry(dialog, textvariable=last_name_var).pack(pady=5)
        
        ttk.Label(dialog, text="Email:").pack(pady=5)
        ttk.Entry(dialog, textvariable=email_var).pack(pady=5)
        
        ttk.Label(dialog, text="Mot de passe:").pack(pady=5)
        ttk.Entry(dialog, textvariable=password_var, show="*").pack(pady=5)
        
        ttk.Label(dialog, text="Rôle:").pack(pady=5)
        role_cb = ttk.Combobox(dialog, textvariable=role_var)
        role_cb['values'] = ['user', 'admin']
        role_cb.pack(pady=5)
        
        # Boutons
        buttons_frame = ttk.Frame(dialog)
        buttons_frame.pack(pady=20)
        
        ttk.Button(
            buttons_frame,
            text="Annuler",
            command=dialog.destroy,
            style='danger.TButton'
        ).pack(side='left', padx=5)
        
        ttk.Button(
            buttons_frame,
            text="Créer",
            command=lambda: self.save_user(
                pseudo_var.get(),
                name_var.get(),
                last_name_var.get(),
                email_var.get(),
                password_var.get(),
                role_var.get(),
                dialog
            ),
            style='success.TButton'
        ).pack(side='left', padx=5)

    def save_user(self, pseudo, name, last_name, email, password, role, dialog):
        if not all([pseudo, name, last_name, email, password, role]):
            tk.messagebox.showerror("Erreur", "Veuillez remplir tous les champs")
            return
        
        # Hash du mot de passe
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        # Créer l'utilisateur dans la base de données
        db: Session = next(get_db())
        new_user = User(
            pseudo=pseudo,
            name=name,
            last_name=last_name,
            email=email,
            password=hashed_password,
            role=role
        )
        db.add(new_user)
        db.commit()
        db.close()
        
        # Fermer la fenêtre et recharger la liste
        dialog.destroy()
        self.load_users()

    def edit_user(self):
        # Vérifier qu'un utilisateur est sélectionné
        selection = self.tree.selection()
        if not selection:
            tk.messagebox.showwarning("Attention", "Veuillez sélectionner un utilisateur à modifier")
            return
        
        # Récupérer l'utilisateur sélectionné
        user_id = self.tree.item(selection[0])['values'][0]
        db: Session = next(get_db())
        user = db.query(User).filter_by(id=user_id).first()
        
        if not user:
            tk.messagebox.showerror("Erreur", "Utilisateur non trouvé")
            db.close()
            return
        
        # Créer une nouvelle fenêtre pour le formulaire
        dialog = ttk.Toplevel(self)
        dialog.title("Modifier l'utilisateur")
        dialog.geometry("400x500")
        
        # Variables
        pseudo_var = tk.StringVar(value=user.pseudo)
        name_var = tk.StringVar(value=user.name)
        last_name_var = tk.StringVar(value=user.last_name)
        email_var = tk.StringVar(value=user.email)
        password_var = tk.StringVar()
        role_var = tk.StringVar(value=user.role)
        
        # Formulaire
        ttk.Label(dialog, text="Pseudo:").pack(pady=5)
        ttk.Entry(dialog, textvariable=pseudo_var).pack(pady=5)
        
        ttk.Label(dialog, text="Prénom:").pack(pady=5)
        ttk.Entry(dialog, textvariable=name_var).pack(pady=5)
        
        ttk.Label(dialog, text="Nom:").pack(pady=5)
        ttk.Entry(dialog, textvariable=last_name_var).pack(pady=5)
        
        ttk.Label(dialog, text="Email:").pack(pady=5)
        ttk.Entry(dialog, textvariable=email_var).pack(pady=5)
        
        ttk.Label(dialog, text="Nouveau mot de passe (optionnel):").pack(pady=5)
        ttk.Entry(dialog, textvariable=password_var, show="*").pack(pady=5)
        
        ttk.Label(dialog, text="Rôle:").pack(pady=5)
        role_cb = ttk.Combobox(dialog, textvariable=role_var)
        role_cb['values'] = ['user', 'admin']
        role_cb.pack(pady=5)
        
        # Boutons
        buttons_frame = ttk.Frame(dialog)
        buttons_frame.pack(pady=20)
        
        ttk.Button(
            buttons_frame,
            text="Annuler",
            command=dialog.destroy,
            style='danger.TButton'
        ).pack(side='left', padx=5)
        
        ttk.Button(
            buttons_frame,
            text="Enregistrer",
            command=lambda: self.update_user(
                user.id,
                pseudo_var.get(),
                name_var.get(),
                last_name_var.get(),
                email_var.get(),
                password_var.get(),
                role_var.get(),
                dialog
            ),
            style='success.TButton'
        ).pack(side='left', padx=5)
        
        db.close()

    def update_user(self, user_id, pseudo, name, last_name, email, password, role, dialog):
        if not all([pseudo, name, last_name, email, role]):
            tk.messagebox.showerror("Erreur", "Veuillez remplir tous les champs obligatoires")
            return
        
        # Mettre à jour l'utilisateur dans la base de données
        db: Session = next(get_db())
        user = db.query(User).filter_by(id=user_id).first()
        
        if user:
            user.pseudo = pseudo
            user.name = name
            user.last_name = last_name
            user.email = email
            user.role = role
            
            # Mettre à jour le mot de passe uniquement s'il est fourni
            if password:
                user.password = hashlib.sha256(password.encode()).hexdigest()
            
            db.commit()
        
        db.close()
        
        # Fermer la fenêtre et recharger la liste
        dialog.destroy()
        self.load_users()

    def delete_user(self):
        # Vérifier qu'un utilisateur est sélectionné
        selection = self.tree.selection()
        if not selection:
            tk.messagebox.showwarning("Attention", "Veuillez sélectionner un utilisateur à supprimer")
            return
        
        # Demander confirmation
        if not tk.messagebox.askyesno("Confirmation", "Êtes-vous sûr de vouloir supprimer cet utilisateur ?"):
            return
        
        # Récupérer l'utilisateur sélectionné
        user_id = self.tree.item(selection[0])['values'][0]
        
        # Supprimer l'utilisateur de la base de données
        db: Session = next(get_db())
        user = db.query(User).filter_by(id=user_id).first()
        
        if user:
            db.delete(user)
            db.commit()
        
        db.close()
        
        # Recharger la liste
        self.load_users()
