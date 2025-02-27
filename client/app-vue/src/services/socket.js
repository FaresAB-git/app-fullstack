const io = require("socket.io-client");
// Récupérer le token JWT (exemple)
const token = localStorage.getItem("token");
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
