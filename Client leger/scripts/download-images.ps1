# Créer les dossiers nécessaires
New-Item -ItemType Directory -Force -Path "../public/images"
New-Item -ItemType Directory -Force -Path "../public/images/games"

# Télécharger les images d'arrière-plan
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070" -OutFile "../public/images/hero-bg.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070" -OutFile "../public/images/cta-bg.jpg"

# Télécharger les images des jeux
Invoke-WebRequest -Uri "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3f072336e3f3ade4/63096d7ad482663e59a20a2a/Valorant_2022_E5A2_Social_Updates_ContentStackThumbnail.jpg" -OutFile "../public/images/games/valorant.jpg"
Invoke-WebRequest -Uri "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg" -OutFile "../public/images/games/cs2.jpg"
Invoke-WebRequest -Uri "https://www.leagueoflegends.com/static/open-graph-2e582ae9fae8b0b396ca46ff21fd47a8.jpg" -OutFile "../public/images/games/lol.jpg"
Invoke-WebRequest -Uri "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg" -OutFile "../public/images/games/dota2.jpg"
