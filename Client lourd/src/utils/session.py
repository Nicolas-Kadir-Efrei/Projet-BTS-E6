class SessionManager:
    def __init__(self):
        self.user = None
        self.is_authenticated = False

    def set_user(self, user):
        self.user = user
        self.is_authenticated = True

    def clear_user(self):
        self.user = None
        self.is_authenticated = False

    def get_user(self):
        return self.user

    def is_admin(self):
        return self.user and self.user.role == 'admin'
