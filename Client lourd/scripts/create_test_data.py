import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.database import get_db
from src.models.models import Game, TournamentType, Tournament, Team, TeamMember, TournamentStatus, User
from datetime import datetime, time, timedelta
import hashlib

def create_test_data():
    db = next(get_db())
    
    # Créer les jeux
    games = [
        Game(name="League of Legends"),
        Game(name="Counter-Strike 2"),
        Game(name="Valorant"),
        Game(name="Rocket League"),
        Game(name="FIFA 24"),
        Game(name="Dota 2")
    ]
    
    for game in games:
        db.add(game)
    db.commit()
    
    # Créer les types de tournois
    tournament_types = [
        TournamentType(type="Élimination directe"),
        TournamentType(type="Double élimination"),
        TournamentType(type="Round Robin"),
        TournamentType(type="Championnat"),
        TournamentType(type="Coupe")
    ]
    
    for t_type in tournament_types:
        db.add(t_type)
    db.commit()
    
    # Créer quelques utilisateurs de test
    test_users = [
        {
            "pseudo": "player1",
            "name": "John",
            "last_name": "Doe",
            "email": "john@test.com",
            "password": "test123",
            "sexe": "M",
            "role": "user"
        },
        {
            "pseudo": "player2",
            "name": "Jane",
            "last_name": "Smith",
            "email": "jane@test.com",
            "password": "test123",
            "sexe": "F",
            "role": "user"
        },
        {
            "pseudo": "player3",
            "name": "Mike",
            "last_name": "Johnson",
            "email": "mike@test.com",
            "password": "test123",
            "sexe": "M",
            "role": "user"
        }
    ]
    
    users = []
    for user_data in test_users:
        hashed_password = hashlib.sha256(user_data["password"].encode()).hexdigest()
        user = User(
            pseudo=user_data["pseudo"],
            name=user_data["name"],
            last_name=user_data["last_name"],
            email=user_data["email"],
            password=hashed_password,
            sexe=user_data["sexe"],
            birthday=datetime.now().date(),
            role=user_data["role"]
        )
        db.add(user)
        users.append(user)
    db.commit()
    
    # Créer des tournois
    base_date = datetime.now().date()
    tournaments = [
        {
            "name": "LoL Championship 2025",
            "game": "League of Legends",
            "type": "Championnat",
            "date": base_date + timedelta(days=7),
            "time": time(14, 0),
            "rules": "Double élimination, BO3 en finale",
            "rewards": "1er: 1000€, 2e: 500€, 3e: 250€",
            "num_teams": 8,
            "players_per_team": 5
        },
        {
            "name": "CS2 Masters",
            "game": "Counter-Strike 2",
            "type": "Élimination directe",
            "date": base_date + timedelta(days=14),
            "time": time(15, 0),
            "rules": "BO3 tout au long du tournoi",
            "rewards": "1er: 2000€, 2e: 1000€, 3e: 500€",
            "num_teams": 16,
            "players_per_team": 5
        },
        {
            "name": "Valorant Cup",
            "game": "Valorant",
            "type": "Double élimination",
            "date": base_date + timedelta(days=21),
            "time": time(16, 0),
            "rules": "BO1 en winner bracket, BO3 en loser bracket",
            "rewards": "1er: 1500€, 2e: 750€, 3e: 375€",
            "num_teams": 8,
            "players_per_team": 5
        }
    ]
    
    for t_data in tournaments:
        game = db.query(Game).filter_by(name=t_data["game"]).first()
        t_type = db.query(TournamentType).filter_by(type=t_data["type"]).first()
        
        tournament = Tournament(
            tournamentName=t_data["name"],
            gameId=game.id,
            tournament_typeId=t_type.id,
            startDate=t_data["date"],
            startTime=t_data["time"],
            rules=t_data["rules"],
            rewards=t_data["rewards"],
            numTeams=t_data["num_teams"],
            playersPerTeam=t_data["players_per_team"],
            totalPlayers=t_data["num_teams"] * t_data["players_per_team"]
        )
        db.add(tournament)
        
        # Ajouter un statut initial
        status = TournamentStatus(
            tournamentId=tournament.id,
            status="En attente"
        )
        db.add(status)
        db.commit()
        
        # Créer quelques équipes pour ce tournoi
        team_names = [
            "Team Alpha", "Team Beta", "Team Gamma",
            "Les Invincibles", "Digital Dragons", "Cyber Knights"
        ]
        
        for i in range(min(len(team_names), t_data["num_teams"])):
            team = Team(
                teamName=f"{team_names[i]}",
                tournamentId=tournament.id
            )
            db.add(team)
            db.commit()
            
            # Ajouter des membres à l'équipe
            for j in range(min(len(users), t_data["players_per_team"])):
                member = TeamMember(
                    userId=users[j].id,
                    teamId=team.id,
                    role="player"
                )
                db.add(member)
        
        db.commit()
    
    print("Données de test créées avec succès")
    db.close()

if __name__ == '__main__':
    create_test_data()
