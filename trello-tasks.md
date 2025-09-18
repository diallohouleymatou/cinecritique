# Trello Tasks - CineCritique API

## 1. Backend Tasks (Houleymatou)

### Tâche 1 : Initialisation du projet Node.js
**Description :** Création du projet, initialisation avec npm, configuration des scripts de démarrage et installation des dépendances principales (express, sequelize, dotenv, pino, etc.).

### Tâche 2 : Configuration de la base de données
**Description :** Mise en place de Sequelize, création du fichier de configuration, définition des modèles Movie, Review, User et leurs relations.

### Tâche 3 : Mise en place de l'authentification
**Description :** Création des routes et contrôleurs pour l'inscription, la connexion, la gestion des tokens JWT et la sécurisation des endpoints.

### Tâche 4 : Intégration de l'API TMDB
**Description :** Configuration du client TMDB avec clé et token, création des fonctions pour récupérer les films, détails, films populaires, etc.

### Tâche 5 : Création des endpoints films
**Description :** Développement des routes et contrôleurs pour la recherche de films, films populaires, détails, top-rated, gestion du cache local.

### Tâche 6 : Gestion des reviews
**Description :** Développement des endpoints pour créer, modifier, supprimer et récupérer les avis par film et utilisateur. Ajout de la validation et gestion des erreurs.

### Tâche 7 : Documentation technique
**Description :** Rédaction d'un README et/ou documentation Postman pour décrire tous les endpoints, exemples de requêtes/réponses et instructions de test.

### Tâche 8 : Gestion des erreurs et logs
**Description :** Mise en place d'un middleware d'erreur, configuration de pino pour les logs, gestion des erreurs dans tous les endpoints.

### Tâche 9 : Tests et validation
**Description :** Test des endpoints avec Postman, validation des cas d'erreur, vérification de la persistance des données et du bon fonctionnement global.

---

## 2. Frontend Tasks (Khadija)

### Tâche 1 : Initialisation du projet front
**Description :** Création du projet frontend (React, Vue, etc.), configuration de base et installation des dépendances nécessaires.

### Tâche 2 : Connexion à l'API backend
**Description :** Mise en place des appels API vers le backend, gestion des tokens JWT côté client.

### Tâche 3 : Affichage des films et avis
**Description :** Intégration des pages pour afficher les films (populaires, recherche, détails) et les avis utilisateurs.

### Tâche 4 : Authentification utilisateur
**Description :** Implémentation de la connexion/inscription, gestion du token JWT, affichage des erreurs et redirections.

### Tâche 5 : Création et gestion des avis
**Description :** Permettre aux utilisateurs de créer, modifier et supprimer leurs avis sur les films. Validation et affichage des messages d'erreur.

### Tâche 6 : Tests et feedback utilisateur
**Description :** Tester toutes les fonctionnalités du front, corriger les bugs, améliorer l'expérience utilisateur et recueillir des retours.

---

## 3. Connexion Front/Back (Ila)

### Tâche 1 : Synchronisation des endpoints
**Description :** Vérifier que les endpoints du backend sont bien utilisés par le frontend, corriger les incohérences et documenter les échanges.

### Tâche 2 : Gestion des tokens et sécurité
**Description :** S'assurer que la gestion des tokens JWT fonctionne entre le front et le back, sécuriser les échanges et les données utilisateur.

### Tâche 3 : Déploiement et environnement
**Description :** Préparer le projet pour le déploiement (Heroku, Vercel, etc.), configurer les variables d'environnement et tester en production.

---

**Répartition :**
- Houleymatou : Backend (API, base de données, sécurité, documentation)
- Khadija : Frontend (connexion, affichage, UX, intégration API)
- Ila : Connexion front/back, synchronisation, déploiement

**À copier dans Trello pour organiser le travail de groupe.**
