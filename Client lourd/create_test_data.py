from src.utils.database import SessionLocal
from src.models.models import Game, TournamentType, Tournament, TournamentStatus, Team, Match
from datetime import datetime, timedelta
import random
from sqlalchemy import func
import math

def create_matches_for_tournament(db, tournament, teams):
    num_teams = len(teams)
    num_rounds = math.ceil(math.log2(num_teams))
    
    # Créer les matches du winner bracket
    remaining_teams = teams.copy()
    for round_num in range(num_rounds):
        num_matches = len(remaining_teams) // 2
        for match_num in range(num_matches):
            team1 = remaining_teams[match_num * 2]
            team2 = remaining_teams[match_num * 2 + 1] if match_num * 2 + 1 < len(remaining_teams) else None
            
            match = Match(
                tournamentId=tournament.id,
                team1Id=team1.id,
                team2Id=team2.id if team2 else None,
                matchDate=tournament.startDate + timedelta(hours=round_num),
                status='scheduled',
                bracket_type='winner',
                round_number=round_num
            )
            db.add(match)
        
        # Simuler la réduction des équipes pour le prochain round
        remaining_teams = remaining_teams[:num_matches]
    
    # Créer les matches du loser bracket
    num_loser_rounds = num_rounds - 1
    for round_num in range(num_loser_rounds):
        num_matches = math.ceil(num_teams / (2 ** (round_num + 2)))
        for match_num in range(num_matches):
            match = Match(
                tournamentId=tournament.id,
                matchDate=tournament.startDate + timedelta(hours=round_num + num_rounds),
                status='scheduled',
                bracket_type='loser',
                round_number=round_num
            )
            db.add(match)
    
    # Créer la grande finale
    final_match = Match(
        tournamentId=tournament.id,
        matchDate=tournament.startDate + timedelta(hours=num_rounds + num_loser_rounds),
        status='scheduled',
        bracket_type='final',
        round_number=0
    )
    db.add(final_match)
    
    db.commit()

def create_test_data():
    db = SessionLocal()
    try:
        # Création des jeux
        game_names = ["League of Legends", "Counter-Strike 2", "Valorant", "Rocket League", "Dota 2"]
        games = []
        for game_name in game_names:
            existing_game = db.query(Game).filter(Game.name == game_name).first()
            if not existing_game:
                game = Game(name=game_name)
                db.add(game)
                games.append(game)
            else:
                games.append(existing_game)
        db.commit()
        print("[OK] Jeux créés ou existants")

        # Création des types de tournois
        tournament_type_names = ["Elimination directe", "Double élimination", "Phase de poules", "Championnat"]
        tournament_types = []
        for type_name in tournament_type_names:
            existing_type = db.query(TournamentType).filter(TournamentType.type == type_name).first()
            if not existing_type:
                t_type = TournamentType(type=type_name)
                db.add(t_type)
                tournament_types.append(t_type)
            else:
                tournament_types.append(existing_type)
        db.commit()
        print("[OK] Types de tournois créés ou existants")

        # Supprimer les anciens tournois de test si nécessaire
        db.query(TournamentStatus).delete()
        db.query(Team).delete()
        db.query(Tournament).delete()
        db.commit()
        print("[OK] Anciennes données de test supprimées")

        # Dates pour les tournois
        now = datetime.now()
        
        # Création des tournois
        tournaments = []
        statuses = ["upcoming", "active", "completed"]
        
        # Tournois passés (il y a 1-30 jours)
        for i in range(5):
            start_date = now - timedelta(days=random.randint(1, 30))
            tournament = Tournament(
                tournamentName=f"Tournoi Passé {i+1}",
                startDate=start_date,
                startTime="14:00",
                format="BO3",
                rules="Règlement standard",
                maxParticipants=16,
                rewards="Prix : 1000€",
                numTeams=8,
                playersPerTeam=5,
                totalPlayers=40,
                gameId=random.choice(games).id,
                tournament_typeId=random.choice(tournament_types).id,
                updatedAt=datetime.now()
            )
            tournaments.append(tournament)
            db.add(tournament)
        db.commit()

        # Tournois actifs (aujourd'hui et demain)
        for i in range(3):
            start_date = now + timedelta(hours=random.randint(1, 24))
            tournament = Tournament(
                tournamentName=f"Tournoi Actif {i+1}",
                startDate=start_date,
                startTime="15:00",
                format="BO5",
                rules="Règlement pro",
                maxParticipants=32,
                rewards="Prix : 5000€",
                numTeams=16,
                playersPerTeam=5,
                totalPlayers=80,
                gameId=random.choice(games).id,
                tournament_typeId=random.choice(tournament_types).id,
                updatedAt=datetime.now()
            )
            tournaments.append(tournament)
            db.add(tournament)
        db.commit()

        # Tournois à venir (dans 1-60 jours)
        for i in range(7):
            start_date = now + timedelta(days=random.randint(1, 60))
            tournament = Tournament(
                tournamentName=f"Tournoi Futur {i+1}",
                startDate=start_date,
                startTime="16:00",
                format="BO3",
                rules="Règlement amateur",
                maxParticipants=24,
                rewards="Prix : 2000€",
                numTeams=12,
                playersPerTeam=5,
                totalPlayers=60,
                gameId=random.choice(games).id,
                tournament_typeId=random.choice(tournament_types).id,
                updatedAt=datetime.now()
            )
            tournaments.append(tournament)
            db.add(tournament)
        db.commit()
        print("[OK] Tournois créés")

        # Création des statuts de tournois
        for tournament in tournaments:
            if tournament.startDate < now - timedelta(days=1):
                status = "completed"
            elif tournament.startDate <= now + timedelta(days=1):
                status = "active"
            else:
                status = "upcoming"

            tournament_status = TournamentStatus(
                tournamentId=tournament.id,
                status=status,
                updatedAt=datetime.now()
            )
            db.add(tournament_status)
        db.commit()
        print("[OK] Statuts des tournois créés")

        # Création des équipes et des matches pour chaque tournoi
        team_names = [
            "Phoenix Gaming", "Dragon ESports", "Team Elite", 
            "Victory Squad", "Nexus Force", "Alpha Warriors",
            "Omega Team", "Thunder Gaming", "Star ESports",
            "Pro Players", "Team Legend", "Epic Gamers"
        ]

        for tournament in tournaments:
            # Créer les équipes
            num_teams = min(len(team_names), tournament.numTeams)
            tournament_teams = []
            teams = random.sample(team_names, num_teams)
            
            for team_name in teams:
                team = Team(
                    teamName=team_name,
                    tournamentId=tournament.id,
                    createdAt=datetime.now()
                )
                db.add(team)
                tournament_teams.append(team)
            db.commit()

            # Créer les matches pour ce tournoi
            create_matches_for_tournament(db, tournament, tournament_teams)

        print("\nDonnées de test créées avec succès!")
        
    except Exception as e:
        print(f"Erreur lors de la création des données de test: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_test_data()
