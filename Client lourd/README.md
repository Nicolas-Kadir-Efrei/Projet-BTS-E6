# Panel Admin Tournois Esport

Application desktop pour la gestion de tournois esport.

## Fonctionnalités

- Gestion des tournois (création, modification, suppression)
- Gestion des équipes et des membres
- Gestion des matchs et des scores
- Gestion des utilisateurs
- Gestion des jeux

## Installation

1. Créer un environnement virtuel :
```bash
python -m venv venv
```

2. Activer l'environnement virtuel :
```bash
# Windows
venv\Scripts\activate
```

3. Installer les dépendances :
```bash
pip install -r requirements.txt
```

4. Créer un fichier `.env` avec les informations de connexion à la base de données :
```
DATABASE_URL=postgresql://user:password@host:port/database
```

## Utilisation

Pour lancer l'application :
```bash
python main.py
```

## Création de l'exécutable

Pour créer l'exécutable :
```bash
pip install pyinstaller
pyinstaller --onefile --windowed main.py
```
