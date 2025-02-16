require('dotenv').config();
const express = require('express'); // Framework pour créer le serveur
const mongoose = require('mongoose'); // ORM pour MongoDB
const path = require('path'); // Module pour manipuler les chemins des fichiers
const UserRoutes = require('./routes/api/userRouter');
const User = require('./models/User');
const cors = require('cors');

// Création de l'application Express
const app = express();


app.use(express.json());
app.use(cors());

// Connexion à MongoDB avec Mongoose
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connexion réussie à MongoDB !");
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error);
        process.exit(1); // Quitter le processus en cas d'échec
    }
}

connectDB();

app.use('/api/user', UserRoutes )

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
