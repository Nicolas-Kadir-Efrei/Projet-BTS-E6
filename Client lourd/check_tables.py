from sqlalchemy import create_engine, text
from src.database import DATABASE_URL

def check_tables():
    # Créer la connexion à la base de données
    engine = create_engine(DATABASE_URL)
    
    # Vérifier les tables
    with engine.connect() as connection:
        # Lister toutes les tables
        tables = connection.execute(text("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """)).fetchall()
        
        print("\nTables existantes :")
        for table in tables:
            print(f"\n=== Table : {table[0]} ===")
            # Lister les colonnes de chaque table
            columns = connection.execute(text(f"""
                SELECT column_name, data_type, character_maximum_length
                FROM information_schema.columns
                WHERE table_name = '{table[0]}'
                ORDER BY ordinal_position
            """)).fetchall()
            
            for column in columns:
                length = f"({column[2]})" if column[2] else ""
                print(f"- {column[0]} : {column[1]}{length}")

if __name__ == "__main__":
    check_tables()
