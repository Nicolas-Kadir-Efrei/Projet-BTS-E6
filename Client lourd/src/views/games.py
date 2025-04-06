import tkinter as tk
import ttkbootstrap as ttk
from src.database import get_db
from src.models.models import Game
from src.views.base_view import BaseView
from sqlalchemy.orm import Session

class GameList(BaseView):
    def __init__(self, master):
        super().__init__(master)
        self.create_widgets()
        self.load_games()

    def create_widgets(self):
        # Titre
        title_frame = ttk.Frame(self)
        title_frame.pack(fill='x', pady=10)
        
        title = ttk.Label(
            title_frame,
            text="Gestion des Jeux",
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
        
        # Frame pour la liste des jeux
        self.games_frame = ttk.Frame(self)
        self.games_frame.pack(fill='both', expand=True, padx=10, pady=10)
        
        # Treeview pour afficher les jeux
        columns = ('id', 'name')
        self.tree = ttk.Treeview(self.games_frame, columns=columns, show='headings')
        
        # Définir les en-têtes
        self.tree.heading('id', text='ID')
        self.tree.heading('name', text='Nom')
        
        # Définir les largeurs des colonnes
        self.tree.column('id', width=50)
        self.tree.column('name', width=200)
        
        # Ajouter une scrollbar
        scrollbar = ttk.Scrollbar(self.games_frame, orient='vertical', command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        # Placement des widgets
        self.tree.pack(side='left', fill='both', expand=True)
        scrollbar.pack(side='right', fill='y')
        
        # Frame pour les boutons d'action
        buttons_frame = ttk.Frame(self)
        buttons_frame.pack(fill='x', padx=10, pady=10)
        
        ttk.Button(
            buttons_frame,
            text="Nouveau Jeu",
            command=self.create_game,
            style='success.TButton'
        ).pack(side='left', padx=5)
        
        ttk.Button(
            buttons_frame,
            text="Modifier",
            command=self.edit_game,
            style='info.TButton'
        ).pack(side='left', padx=5)
        
        ttk.Button(
            buttons_frame,
            text="Supprimer",
            command=self.delete_game,
            style='danger.TButton'
        ).pack(side='left', padx=5)

    def load_games(self):
        # Nettoyer l'arbre
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        # Charger les jeux depuis la base de données
        db: Session = next(get_db())
        games = db.query(Game).all()
        
        # Insérer les jeux dans l'arbre
        for game in games:
            self.tree.insert('', 'end', values=(
                game.id,
                game.name
            ))
        
        db.close()

    def create_game(self):
        # Créer une nouvelle fenêtre pour le formulaire
        dialog = ttk.Toplevel(self)
        dialog.title("Nouveau Jeu")
        dialog.geometry("400x200")
        
        # Variables
        name_var = tk.StringVar()
        
        # Formulaire
        ttk.Label(dialog, text="Nom du jeu:").pack(pady=5)
        ttk.Entry(dialog, textvariable=name_var).pack(pady=5)
        
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
            command=lambda: self.save_game(name_var.get(), dialog),
            style='success.TButton'
        ).pack(side='left', padx=5)

    def save_game(self, name, dialog):
        if not name:
            tk.messagebox.showerror("Erreur", "Veuillez remplir tous les champs")
            return
        
        # Créer le jeu dans la base de données
        db: Session = next(get_db())
        new_game = Game(name=name)
        db.add(new_game)
        db.commit()
        db.close()
        
        # Fermer la fenêtre et recharger la liste
        dialog.destroy()
        self.load_games()

    def edit_game(self):
        # Vérifier qu'un jeu est sélectionné
        selection = self.tree.selection()
        if not selection:
            tk.messagebox.showwarning("Attention", "Veuillez sélectionner un jeu à modifier")
            return
        
        # Récupérer le jeu sélectionné
        game_id = self.tree.item(selection[0])['values'][0]
        db: Session = next(get_db())
        game = db.query(Game).filter_by(id=game_id).first()
        
        if not game:
            tk.messagebox.showerror("Erreur", "Jeu non trouvé")
            db.close()
            return
        
        # Créer une nouvelle fenêtre pour le formulaire
        dialog = ttk.Toplevel(self)
        dialog.title("Modifier le jeu")
        dialog.geometry("400x200")
        
        # Variables
        name_var = tk.StringVar(value=game.name)
        
        # Formulaire
        ttk.Label(dialog, text="Nom du jeu:").pack(pady=5)
        ttk.Entry(dialog, textvariable=name_var).pack(pady=5)
        
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
            command=lambda: self.update_game(game.id, name_var.get(), dialog),
            style='success.TButton'
        ).pack(side='left', padx=5)
        
        db.close()

    def update_game(self, game_id, name, dialog):
        if not name:
            tk.messagebox.showerror("Erreur", "Veuillez remplir tous les champs")
            return
        
        # Mettre à jour le jeu dans la base de données
        db: Session = next(get_db())
        game = db.query(Game).filter_by(id=game_id).first()
        
        if game:
            game.name = name
            db.commit()
        
        db.close()
        
        # Fermer la fenêtre et recharger la liste
        dialog.destroy()
        self.load_games()

    def delete_game(self):
        # Vérifier qu'un jeu est sélectionné
        selection = self.tree.selection()
        if not selection:
            tk.messagebox.showwarning("Attention", "Veuillez sélectionner un jeu à supprimer")
            return
        
        # Demander confirmation
        if not tk.messagebox.askyesno("Confirmation", "Êtes-vous sûr de vouloir supprimer ce jeu ?"):
            return
        
        # Récupérer le jeu sélectionné
        game_id = self.tree.item(selection[0])['values'][0]
        
        # Supprimer le jeu de la base de données
        db: Session = next(get_db())
        game = db.query(Game).filter_by(id=game_id).first()
        
        if game:
            db.delete(game)
            db.commit()
        
        db.close()
        
        # Recharger la liste
        self.load_games()
