require('dotenv').config();
const express = require('express'); // Framework pour créer le serveur
const mongoose = require('mongoose'); // ORM pour MongoDB
const cors = require('cors'); // Module pour gérer les permissions CORS
const http = require('http'); // Module HTTP pour créer le serveur

// Importation des routes
const UserRoutes = require('./routes/api/user-routes');
const ProjectRoutes = require('./routes/api/project-routes');
const TaskRoutes = require('./routes/api/task-routes');

// Importation du fichier Socket.io
const setupSocket = require("./socket/socket.js");

// Création de l'application Express
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

// Connexion à MongoDB avec Mongoose
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connexion réussie à MongoDB !");
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error);
        process.exit(1); // Quitter le processus en cas d'échec
    }
}

connectDB();

// Définition des routes
app.use('/api/user', UserRoutes);
app.use('/api/project', ProjectRoutes);
app.use('/api/tasks', TaskRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).send({ error: 'Not found' });
});

// Initialisation de Socket.io
setupSocket(server);

// Lancement du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
