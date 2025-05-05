from src.database import get_db
from src.models.models import Contact
from datetime import datetime
import uuid

def create_test_messages():
    db = next(get_db())
    try:
        # Message 1
        msg1 = Contact(
            id=str(uuid.uuid4()),
            name="Jean Dupont",
            email="jean.dupont@email.com",
            subject="Question sur le tournoi CS:GO",
            message="Bonjour,\n\nJ'aimerais savoir quand commence le prochain tournoi CS:GO et comment s'inscrire.\n\nMerci d'avance,\nJean",
            created_at=datetime.now(),
            status="unread"
        )

        # Message 2
        msg2 = Contact(
            id=str(uuid.uuid4()),
            name="Marie Martin",
            email="marie.martin@email.com",
            subject="Problème d'inscription équipe",
            message="Bonjour,\n\nNous n'arrivons pas à inscrire notre équipe pour le tournoi League of Legends.\nPouvez-vous nous aider ?\n\nCordialement,\nMarie",
            created_at=datetime.now(),
            status="unread"
        )

        # Message 3
        msg3 = Contact(
            id=str(uuid.uuid4()),
            name="Lucas Bernard",
            email="lucas.bernard@email.com",
            subject="Suggestion pour les tournois",
            message="Bonjour,\n\nJ'ai une suggestion pour améliorer l'organisation des tournois : pourquoi ne pas ajouter un système de brackets interactif ?\n\nBien cordialement,\nLucas",
            created_at=datetime.now(),
            status="unread"
        )

        # Message 4
        msg4 = Contact(
            id=str(uuid.uuid4()),
            name="Sophie Petit",
            email="sophie.petit@email.com",
            subject="Demande de partenariat",
            message="Bonjour,\n\nJe représente une association d'esport et nous aimerions établir un partenariat avec votre plateforme.\nPouvons-nous discuter des possibilités ?\n\nCordialement,\nSophie",
            created_at=datetime.now(),
            status="unread"
        )

        # Message 5
        msg5 = Contact(
            id=str(uuid.uuid4()),
            name="Thomas Richard",
            email="thomas.richard@email.com",
            subject="Bug dans l'interface",
            message="Bonjour,\n\nJ'ai remarqué un bug dans l'interface : les scores ne s'affichent pas correctement dans certains matchs.\nPouvez-vous corriger cela ?\n\nMerci,\nThomas",
            created_at=datetime.now(),
            status="unread"
        )

        # Ajouter tous les messages
        db.add_all([msg1, msg2, msg3, msg4, msg5])
        db.commit()
        print("Messages de test créés avec succès !")

    except Exception as e:
        print(f"Erreur lors de la création des messages : {str(e)}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_test_messages()
