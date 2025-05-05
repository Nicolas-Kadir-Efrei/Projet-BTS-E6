from sqlalchemy import create_engine, text
from src.database import DATABASE_URL

def fix_tournaments_table():
    # Créer la connexion à la base de données
    engine = create_engine(DATABASE_URL)
    
    # Modifier la table tournaments
    with engine.connect() as connection:
        with connection.begin():
            try:
                # Sauvegarder les données existantes
                result = connection.execute(text("SELECT * FROM tournaments")).fetchall()
                
                # Supprimer les contraintes de clé étrangère
                connection.execute(text("""
                    ALTER TABLE tournaments 
                    DROP CONSTRAINT IF EXISTS tournaments_gameid_fkey
                """))
                
                # Modifier le type de la colonne gameId
                connection.execute(text("""
                    ALTER TABLE tournaments 
                    ALTER COLUMN "gameId" TYPE VARCHAR(36)
                """))
                
                # Recréer la contrainte de clé étrangère
                connection.execute(text("""
                    ALTER TABLE tournaments 
                    ADD CONSTRAINT tournaments_gameid_fkey 
                    FOREIGN KEY ("gameId") 
                    REFERENCES games(id)
                """))
                
                print("Table tournaments modifiée avec succès")
            except Exception as e:
                print(f"Erreur lors de la modification de la table : {str(e)}")
                raise

if __name__ == "__main__":
    fix_tournaments_table()
