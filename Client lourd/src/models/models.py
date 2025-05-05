from sqlalchemy import Column, Integer, String, DateTime, Date, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    pseudo = Column(String(50), unique=True)
    name = Column(String(50))
    last_name = Column(String(50))
    email = Column(String(100), unique=True)
    password = Column(String(255))
    sexe = Column(String(1))
    birthday = Column(Date)
    created_at = Column(DateTime)
    last_auth = Column(DateTime)
    role = Column(String(20))
    
    teams = relationship("TeamMember", back_populates="user")

class Game(Base):
    __tablename__ = 'games'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    
    tournaments = relationship("Tournament", back_populates="game")

class TournamentType(Base):
    __tablename__ = 'tournament_types'
    
    id = Column(Integer, primary_key=True)
    type = Column(String(50))
    
    tournaments = relationship("Tournament", back_populates="tournament_type")

class Tournament(Base):
    __tablename__ = 'tournaments'
    
    id = Column(Integer, primary_key=True)
    tournamentName = Column(String(100))
    startDate = Column(DateTime)
    startTime = Column(String(5))
    format = Column(String(50))
    rules = Column(Text)
    maxParticipants = Column(Integer)
    rewards = Column(String(255))
    minTeams = Column(Integer)
    playersPerTeam = Column(Integer)
    totalPlayers = Column(Integer)
    createdAt = Column(DateTime)
    updatedAt = Column(DateTime)
    gameId = Column(Integer, ForeignKey('games.id'))
    tournament_typeId = Column(Integer, ForeignKey('tournament_types.id'))
    
    game = relationship("Game", back_populates="tournaments")
    tournament_type = relationship("TournamentType", back_populates="tournaments")
    teams = relationship("Team", back_populates="tournament")
    matches = relationship("Match", back_populates="tournament")
    status = relationship("TournamentStatus", back_populates="tournament")

class TournamentStatus(Base):
    __tablename__ = 'tournament_status'
    
    id = Column(Integer, primary_key=True)
    tournamentId = Column(Integer, ForeignKey('tournaments.id'))
    status = Column(String(20))
    updatedAt = Column(DateTime)
    
    tournament = relationship("Tournament", back_populates="status")

class Team(Base):
    __tablename__ = 'teams'
    
    id = Column(Integer, primary_key=True)
    teamName = Column(String(100))
    tournamentId = Column(Integer, ForeignKey('tournaments.id'))
    createdAt = Column(DateTime)
    
    tournament = relationship("Tournament", back_populates="teams")
    members = relationship("TeamMember", back_populates="team")
    matches_as_team1 = relationship("Match", foreign_keys="Match.team1Id", back_populates="team1")
    matches_as_team2 = relationship("Match", foreign_keys="Match.team2Id", back_populates="team2")
    matches_as_winner = relationship("Match", foreign_keys="Match.winnerId", back_populates="winner")

class TeamMember(Base):
    __tablename__ = 'team_members'
    
    id = Column(Integer, primary_key=True)
    userId = Column(Integer, ForeignKey('users.id'))
    teamId = Column(Integer, ForeignKey('teams.id'))
    role = Column(String(20))
    joined_at = Column(DateTime)
    
    user = relationship("User", back_populates="teams")
    team = relationship("Team", back_populates="members")

class Match(Base):
    __tablename__ = 'matches'
    
    id = Column(Integer, primary_key=True)
    tournamentId = Column(Integer, ForeignKey('tournaments.id'))
    team1Id = Column(Integer, ForeignKey('teams.id'))
    team2Id = Column(Integer, ForeignKey('teams.id'))
    team1Score = Column(Integer)
    team2Score = Column(Integer)
    winnerId = Column(Integer, ForeignKey('teams.id'))
    matchDate = Column(DateTime)
    status = Column(String(20))
    createdAt = Column(DateTime)
    
    tournament = relationship("Tournament", back_populates="matches")
    team1 = relationship("Team", foreign_keys=[team1Id], back_populates="matches_as_team1")
    team2 = relationship("Team", foreign_keys=[team2Id], back_populates="matches_as_team2")
    winner = relationship("Team", foreign_keys=[winnerId], back_populates="matches_as_winner")

class Contact(Base):
    __tablename__ = 'Contact'
    
    id = Column(String, primary_key=True)
    name = Column(String)
    email = Column(String)
    subject = Column(String)
    message = Column(Text)
    created_at = Column(DateTime)
    status = Column(String)
