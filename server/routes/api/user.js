const express = require('express');
const User = require('../../models/User');
const bcrypt = require("bcrypt");

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!password) {
            return res.status(400).json({ message: "Mot de passe requis" });
        }
        const _hashedPassword = await bcrypt.hash(password.toString(), 10);
        const _username= username;
        const _email=email;

        User.findOne({ email: _email }).then(user => {
            if (user) {
                //Utilisateur trouvé dans la base de donnée, code erreur 400 
                res.status(400).send('User already exists');
            }
            else {
                const newUser = new User({ username:_username, email:_email,  password:_hashedPassword, dateCreation: new Date()});
                newUser.save(); 
                res.redirect('/login');
            }
        })
    } catch (err) {
        return res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const {email, password } = req.body;
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {

                const isMatch =  bcrypt.compare(password, user.password);
                //Utilisateur trouvé dans la base de donnée, test sur le mot de passe
                if (isMatch){
                    //Utilisateur connecté 

                    // // Génération du token JWT
                    // const token = jwt.sign(
                    //     {email: user.email, username: user.username },
                    //     process.env.JWT_SECRET, // Stocke une clé secrète dans ton fichier .env
                    //     { expiresIn: '1h' } // Expiration du token après 1 heure
                    // );

                    // Réponse avec le token
                    res.status(200).send('User Connected');

                }
                else {
                    //Mot de passe different, code erreur 400 
                    res.status(400).send('Invalid password '+hashedPassword+' 6666 '+user.password);
                }
            }
            else {
                //Utilisateur non trouvé
                res.status(400).send('Invalid user');
            }
        })
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router