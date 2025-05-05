class SessionManager:
    def __init__(self):
        self._current_user = None

    def set_user(self, user):
        """
        Définit l'utilisateur actuellement connecté
        """
        self._current_user = user

    def get_user(self):
        """
        Retourne l'utilisateur actuellement connecté
        """
        return self._current_user

    def clear_user(self):
        """
        Déconnecte l'utilisateur actuel
        """
        self._current_user = None

    @property
    def is_authenticated(self):
        """
        Vérifie si un utilisateur est actuellement connecté
        """
        return self._current_user is not None

    @property
    def is_admin(self):
        """
        Vérifie si l'utilisateur connecté est un administrateur
        """
        return self.is_authenticated and self._current_user.role == 'admin'
