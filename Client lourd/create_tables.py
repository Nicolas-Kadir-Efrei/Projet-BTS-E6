from src.utils.database import engine
from src.models.models import Base

def create_tables():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("Tables créées avec succès!")

if __name__ == "__main__":
    create_tables()
