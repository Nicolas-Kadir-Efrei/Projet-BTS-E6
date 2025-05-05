from src.utils.database import SessionLocal
from src.models.models import Game, TournamentType, Tournament, TournamentStatus, Team, Match
from datetime import datetime, timedelta
import math

def create_demo_tournament():
    db = SessionLocal()
    try:
        # Créer un jeu s'il n'existe pas
        game = db.query(Game).filter(Game.name == "League of Legends").first()
        if not game:
            game = Game(name="League of Legends")
            db.add(game)
            db.commit()

        # Créer un type de tournoi s'il n'existe pas
        tournament_type = db.query(TournamentType).filter(TournamentType.type == "Double Elimination").first()
        if not tournament_type:
            tournament_type = TournamentType(type="Double Elimination")
            db.add(tournament_type)
            db.commit()

        # Créer le tournoi de démonstration
        tournament = Tournament(
            tournamentName="Tournoi Démo LoL",
            startDate=datetime.now() + timedelta(days=1),
            startTime="14:00",
            format="BO3",
            rules="Règlement standard",
            maxParticipants=16,
            rewards="Prix : 1000€",
            numTeams=8,
            playersPerTeam=5,
            totalPlayers=40,
            gameId=game.id,
            tournament_typeId=tournament_type.id,
            updatedAt=datetime.now()
        )
        db.add(tournament)
        db.commit()

        # Créer le statut du tournoi
        status = TournamentStatus(
            tournamentId=tournament.id,
            status="upcoming",
            updatedAt=datetime.now()
        )
        db.add(status)
        db.commit()

        # Créer les équipes
        team_names = [
            "Team SoloMid",
            "Cloud9",
            "Fnatic",
            "G2 Esports",
            "T1",
            "DWG KIA",
            "RNG",
            "EDG"
        ]

        teams = []
        for team_name in team_names:
            team = Team(
                teamName=team_name,
                tournamentId=tournament.id,
                createdAt=datetime.now()
            )
            db.add(team)
            teams.append(team)
        db.commit()

        # Créer les matches initiaux du winner bracket
        # Premier round - 4 matches
        matches_round1 = []
        for i in range(0, 8, 2):
            match = Match(
                tournamentId=tournament.id,
                team1Id=teams[i].id,
                team2Id=teams[i+1].id,
                matchDate=tournament.startDate,
                status='scheduled',
                bracket_type='winner',
                round_number=0,
                team1Score=None,
                team2Score=None
            )
            db.add(match)
            matches_round1.append(match)
        db.commit()

        # Deuxième round - 2 matches (vides pour l'instant)
        matches_round2 = []
        for i in range(2):
            match = Match(
                tournamentId=tournament.id,
                matchDate=tournament.startDate + timedelta(hours=1),
                status='scheduled',
                bracket_type='winner',
                round_number=1,
                team1Score=None,
                team2Score=None
            )
            db.add(match)
            matches_round2.append(match)
        db.commit()

        # Finale du winner bracket
        winner_final = Match(
            tournamentId=tournament.id,
            matchDate=tournament.startDate + timedelta(hours=2),
            status='scheduled',
            bracket_type='winner',
            round_number=2,
            team1Score=None,
            team2Score=None
        )
        db.add(winner_final)
        db.commit()

        # Matches du loser bracket
        # Premier round - 2 matches
        for i in range(2):
            match = Match(
                tournamentId=tournament.id,
                matchDate=tournament.startDate + timedelta(hours=3),
                status='scheduled',
                bracket_type='loser',
                round_number=0,
                team1Score=None,
                team2Score=None
            )
            db.add(match)
        db.commit()

        # Deuxième round - 1 match
        loser_final = Match(
            tournamentId=tournament.id,
            matchDate=tournament.startDate + timedelta(hours=4),
            status='scheduled',
            bracket_type='loser',
            round_number=1,
            team1Score=None,
            team2Score=None
        )
        db.add(loser_final)
        db.commit()

        # Grande finale
        grand_final = Match(
            tournamentId=tournament.id,
            matchDate=tournament.startDate + timedelta(hours=5),
            status='scheduled',
            bracket_type='final',
            round_number=0,
            team1Score=None,
            team2Score=None
        )
        db.add(grand_final)
        db.commit()

        print("\nTournoi de démonstration créé avec succès!")
        print(f"ID du tournoi: {tournament.id}")
        print("\nÉquipes créées:")
        for team in teams:
            print(f"- {team.teamName}")
        
        print("\nMatches créés:")
        print("Winner Bracket Round 1:")
        for i, match in enumerate(matches_round1):
            print(f"- Match {i+1}: {teams[i*2].teamName} vs {teams[i*2+1].teamName}")
        
    except Exception as e:
        print(f"Erreur lors de la création du tournoi de démonstration: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_demo_tournament()
