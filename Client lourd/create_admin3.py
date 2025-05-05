from src.utils.database import SessionLocal
from src.models.models import User
import hashlib
from datetime import datetime

def create_admin():
    db = SessionLocal()
    try:
        # Vérifier si l'admin existe déjà
        admin = db.query(User).filter(User.email == "admin3@esport-tournois.com").first()
        if admin:
            print("Un administrateur existe déjà avec cet email")
            return

        # Créer le hash du mot de passe avec SHA-256
        password = "admin123"  # Mot de passe par défaut
        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        # Créer l'administrateur
        admin = User(
            pseudo="admin3",
            name="Admin",
            last_name="System",
            email="admin3@esport-tournois.com",
            password=hashed_password,  # SHA-256 hash
            sexe="N",  # N pour neutre
            birthday=datetime.now().date(),
            role="admin",
            last_auth=datetime.now()
        )

        db.add(admin)
        db.commit()
        print("Administrateur créé avec succès!")
        print("Email: admin3@esport-tournois.com")
        print("Mot de passe: admin123")
        print("\nVeuillez changer le mot de passe après la première connexion.")

    except Exception as e:
        print(f"Erreur lors de la création de l'administrateur: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
