from sqlalchemy import create_engine, text
from src.database import DATABASE_URL
import uuid
import hashlib
from datetime import datetime, date

def create_test_users():
    # Créer la connexion à la base de données
    engine = create_engine(DATABASE_URL)
    
    # Créer les utilisateurs de test
    try:
        with engine.connect() as connection:
            with connection.begin():
                # Créer l'administrateur
                admin = {
                    'id': str(uuid.uuid4()),
                    'pseudo': 'admin',
                    'name': 'Admin',
                    'last_name': 'System',
                    'email': 'admin@example.com',
                    'password': hashlib.sha256('admin123'.encode()).hexdigest(),
                    'sexe': 'M',
                    'birthday': date(1990, 1, 1),
                    'created_at': datetime.now(),
                    'last_auth': None,
                    'role': 'admin'
                }
                
                # Créer l'utilisateur normal
                user = {
                    'id': str(uuid.uuid4()),
                    'pseudo': 'user',
                    'name': 'John',
                    'last_name': 'Doe',
                    'email': 'user@example.com',
                    'password': hashlib.sha256('user123'.encode()).hexdigest(),
                    'sexe': 'M',
                    'birthday': date(1995, 1, 1),
                    'created_at': datetime.now(),
                    'last_auth': None,
                    'role': 'user'
                }
                
                # Insérer les utilisateurs
                for account in [admin, user]:
                    connection.execute(text("""
                        INSERT INTO users (id, pseudo, name, last_name, email, password, sexe, birthday, created_at, last_auth, role)
                        VALUES (:id, :pseudo, :name, :last_name, :email, :password, :sexe, :birthday, :created_at, :last_auth, :role)
                    """), account)
                
                print("Comptes de test créés avec succès :")
                print(f"Admin - Email: {admin['email']}, Password: admin123")
                print(f"User - Email: {user['email']}, Password: user123")
                
    except Exception as e:
        print(f"Erreur lors de la création des comptes : {str(e)}")
        raise

if __name__ == "__main__":
    create_test_users()
