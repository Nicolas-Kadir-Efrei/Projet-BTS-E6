from sqlalchemy import create_engine, text
from src.database import DATABASE_URL

def update_games_table():
    # Créer la connexion à la base de données
    engine = create_engine(DATABASE_URL)
    
    # Ajouter la colonne image_path
    with engine.connect() as connection:
        # Démarrer une transaction
        with connection.begin():
            try:
                # Ajouter la colonne
                connection.execute(text("ALTER TABLE games ADD COLUMN image_path VARCHAR(255)"))
                print("Colonne image_path ajoutée avec succès")
            except Exception as e:
                if "duplicate column" in str(e).lower():
                    print("La colonne image_path existe déjà")
                else:
                    print(f"Erreur lors de l'ajout de la colonne : {str(e)}")
                    raise

if __name__ == "__main__":
    update_games_table()
