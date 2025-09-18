# cinecritique
Plateforme web communautaire pour découvrir, noter et commenter des films.

### Cahier des charges – CineCritique
1. Contexte
Les amateurs de cinéma aiment consulter les avis, découvrir de nouveaux films et partager leurs critiques. CineCritique est une plateforme communautaire permettant à chacun de rechercher des films via une API externe (TMDb), de consulter les détails, de laisser une critique et de voir les films les mieux notés par la communauté.

### 2. Objectif
Créer une plateforme web permettant :
● La recherche et la découverte de films (affiche, synopsis, note, etc.)
● L’ajout de critiques personnelles
● Le classement des films les mieux notés
● La consultation des avis d'autres utilisateurs
● Un design immersif et sombre, inspiré d’IMDb et Letterboxd

###3. Utilisateurs cibles
● Cinéphiles
● Utilisateurs souhaitant noter ou commenter des films vus
● Curieux à la recherche de suggestions de films populaires

###4. Fonctionnalités principales

Authentification
● Inscription / connexion (email + mot de passe)
● Déconnexion sécurisée
● Affichage du profil utilisateur (pseudo, critiques publiées)

Découverte de films
● Recherche par titre (via TMDb API)
● Affichage de la fiche d’un film :
○ Titre, résumé, image, durée, genre, date de sortie, casting
● Affichage des films populaires (via TMDb)
● Filtres (genre, année, note…)

Critiques
● Ajout d’une critique (note sur 5 étoiles + texte libre)
● Modification / suppression de sa propre critique
● Affichage des critiques d’un film par tous les utilisateurs
● Moyenne des notes (calculée localement)

Classement
● Page dédiée aux films les mieux notés par la communauté
● Tri par popularité (note moyenne) ou nombre de critiques


## 5. Design UI
● Thème sombre inspiré de IMDb ou Letterboxd
● Cartes de films avec affiches, titres, tags et étoiles
● Étoiles interactives pour la notation
● Page profil avec photo, pseudo, bio, critiques
● Palette : noir, gris foncé, jaune (étoiles), bleu pour les liens
Link: https://www.imdb.com/fr/
Link: https://letterboxd.com/
Link API: https://developer.imdb.com/documentation/?ref_=side_nav


### 6. Stack technique suggérée
● Frontend : React.js ou Next.js + Tailwind CSS
● Backend : Node.js + Express ou (Django)
● Base de données : MongoDB ou PostgreSQL
● API externe : TMDb (The Movie Database)
● Auth : JWT (ou Firebase Auth)
● Déploiement : Vercel (frontend), Render/Heroku (backend)

Structure des pages
● / : Accueil avec films populaires
● /login – /register : Authentification
● /search?q=… : Résultats de recherche
● /movie/:id : Détails d’un film + critiques
● /top-rated : Films les mieux notés
● /profile/:username : Profil d’un utilisateur
● /my-reviews : Page personnelle de gestion des critiques
NB: Cette structure ne constitue pas forcément la structure complète. Vous pourrez compléter si besoin

User Stories – CineCritique

Authentification
● US001 : En tant qu’utilisateur, je veux m’inscrire et me connecter afin de publier des critiques.
● US002 : En tant qu’utilisateur, je veux pouvoir gérer mon profil avec mon pseudo, ma bio et ma photo.
● US003 : En tant qu’utilisateur, je veux me déconnecter en toute sécurité.

Recherche et affichage de films
● US004 : En tant qu’utilisateur, je veux rechercher un film par titre pour trouver rapidement ce que je cherche.
● US005 : En tant qu’utilisateur, je veux voir une liste de films populaires dès l’accueil.
● US006 : En tant qu’utilisateur, je veux consulter la fiche détaillée d’un film avec son synopsis, casting, affiche, durée et genres.
● US007 : En tant qu’utilisateur, je veux filtrer les films par genre, année ou note moyenne.
● US008’ : En tant qu’utilisateur, j’aimerais regarder la bande annonce d’un film.(BONUS)
Critiques
● US008 : En tant qu’utilisateur connecté, je veux publier une critique d’un film avec une note sur 5 étoiles et un texte explicatif.
● US009 : En tant qu’utilisateur, je veux voir les critiques des autres utilisateurs pour m’aider à me faire un avis.
● US010 : En tant qu’utilisateur, je veux modifier ou supprimer mes propres critiques.

Classements & interaction
● US011 : En tant qu’utilisateur, je veux consulter un classement des films les mieux notés par la communauté.
● US012 : En tant qu’utilisateur, je veux voir la moyenne des notes pour chaque film calculée à partir des critiques.
Profil utilisateur
● US013 : En tant qu’utilisateur, je veux consulter mon profil avec la liste des critiques que j’ai publiées.
● US014 : En tant qu’utilisateur, je veux pouvoir accéder au profil d’un autre utilisateur pour voir ses critiques.
