import tkinter as tk
import ttkbootstrap as ttk

class BaseView(ttk.Frame):
    def __init__(self, master, show_dashboard_button=True):
        super().__init__(master)
        self.master = master
        self.pack(fill='both', expand=True)
        
        # Configuration du style sombre
        self.style = ttk.Style()
        self.style.configure('Dark.TFrame', background='#1E1E1E')
        self.style.configure('Dark.TLabel', background='#1E1E1E', foreground='white')
        self.configure(style='Dark.TFrame')
        
        # Barre de navigation supérieure
        self.nav_frame = ttk.Frame(self, style='Dark.TFrame')
        self.nav_frame.pack(fill='x', padx=10, pady=5)
        
        # Bouton de retour au dashboard (optionnel)
        if show_dashboard_button:
            ttk.Button(
                self.nav_frame,
                text="Retour au Dashboard",
                command=self.back_to_dashboard,
                style='primary.TButton'
            ).pack(side='left', padx=5)
    
    def back_to_dashboard(self):
        # Import here to avoid circular import
        from src.views.dashboard import Dashboard
        # Retourner au dashboard via l'application principale
        self.master.master.show_frame(Dashboard)
