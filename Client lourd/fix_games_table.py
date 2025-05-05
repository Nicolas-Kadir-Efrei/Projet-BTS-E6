from sqlalchemy import create_engine, text
from src.database import DATABASE_URL

def fix_games_table():
    # Créer la connexion à la base de données
    engine = create_engine(DATABASE_URL)
    
    # Modifier la table games
    with engine.connect() as connection:
        with connection.begin():
            try:
                # Supprimer la table existante
                connection.execute(text("DROP TABLE IF EXISTS games CASCADE"))
                
                # Recréer la table avec la bonne structure
                connection.execute(text("""
                    CREATE TABLE games (
                        id VARCHAR(36) PRIMARY KEY,
                        name VARCHAR(100),
                        image_path VARCHAR(255)
                    )
                """))
                print("Table games recréée avec succès")
            except Exception as e:
                print(f"Erreur lors de la modification de la table : {str(e)}")
                raise

if __name__ == "__main__":
    fix_games_table()
