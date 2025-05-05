import tkinter as tk
import ttkbootstrap as ttk
from ttkbootstrap.tableview import Tableview
from src.views.base_view import BaseView
from src.database import get_db
from src.models.models import Contact
from datetime import datetime
import tkinter.messagebox as messagebox

class MessageManagement(BaseView):
    def __init__(self, master):
        super().__init__(master)
        self.create_widgets()

    def on_show(self):
        # Cette méthode est appelée quand la vue devient visible
        self.load_messages()

    def create_widgets(self):
        # Frame principal
        self.main_frame = ttk.Frame(self)
        self.main_frame.pack(fill='both', expand=True, padx=20, pady=20)

        # Titre
        title = ttk.Label(
            self.main_frame,
            text="Gestion des Messages",
            font=("Helvetica", 24, "bold")
        )
        title.pack(pady=20)

        # Tableau des messages
        self.table_frame = ttk.Frame(self.main_frame)
        self.table_frame.pack(fill='both', expand=True, pady=10)

        # Colonnes du tableau
        self.coldata = [
            {"text": "ID", "stretch": False, "width": 50},
            {"text": "Statut", "stretch": False, "width": 80},
            {"text": "Date", "stretch": False, "width": 150},
            {"text": "Nom", "stretch": True, "width": 150},
            {"text": "Email", "stretch": True, "width": 200},
            {"text": "Sujet", "stretch": True, "width": 200}
        ]

        self.rowdata = []

        self.table = Tableview(
            master=self.table_frame,
            coldata=self.coldata,
            rowdata=self.rowdata,
            paginated=True,
            searchable=True,
            bootstyle="primary",
            stripecolor=("gray10", None)
        )
        self.table.pack(fill='both', expand=True)

        # Frame des boutons
        button_frame = ttk.Frame(self.main_frame)
        button_frame.pack(pady=10)

        # Boutons d'action
        ttk.Button(
            button_frame,
            text="Voir le message",
            command=self.view_message,
            style='primary.TButton'
        ).pack(side='left', padx=5)

        ttk.Button(
            button_frame,
            text="Marquer comme lu",
            command=self.mark_as_read,
            style='success.TButton'
        ).pack(side='left', padx=5)

        ttk.Button(
            button_frame,
            text="Supprimer",
            command=self.delete_message,
            style='danger.TButton'
        ).pack(side='left', padx=5)

        # Bouton de rafraîchissement
        ttk.Button(
            button_frame,
            text="Rafraîchir",
            command=self.load_messages,
            style='info.TButton'
        ).pack(side='left', padx=5)

    def load_messages(self):
        try:
            db = get_db()
            messages = db.query(Contact).order_by(Contact.created_at.desc()).all()
            self.rowdata = []
            for msg in messages:
                self.rowdata.append({
                    "values": (
                        msg.id,
                        msg.status,
                        msg.created_at.strftime("%Y-%m-%d %H:%M"),
                        msg.name,
                        msg.email,
                        msg.subject
                    )
                })
            self.table.delete_rows()
            for row in self.rowdata:
                self.table.insert_row("end", **row)
            db.close()
        except Exception as e:
            messagebox.showerror("Erreur", f"Erreur lors du chargement des messages : {str(e)}")

    def get_selected_message(self):
        selection = self.table.get_rows(selected=True)
        if not selection:
            messagebox.showwarning("Attention", "Veuillez sélectionner un message")
            return None
        return selection[0].values

    def view_message(self):
        selected = self.get_selected_message()
        if not selected:
            return

        try:
            db = get_db()
            message_id = selected[0]
            message = db.query(Contact).filter_by(id=message_id).first()
            if message:
                dialog = tk.Toplevel(self)
                dialog.title("Message")
                dialog.geometry("600x400")

                content_frame = ttk.Frame(dialog, padding=20)
                content_frame.pack(fill='both', expand=True)

                ttk.Label(content_frame, text=f"De : {message.name} ({message.email})", font=("Helvetica", 12, "bold")).pack(anchor='w')
                ttk.Label(content_frame, text=f"Date : {message.created_at.strftime('%Y-%m-%d %H:%M')}", font=("Helvetica", 10)).pack(anchor='w')
                ttk.Label(content_frame, text=f"Sujet : {message.subject}", font=("Helvetica", 12, "bold")).pack(anchor='w', pady=(10, 0))

                msg_frame = ttk.Frame(content_frame)
                msg_frame.pack(fill='both', expand=True, pady=(10, 0))

                msg_text = tk.Text(msg_frame, wrap='word', height=10)
                msg_text.insert('1.0', message.message)
                msg_text.config(state='disabled')
                msg_text.pack(fill='both', expand=True)

                if message.status == "unread":
                    message.status = "read"
                    db.commit()
                    self.load_messages()
            db.close()
        except Exception as e:
            if db:
                db.rollback()
                db.close()
            messagebox.showerror("Erreur", f"Erreur lors de l'affichage du message : {str(e)}")

    def mark_as_read(self):
        selected = self.get_selected_message()
        if not selected:
            return

        try:
            db = get_db()
            message_id = selected[0]
            message = db.query(Contact).filter_by(id=message_id).first()
            if message:
                message.status = "read"
                db.commit()
                self.load_messages()
                messagebox.showinfo("Succès", "Message marqué comme lu")
            db.close()
        except Exception as e:
            if db:
                db.rollback()
                db.close()
            messagebox.showerror("Erreur", f"Erreur lors du marquage du message : {str(e)}")

    def delete_message(self):
        selected = self.get_selected_message()
        if not selected:
            return

        if not messagebox.askyesno("Confirmation", "Voulez-vous vraiment supprimer ce message ?"):
            return

        try:
            db = get_db()
            message_id = selected[0]
            message = db.query(Contact).filter_by(id=message_id).first()
            if message:
                db.delete(message)
                db.commit()
                self.load_messages()
                messagebox.showinfo("Succès", "Message supprimé")
            db.close()
        except Exception as e:
            if db:
                db.rollback()
                db.close()
            messagebox.showerror("Erreur", f"Erreur lors de la suppression du message : {str(e)}")
