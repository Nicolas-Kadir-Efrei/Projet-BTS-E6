from sqlalchemy import create_engine, inspect
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
inspector = inspect(engine)

def check_table_structure():
    for table_name in inspector.get_table_names():
        print(f"\nTable: {table_name}")
        for column in inspector.get_columns(table_name):
            print(f"Column: {column['name']}, Type: {column['type']}")

if __name__ == "__main__":
    check_table_structure()
