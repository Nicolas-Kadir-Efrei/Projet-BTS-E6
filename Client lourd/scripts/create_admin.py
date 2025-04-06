import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.database import get_db
from src.models.models import User
import hashlib
from datetime import datetime

def create_admin_user():
    # Créer une session de base de données
    db = next(get_db())
    
    # Vérifier si l'admin existe déjà
    admin = db.query(User).filter_by(email='admin@esport-tournois.com').first()
    
    if admin:
        print("L'utilisateur admin existe déjà")
        return
    
    # Hasher le mot de passe
    password = 'admin123'
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    
    # Créer l'utilisateur admin
    admin = User(
        pseudo='admin',
        name='Admin',
        last_name='Admin',
        email='admin@esport-tournois.com',
        password=hashed_password,
        sexe='M',
        birthday=datetime.now().date(),
        role='admin'
    )
    
    # Ajouter et sauvegarder dans la base de données
    db.add(admin)
    db.commit()
    
    print("Utilisateur admin créé avec succès")
    db.close()

if __name__ == '__main__':
    create_admin_user()
