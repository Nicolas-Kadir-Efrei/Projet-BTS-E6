import tkinter as tk
from tkinter import ttk, messagebox
from ttkbootstrap.dialogs import Querybox
from src.database import get_db
from src.models.models import Game
import uuid
from PIL import Image, ImageTk
from tkinter import filedialog
import os
import shutil
from datetime import datetime
from src.views.base_view import BaseView

class GameList(BaseView):
    def __init__(self, parent):
        super().__init__(parent)
        
        # Créer les widgets
        self.create_widgets()
        
        # Charger les jeux
        self.load_games()
    
    def create_widgets(self):
        # Frame pour les boutons
        button_frame = ttk.Frame(self)
        button_frame.pack(pady=10)
        
        # Bouton pour ajouter un jeu
        add_btn = ttk.Button(button_frame, text="Ajouter un jeu", command=self.add_game)
        add_btn.pack(side=tk.LEFT, padx=5)
        
        # Bouton pour rafraîchir la liste
        refresh_btn = ttk.Button(button_frame, text="Rafraîchir", command=self.load_games)
        refresh_btn.pack(side=tk.LEFT, padx=5)
        
        # Frame pour la liste des jeux
        list_frame = ttk.Frame(self)
        list_frame.pack(fill=tk.BOTH, expand=True, padx=10)
        
        # Créer le treeview
        self.tree = ttk.Treeview(list_frame, columns=('ID', 'Nom'), show='headings')
        self.tree.heading('ID', text='ID')
        self.tree.heading('Nom', text='Nom')
        
        # Masquer la colonne ID
        self.tree.column('ID', width=0, stretch=tk.NO)
        self.tree.column('Nom', width=200)
        
        # Ajouter une scrollbar
        scrollbar = ttk.Scrollbar(list_frame, orient=tk.VERTICAL, command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        # Placer les widgets
        self.tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Lier le double-clic pour éditer
        self.tree.bind('<Double-1>', self.edit_game)
        
        # Menu contextuel
        self.context_menu = tk.Menu(self, tearoff=0)
        self.context_menu.add_command(label="Éditer", command=self.edit_selected_game)
        self.context_menu.add_command(label="Supprimer", command=self.delete_selected_game)
        
        # Lier le clic droit
        self.tree.bind('<Button-3>', self.show_context_menu)
    
    def show_context_menu(self, event):
        # Sélectionner l'item sous le curseur
        item = self.tree.identify_row(event.y)
        if item:
            self.tree.selection_set(item)
            self.context_menu.post(event.x_root, event.y_root)
    
    def edit_selected_game(self):
        selected_items = self.tree.selection()
        if selected_items:
            self.edit_game(None)
    
    def delete_selected_game(self):
        selected_items = self.tree.selection()
        if selected_items:
            self.delete_game(None)
    
    def load_games(self):
        # Effacer les données existantes
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        # Charger les jeux depuis la base de données
        db = get_db()
        games = db.query(Game).all()
        
        # Ajouter les jeux au treeview
        for game in games:
            self.tree.insert('', 'end', values=(game.id, game.name))
        
        # Fermer la session
        db.close()
    
    def add_game(self):
        dialog = tk.Toplevel(self)
        dialog.title("Ajouter un jeu")
        dialog.geometry("400x150")
        
        # Rendre la fenêtre modale
        dialog.transient(self)
        dialog.grab_set()
        
        # Frame pour le formulaire
        form_frame = ttk.Frame(dialog, padding="20 10")
        form_frame.pack(fill=tk.BOTH, expand=True)
        
        # Champ pour le nom
        ttk.Label(form_frame, text="Nom du jeu :").pack(anchor=tk.W)
        name_entry = ttk.Entry(form_frame, width=40)
        name_entry.pack(fill=tk.X, pady=(0, 10))
        
        # Frame pour les boutons
        button_frame = ttk.Frame(form_frame)
        button_frame.pack(fill=tk.X, pady=(10, 0))
        
        # Boutons
        ttk.Button(button_frame, text="Annuler", command=dialog.destroy).pack(side=tk.RIGHT, padx=5)
        
        def save():
            name = name_entry.get().strip()
            if not name:
                messagebox.showerror("Erreur", "Le nom est obligatoire")
                return
            
            try:
                db = get_db()
                
                # Créer le jeu
                game = Game(name=name)
                db.add(game)
                db.commit()
                
                dialog.destroy()
                messagebox.showinfo("Succès", "Le jeu a été ajouté avec succès")
                self.load_games()
            except Exception as e:
                db.rollback()
                messagebox.showerror("Erreur", f"Une erreur est survenue : {str(e)}")
            finally:
                db.close()
        
        ttk.Button(button_frame, text="Enregistrer", command=save).pack(side=tk.RIGHT)
        
        # Focus sur le champ nom
        name_entry.focus()
    
    def edit_game(self, event):
        # Vérifier qu'un jeu est sélectionné
        selected_items = self.tree.selection()
        if not selected_items:
            return
        
        game_id = self.tree.item(selected_items[0])['values'][0]
        
        dialog = tk.Toplevel(self)
        dialog.title("Éditer le jeu")
        dialog.geometry("400x150")
        
        # Rendre la fenêtre modale
        dialog.transient(self)
        dialog.grab_set()
        
        # Frame pour le formulaire
        form_frame = ttk.Frame(dialog, padding="20 10")
        form_frame.pack(fill=tk.BOTH, expand=True)
        
        # Champ pour le nom
        ttk.Label(form_frame, text="Nom du jeu :").pack(anchor=tk.W)
        name_entry = ttk.Entry(form_frame, width=40)
        name_entry.pack(fill=tk.X, pady=(0, 10))
        
        # Récupérer les données du jeu
        db = get_db()
        game = db.query(Game).get(game_id)
        if game:
            name_entry.insert(0, game.name)
        db.close()
        
        # Frame pour les boutons
        button_frame = ttk.Frame(form_frame)
        button_frame.pack(fill=tk.X, pady=(10, 0))
        
        # Boutons
        ttk.Button(button_frame, text="Annuler", command=dialog.destroy).pack(side=tk.RIGHT, padx=5)
        
        def save():
            name = name_entry.get().strip()
            if not name:
                messagebox.showerror("Erreur", "Le nom est obligatoire")
                return
            
            try:
                db = get_db()
                game = db.query(Game).get(game_id)
                if game:
                    game.name = name
                    db.commit()
                    dialog.destroy()
                    messagebox.showinfo("Succès", "Le jeu a été modifié avec succès")
                    self.load_games()
            except Exception as e:
                db.rollback()
                messagebox.showerror("Erreur", f"Une erreur est survenue : {str(e)}")
            finally:
                db.close()
        
        ttk.Button(button_frame, text="Enregistrer", command=save).pack(side=tk.RIGHT)
        
        # Focus sur le champ nom
        name_entry.focus()
    
    def delete_game(self, event):
        # Vérifier qu'un jeu est sélectionné
        selected_items = self.tree.selection()
        if not selected_items:
            return
        
        game_id = self.tree.item(selected_items[0])['values'][0]
        
        # Demander confirmation
        if not messagebox.askyesno("Confirmation", "Voulez-vous vraiment supprimer ce jeu ?"):
            return
        
        try:
            db = get_db()
            game = db.query(Game).get(game_id)
            if game:
                db.delete(game)
                db.commit()
                messagebox.showinfo("Succès", "Le jeu a été supprimé avec succès")
                self.load_games()
        except Exception as e:
            db.rollback()
            messagebox.showerror("Erreur", f"Une erreur est survenue : {str(e)}")
        finally:
            db.close()
