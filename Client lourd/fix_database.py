from sqlalchemy import create_engine, text
from src.database import DATABASE_URL

def fix_database():
    # Créer la connexion à la base de données
    engine = create_engine(DATABASE_URL)
    
    # Modifier les tables
    with engine.connect() as connection:
        with connection.begin():
            try:
                # Supprimer toutes les tables dans le bon ordre
                connection.execute(text("DROP TABLE IF EXISTS team_members CASCADE"))
                connection.execute(text("DROP TABLE IF EXISTS users CASCADE"))
                connection.execute(text("DROP TABLE IF EXISTS teams CASCADE"))
                connection.execute(text("DROP TABLE IF EXISTS tournaments CASCADE"))
                connection.execute(text("DROP TABLE IF EXISTS games CASCADE"))
                
                # Recréer la table games
                connection.execute(text("""
                    CREATE TABLE games (
                        id VARCHAR(36) PRIMARY KEY,
                        name VARCHAR(100),
                        image_path VARCHAR(255)
                    )
                """))
                
                # Recréer la table tournaments
                connection.execute(text("""
                    CREATE TABLE tournaments (
                        id VARCHAR(36) PRIMARY KEY,
                        name VARCHAR(100),
                        description TEXT,
                        start_date TIMESTAMP,
                        end_date TIMESTAMP,
                        "gameId" VARCHAR(36) REFERENCES games(id),
                        status VARCHAR(20),
                        max_teams INTEGER,
                        created_at TIMESTAMP
                    )
                """))
                
                # Recréer la table users
                connection.execute(text("""
                    CREATE TABLE users (
                        id VARCHAR(36) PRIMARY KEY,
                        pseudo VARCHAR(50) UNIQUE,
                        name VARCHAR(50),
                        last_name VARCHAR(50),
                        email VARCHAR(100) UNIQUE,
                        password VARCHAR(64),
                        sexe VARCHAR(1),
                        birthday DATE,
                        created_at TIMESTAMP,
                        last_auth TIMESTAMP,
                        role VARCHAR(20)
                    )
                """))
                
                # Recréer la table teams
                connection.execute(text("""
                    CREATE TABLE teams (
                        id VARCHAR(36) PRIMARY KEY,
                        name VARCHAR(100),
                        description TEXT,
                        created_at TIMESTAMP,
                        "gameId" VARCHAR(36) REFERENCES games(id),
                        "tournamentId" VARCHAR(36) REFERENCES tournaments(id)
                    )
                """))
                
                # Recréer la table team_members
                connection.execute(text("""
                    CREATE TABLE team_members (
                        id VARCHAR(36) PRIMARY KEY,
                        "userId" VARCHAR(36) REFERENCES users(id),
                        "teamId" VARCHAR(36) REFERENCES teams(id),
                        role VARCHAR(50),
                        joined_at TIMESTAMP
                    )
                """))
                
                print("Base de données recréée avec succès")
            except Exception as e:
                print(f"Erreur lors de la modification de la base de données : {str(e)}")
                raise

if __name__ == "__main__":
    fix_database()
