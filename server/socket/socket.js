const { Server } = require("socket.io");
const { ChatMessage } = require("../models/ChatMessage");
const { User } = require("../models/User");
const { ProjectUser } = require("../models/ProjectUser");
const jwt = require("jsonwebtoken");

function setupSocket(server) {

    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"]
        }
    });
    
    io.use((socket, next) => {
        const token = socket.handshake.auth.token; // Récupérer le token
        console.log("Token reçu :", token);

        if (!token) {
            return next(new Error("Authentication error"));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY); // Vérification du token
            socket.userId = decoded.user.id; // Ajouter l'ID utilisateur au socket
            console.log("Utilisateur authentifié :", socket.userId);
            next(); // Continuer la connexion
        } catch (error) {
            next(new Error("Invalid token"));
        }
    });

    io.on("connection", async (socket) => {
        console.log("Nouvelle connexion socket :", socket.id);
        // Authentifier l'utilisateur
        // Rejoindre un projet (salon)
        socket.on("joinProject", async (projectId) => {
            try {
                // Vérifier si l'utilisateur appartient au projet
                const isMember = await ProjectUser.findOne({ user: socket.userId, project: projectId });
                if (!isMember) {
                    return socket.emit("error", "Accès refusé");
                }

                socket.join(projectId);
                console.log(`Utilisateur ${socket.userId} a rejoint le projet ${projectId}`);
            } catch (error) {
                console.error("Erreur lors de la connexion au projet :", error);
            }
        });

        // Envoyer un message
        socket.on("sendMessage", async ({ projectId, userId, message }) => {
            try {
                // Vérifier si l'utilisateur appartient au projet
                const isMember = await ProjectUser.findOne({ user: userId,project:  projectId });
                if (!isMember) {
                    return socket.emit("error", "Accès refusé");
                }

                const author = await User.findById(userId);
                if (!author) {
                    return socket.emit("error", "Utilisateur non trouvé");
                }
                const username = author.username;
                // Enregistrer le message dans MongoDB
                const chatMessage = new ChatMessage({ user: userId,project: projectId, message, timestamp: new Date() });
                await chatMessage.save();

                // Envoyer le message aux membres du projet
                io.to(projectId).emit("receiveMessage", { username, message, timestamp: chatMessage.timestamp });
            } catch (error) {
                console.error("Erreur d'envoi de message :", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("Utilisateur déconnecté :", socket.id);
        });
    });

    return io;
}

module.exports = setupSocket;
