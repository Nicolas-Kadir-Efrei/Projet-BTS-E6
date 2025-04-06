from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from src.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    pseudo = Column(String(50), unique=True, index=True)
    name = Column(String(50))
    last_name = Column(String(50))
    email = Column(String(100), unique=True, index=True)
    password = Column(String(64))  # Pour le hash SHA-256
    sexe = Column(String(1))
    birthday = Column(Date)
    created_at = Column(DateTime, default=datetime.now)
    last_auth = Column(DateTime)
    role = Column(String(20))

class Game(Base):
    __tablename__ = 'games'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))

class TournamentType(Base):
    __tablename__ = 'tournament_types'
    
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(50))

class Tournament(Base):
    __tablename__ = 'tournaments'
    
    id = Column(Integer, primary_key=True, index=True)
    tournamentName = Column(String(100), index=True)
    startDate = Column(Date)
    startTime = Column(Time)
    format = Column(String(50))
    rules = Column(Text)
    maxParticipants = Column(Integer)
    rewards = Column(Text)
    numTeams = Column(Integer)
    playersPerTeam = Column(Integer)
    totalPlayers = Column(Integer)
    createdAt = Column(DateTime, default=datetime.now)
    updatedAt = Column(DateTime, onupdate=datetime.now)
    gameId = Column(Integer, ForeignKey('games.id'))
    tournament_typesId = Column(Integer, ForeignKey('tournament_types.id'))

    game = relationship("Game")
    tournament_type = relationship("TournamentType")

class TournamentStatus(Base):
    __tablename__ = 'tournament_status'
    
    id = Column(Integer, primary_key=True, index=True)
    tournamentId = Column(Integer, ForeignKey('tournaments.id'))
    status = Column(String(50))
    updatedAt = Column(DateTime, default=datetime.now)

    tournament = relationship("Tournament")

class Team(Base):
    __tablename__ = 'teams'
    
    id = Column(Integer, primary_key=True, index=True)
    teamName = Column(String(100))
    tournamentId = Column(Integer, ForeignKey('tournaments.id'))
    createdAt = Column(DateTime, default=datetime.now)

    tournament = relationship("Tournament")

class TeamMember(Base):
    __tablename__ = 'team_members'
    
    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey('users.id'))
    teamId = Column(Integer, ForeignKey('teams.id'))
    role = Column(String(50))
    joined_at = Column(DateTime, default=datetime.now)

    user = relationship("User")
    team = relationship("Team")

class Match(Base):
    __tablename__ = 'matches'
    
    id = Column(Integer, primary_key=True, index=True)
    tournamentId = Column(Integer, ForeignKey('tournaments.id'), nullable=False)
    team1Id = Column(Integer, ForeignKey('teams.id'), nullable=True)  
    team2Id = Column(Integer, ForeignKey('teams.id'), nullable=True)  
    team1Score = Column(Integer)
    team2Score = Column(Integer)
    winnerId = Column(Integer, ForeignKey('teams.id'))
    matchDate = Column(DateTime, nullable=False)
    status = Column(String(20), nullable=False)
    createdAt = Column(DateTime, default=datetime.now)
    bracket_type = Column(String(20), nullable=False)  
    round_number = Column(Integer, nullable=False)  

    tournament = relationship("Tournament")
    team1 = relationship("Team", foreign_keys=[team1Id])
    team2 = relationship("Team", foreign_keys=[team2Id])
    winner = relationship("Team", foreign_keys=[winnerId])
