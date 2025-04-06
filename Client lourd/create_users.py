from src.database import SessionLocal
from src.models.models import User
import hashlib
from datetime import datetime

def create_users():
    db = SessionLocal()
    try:
        # Supprimer les utilisateurs existants
        db.query(User).delete()
        db.commit()
        
        # Créer l'utilisateur admin
        admin_password = hashlib.sha256("admin123".encode()).hexdigest()
        admin = User(
            pseudo="admin",
            email="admin@esport-tournois.com",
            password=admin_password,
            name="Admin",
            last_name="System",
            sexe="H",
            birthday=datetime(2000, 1, 1),
            role="admin"
        )
        db.add(admin)
        
        # Créer un utilisateur normal
        user_password = hashlib.sha256("user123".encode()).hexdigest()
        user = User(
            pseudo="user",
            email="user@esport-tournois.com",
            password=user_password,
            name="User",
            last_name="Test",
            sexe="F",
            birthday=datetime(2000, 1, 1),
            role="user"
        )
        db.add(user)
        
        db.commit()
        print("[OK] Utilisateurs créés avec succès")
        print("Admin credentials: admin@esport-tournois.com / admin123")
        print("User credentials: user@esport-tournois.com / user123")
        
    except Exception as e:
        print(f"[ERROR] {str(e)}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_users()
