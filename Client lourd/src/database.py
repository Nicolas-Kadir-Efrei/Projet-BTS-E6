from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool
import os
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

# Récupérer l'URL de la base de données depuis les variables d'environnement
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:root@localhost:5432/tournament_db")

# Configuration du moteur avec des paramètres de connexion plus robustes
engine = create_engine(
    DATABASE_URL,
    pool_size=5,  # Nombre de connexions dans le pool
    max_overflow=10,  # Nombre maximum de connexions supplémentaires
    pool_timeout=30,  # Temps d'attente pour une connexion
    pool_recycle=1800,  # Recycler les connexions après 30 minutes
    pool_pre_ping=True,  # Vérifier la connexion avant utilisation
    poolclass=QueuePool  # Utiliser QueuePool pour une meilleure gestion des connexions
)

# Créer une classe de session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Créer une base pour les modèles déclaratifs
Base = declarative_base()

def get_db():
    """
    Retourne une session de base de données.
    La session doit être fermée manuellement après utilisation.
    """
    return SessionLocal()

def init_db():
    # Importer les modèles
    from src.models.models import Base
    
    # Créer les tables
    Base.metadata.create_all(bind=engine)
