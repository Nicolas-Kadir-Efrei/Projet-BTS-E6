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
        self.tree = ttk.Treeview(self, columns=('id', 'type'), show='headings')
        self.tree.heading('id', text='ID')
        self.tree.heading('type', text='Type de tournoi')
        self.tree.pack(fill='both', expand=True, padx=10, pady=5)
        
        # Scrollbar
        scrollbar = ttk.Scrollbar(self, orient='vertical', command=self.tree.yview)
        scrollbar.pack(side='right', fill='y')
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        # Binding pour la sélection
        self.tree.bind('<<TreeviewSelect>>', self.on_select)

    def load_types(self):
        # Nettoyer la liste
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        # Charger les types depuis la base de données
        db = next(get_db())
        types = db.query(TournamentType).all()
        
        for t in types:
            self.tree.insert('', 'end', values=(t.id, t.type))

    def add_type(self):
        type_name = self.type_name_var.get().strip()
        if not type_name:
            messagebox.showerror("Erreur", "Veuillez entrer un type de tournoi")
            return
        
        db = next(get_db())
        try:
            # Vérifier si le type existe déjà
            existing = db.query(TournamentType).filter(TournamentType.type == type_name).first()
            if existing:
                messagebox.showerror("Erreur", "Ce type de tournoi existe déjà")
                return
            
            # Créer le nouveau type
            tournament_type = TournamentType(type=type_name)
            db.add(tournament_type)
            db.commit()
            
            # Rafraîchir la liste
            self.load_types()
            self.type_name_var.set("")
            
        except Exception as e:
            db.rollback()
            messagebox.showerror("Erreur", str(e))

    def edit_type(self):
        selection = self.tree.selection()
        if not selection:
            messagebox.showwarning("Attention", "Veuillez sélectionner un type à modifier")
            return
        
        type_name = self.type_name_var.get().strip()
        if not type_name:
            messagebox.showerror("Erreur", "Veuillez entrer un type de tournoi")
            return
        
        type_id = self.tree.item(selection[0])['values'][0]
        
        db = next(get_db())
        try:
            # Vérifier si le nouveau nom existe déjà
            existing = db.query(TournamentType).filter(
                TournamentType.type == type_name,
                TournamentType.id != type_id
            ).first()
            if existing:
                messagebox.showerror("Erreur", "Ce type de tournoi existe déjà")
                return
            
            # Mettre à jour le type
            tournament_type = db.query(TournamentType).get(type_id)
            if tournament_type:
                tournament_type.type = type_name
                db.commit()
                self.load_types()
                self.type_name_var.set("")
            
        except Exception as e:
            db.rollback()
            messagebox.showerror("Erreur", str(e))

    def delete_type(self):
        selection = self.tree.selection()
        if not selection:
            messagebox.showwarning("Attention", "Veuillez sélectionner un type à supprimer")
            return
        
        if not messagebox.askyesno("Confirmation", "Voulez-vous vraiment supprimer ce type de tournoi ?"):
            return
        
        type_id = self.tree.item(selection[0])['values'][0]
        
        db = next(get_db())
        try:
            tournament_type = db.query(TournamentType).get(type_id)
            if tournament_type:
                db.delete(tournament_type)
                db.commit()
                self.load_types()
                self.type_name_var.set("")
            
        except Exception as e:
            db.rollback()
            messagebox.showerror("Erreur", str(e))

    def on_select(self, event):
        selection = self.tree.selection()
        if selection:
            type_name = self.tree.item(selection[0])['values'][1]
            self.type_name_var.set(type_name)

    def return_dashboard(self):
        self.master.switch_frame("Dashboard")
