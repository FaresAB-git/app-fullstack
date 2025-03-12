# Server - README
## Introduction

Ce document sert de guide pour comprendre la structure et le fonctionnement du serveur de notre application web fullstack. Il détaille les différentes composantes du serveur, les fonctionnalités implémentées, ainsi que les étapes nécessaires pour installer et lancer le serveur.

## Objectifs du Projet

L'objectif principal de ce projet est de développer une application web collaborative permettant aux utilisateurs de gérer des projets et des tâches, tout en offrant une fonctionnalité de chat en temps réel. Les utilisateurs peuvent s'inscrire, créer des projets, ajouter des membres, assigner des tâches et communiquer en temps réel.

## Technologies Utilisées

- **Node.js** : Utilisé pour construire le serveur backend.
- **Express.js** : Framework web pour Node.js, utilisé pour gérer les requêtes HTTP.
- **MongoDB** : Base de données NoSQL utilisée pour stocker les données des utilisateurs, projets et tâches.
- **Mongoose** : ODM (Object Data Modeling) pour MongoDB, utilisé pour interagir avec la base de données.
- **Socket.io** : Bibliothèque permettant la communication en temps réel entre le serveur et les clients.
- **JSON Web Tokens (JWT)** : Utilisé pour sécuriser les routes et gérer l'authentification des utilisateurs.

## Méthodologie de Développement

Nous avons suivi une méthodologie de développement agile, avec des itérations courtes et des revues régulières pour s'assurer que le projet progresse conformément aux attentes. Chaque fonctionnalité a été développée de manière modulaire pour faciliter les tests et la maintenance.

## Architecture

Le serveur est construit en utilisant Node.js et Express.js pour gérer les requêtes HTTP. MongoDB est utilisé comme base de données pour stocker les informations des utilisateurs, des projets et des tâches. L'architecture est organisée de manière modulaire avec des routes, des contrôleurs, des modèles et des middlewares séparés pour une meilleure maintenabilité et évolutivité.

### Structure des Dossiers

```
server/
│
├── controllers/        # Contient les contrôleurs pour gérer la logique métier
│   ├── project-controller.js
│   ├── task-controller.js
│   └── user-controller.js
│
├── middleware/         # Contient les middlewares pour la validation et l'authentification
│   ├── auth-middleware.js
│   └── validators/
│       ├── project-validator.js
│       ├── task-validator.js
│       └── user-validator.js
│
├── models/             # Contient les modèles Mongoose pour MongoDB
│   ├── ChatMessage.js
│   ├── Project.js
│   ├── ProjectUser.js
│   ├── Task.js
│   └── User.js
│
├── routes/             # Contient les routes de l'API
│   └── api/
│       ├── project-routes.js
│       ├── task-routes.js
│       └── user-routes.js
│
├── socket/             # Contient la configuration de Socket.io
│   └── socket.js
│
├── .env                # Fichier de configuration des variables d'environnement
├── app.js              # Point d'entrée principal de l'application
└── package.json        # Dépendances et scripts du projet
```
## Exemple Concret

Pour illustrer comment les différents fichiers de l'architecture interagissent, prenons l'exemple de la création d'un projet.

1. **Route** : La requête HTTP pour créer un projet est définie dans `project-routes.js` :
    ```js
    const express = require('express');
    const router = express.Router();
    const projectController = require('../controllers/project-controller');
    const authMiddleware = require('../middleware/auth-middleware');

    router.post('/create', authMiddleware, projectController.createProject);

    module.exports = router;
    ```

2. **Contrôleur** : La logique métier pour créer un projet est gérée dans `project-controller.js` :
    ```js
    const Project = require('../models/Project');

    exports.createProject = async (req, res) => {
        try {
            const project = new Project(req.body);
            await project.save();
            res.status(201).send(project);
        } catch (error) {
            res.status(400).send(error);
        }
    };
    ```

3. **Modèle** : Le modèle Mongoose pour un projet est défini dans `Project.js` :
    ```js
    const mongoose = require('mongoose');

    const projectSchema = new mongoose.Schema({
        name: { type: String, required: true },
        description: { type: String },
        createdAt: { type: Date, default: Date.now }
    });

    module.exports = mongoose.model('Project', projectSchema);
    ```

4. **Middleware** : L'authentification est vérifiée par `auth-middleware.js` avant d'accéder au contrôleur :
    ```js
    const jwt = require('jsonwebtoken');

    module.exports = (req, res, next) => {
        const token = req.header('Authorization').replace('Bearer ', '');
        try {
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).send({ error: 'Please authenticate.' });
        }
    };
    ```

Cet exemple montre comment les routes, contrôleurs, modèles et middlewares s'ordonnent pour traiter une requête de création de projet, assurant une séparation claire des responsabilités et facilitant la maintenance du code.
## Fonctionnalités

### Authentification

- **Inscription et Connexion** : Les utilisateurs peuvent s'inscrire et se connecter en utilisant leur email et mot de passe. Les mots de passe sont hachés avant d'être stockés dans la base de données.
- **JWT** : Les tokens JWT sont utilisés pour sécuriser les routes et vérifier l'identité des utilisateurs.

### Gestion des Projets

- **CRUD Projets** : Les utilisateurs peuvent créer, lire, mettre à jour et supprimer des projets.
- **Ajout/Suppression de Membres** : Les utilisateurs peuvent ajouter ou supprimer des membres d'un projet.

### Gestion des Tâches

- **CRUD Tâches** : Les utilisateurs peuvent créer, lire, mettre à jour et supprimer des tâches associées à un projet.

### Chat en Temps Réel

- **Socket.io** : Les utilisateurs peuvent envoyer et recevoir des messages en temps réel dans le cadre d'un projet spécifique.

## Installation et Lancement

### Prérequis

- Node.js
- MongoDB

### Installation

1. Clonez le dépôt :
    ```sh
    git clone https://github.com/votre-repo.git
    cd server
    ```

2. Installez les dépendances :
    ```sh
    npm install
    ```

3. Configurez les variables d'environnement dans le fichier `.env` :
    ```env
    JWT_PRIVATE_KEY=yourPrivateKey
    MONGO_URI=yourMongoDBUri
    PORT=3000
    SALT_ROUNDS=10
    ```

### Lancement

Pour démarrer le serveur, exécutez :
```sh
npm run dev
```