const io = require("socket.io-client");
// Récupérer le token JWT (exemple)
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiMTFlYjVjNmJjODg5MTJlZDhjN2JjIiwidXNlcm5hbWUiOiJKb2huRG9lIiwiZW1haWwiOiJqb2huZG9lQGV4YW1wbGUuY29tIn0sImlhdCI6MTc0MDUwNTU1MiwiZXhwIjoxNzQwNTEyNzUyfQ.GHhZvS6bDP9XlInP5GQLjGPNiXoZ_x9AkQkkxMd9oQY"
const socket = io("http://localhost:3000", {
    auth: { token }, // On envoie le token ici
});

// Quand le client est connecté
socket.on("connect", () => {
    console.log("✅ Connecté au serveur avec ID :", socket.id);
    // Rejoindre un projet spécifique
    const projectId = "67b867b735c569fc75d586ee";
    socket.emit("joinProject", projectId);
    console.log(`🔗 Tentative de connexion au projet ${projectId}`);

    // Simuler l'envoi d'un message après 2 secondes
    setTimeout(() => {
        socket.emit("sendMessage", {
            projectId: projectId,
            userId: "67b11eb5c6bc88912ed8c7bc",
            message: "Hello depuis le client Node.js !"
        });
        console.log("📨 Message envoyé !");
    }, 2000);
});

// Écouter les messages reçus
socket.on("receiveMessage", (data) => {
    console.log("📥 Nouveau message reçu :", data);
});

// Gérer les erreurs
socket.on("error", (err) => {
    console.error("❌ Erreur :", err);
});

// Gérer la déconnexion
socket.on("disconnect", () => {
    console.log("🚪 Déconnecté du serveur.");
});
