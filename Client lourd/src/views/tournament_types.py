import tkinter as tk
from tkinter import ttk, messagebox
from sqlalchemy.orm import Session
from src.database import get_db
from src.models.models import TournamentType
import ttkbootstrap as ttk
from src.views.base_view import BaseView

class TournamentTypeManager(BaseView):
    def __init__(self, master):
        super().__init__(master)
        self.create_widgets()
        self.load_types()

    def create_widgets(self):
        # Frame pour les contrôles
        controls_frame = ttk.Frame(self, style='Dark.TFrame')
        controls_frame.pack(fill='x', padx=10, pady=5)
        
        # Champs pour le type de tournoi
        ttk.Label(controls_frame, text="Type de tournoi:", style='Dark.TLabel').pack(side='left', padx=5)
        self.type_name_var = tk.StringVar()
        self.type_entry = ttk.Entry(controls_frame, textvariable=self.type_name_var)
        self.type_entry.pack(side='left', padx=5)
        
        # Boutons
        ttk.Button(controls_frame, text="Ajouter", command=self.add_type).pack(side='left', padx=5)
        ttk.Button(controls_frame, text="Modifier", command=self.edit_type).pack(side='left', padx=5)
        ttk.Button(controls_frame, text="Supprimer", command=self.delete_type).pack(side='left', padx=5)
        ttk.Button(controls_frame, text="Retour", command=self.return_dashboard).pack(side='left', padx=5)
        
        # Treeview pour la liste des types
        self.tree = ttk.Treeview(self, columns=('id', 'type', 'description'), show='headings')
        self.tree.heading('id', text='ID')
        self.tree.heading('type', text='Type de tournoi')
        self.tree.heading('description', text='Description')
        self.tree.pack(fill='both', expand=True, padx=10, pady=5)
        
        # Scrollbar
        scrollbar = ttk.Scrollbar(self, orient='vertical', command=self.tree.yview)
        scrollbar.pack(side='right', fill='y')
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        # Binding pour la sélection
        self.tree.bind('<<TreeviewSelect>>', self.on_select)

    def load_types(self):
        try:
            db = get_db()
            types = db.query(TournamentType).all()
            
            # Effacer les données existantes
            for item in self.tree.get_children():
                self.tree.delete(item)
            
            # Ajouter les types
            for t in types:
                self.tree.insert('', 'end', values=(t.id, t.type, t.description))
            
            db.close()
        except Exception as e:
            messagebox.showerror("Erreur", str(e))

    def add_type(self):
        # Créer une nouvelle fenêtre pour le formulaire
        dialog = tk.Toplevel(self)
        dialog.title("Nouveau Type de Tournoi")
        dialog.geometry("400x200")

        # Créer les widgets du formulaire
        ttk.Label(dialog, text="Nom :").pack(pady=5)
        name_entry = ttk.Entry(dialog)
        name_entry.pack(pady=5)

        ttk.Label(dialog, text="Description :").pack(pady=5)
        desc_entry = ttk.Entry(dialog)
        desc_entry.pack(pady=5)

        def save():
            name = name_entry.get()
            description = desc_entry.get()

            if not name:
                messagebox.showerror("Erreur", "Le nom est requis")
                return

            try:
                db = get_db()
                new_type = TournamentType(
                    type=name,
                    description=description
                )
                db.add(new_type)
                db.commit()
                db.close()
                dialog.destroy()
                self.load_types()  # Recharger la liste
                messagebox.showinfo("Succès", "Type de tournoi ajouté avec succès")
            except Exception as e:
                if db:
                    db.rollback()
                    db.close()
                messagebox.showerror("Erreur", f"Erreur lors de l'ajout : {str(e)}")

        ttk.Button(dialog, text="Enregistrer", command=save).pack(pady=5)

    def edit_type(self):
        selection = self.tree.selection()
        if not selection:
            messagebox.showwarning("Attention", "Veuillez sélectionner un type à modifier")
            return
        
        try:
            db = get_db()
            type_id = self.tree.item(selection[0])['values'][0]
            tournament_type = db.query(TournamentType).filter(TournamentType.id == type_id).first()
            
            if not tournament_type:
                messagebox.showerror("Erreur", "Type de tournoi non trouvé")
                return
            
            # Créer une nouvelle fenêtre pour l'édition
            dialog = tk.Toplevel(self)
            dialog.title("Modifier le Type de Tournoi")
            dialog.geometry("400x200")
            
            # Créer les widgets du formulaire
            ttk.Label(dialog, text="Nom :").pack(pady=5)
            name_entry = ttk.Entry(dialog)
            name_entry.insert(0, tournament_type.type)
            name_entry.pack(pady=5)
            
            ttk.Label(dialog, text="Description :").pack(pady=5)
            desc_entry = ttk.Entry(dialog)
            if tournament_type.description:
                desc_entry.insert(0, tournament_type.description)
            desc_entry.pack(pady=5)
            
            def save():
                name = name_entry.get()
                description = desc_entry.get()
                
                if not name:
                    messagebox.showerror("Erreur", "Le nom est requis")
                    return
                
                try:
                    tournament_type.type = name
                    tournament_type.description = description
                    db.commit()
                    dialog.destroy()
                    self.load_types()  # Recharger la liste
                    messagebox.showinfo("Succès", "Type de tournoi modifié avec succès")
                except Exception as e:
                    db.rollback()
                    messagebox.showerror("Erreur", f"Erreur lors de la modification : {str(e)}")
                finally:
                    db.close()
            
            ttk.Button(dialog, text="Enregistrer", command=save).pack(pady=5)
            
        except Exception as e:
            if db:
                db.close()
            messagebox.showerror("Erreur", str(e))

    def delete_type(self):
        selection = self.tree.selection()
        if not selection:
            messagebox.showwarning("Attention", "Veuillez sélectionner un type à supprimer")
            return
        
        if not messagebox.askyesno("Confirmation", "Êtes-vous sûr de vouloir supprimer ce type de tournoi ?"):
            return
        
        try:
            db = get_db()
            type_id = self.tree.item(selection[0])['values'][0]
            tournament_type = db.query(TournamentType).filter(TournamentType.id == type_id).first()
            
            if tournament_type:
                db.delete(tournament_type)
                db.commit()
                self.load_types()  # Recharger la liste
                messagebox.showinfo("Succès", "Type de tournoi supprimé avec succès")
            
            db.close()
        except Exception as e:
            if db:
                db.rollback()
                db.close()
            messagebox.showerror("Erreur", str(e))

    def on_select(self, event):
        selection = self.tree.selection()
        if selection:
            type_name = self.tree.item(selection[0])['values'][1]
            self.type_name_var.set(type_name)

    def return_dashboard(self):
        self.master.switch_frame("Dashboard")
