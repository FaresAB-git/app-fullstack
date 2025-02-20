const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/User');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Vérification de l'existence de l'utilisateur
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        } else {
            // Création d'un nouvel utilisateur
            const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({ username, email, password: hashedPassword, dateCreation: new Date() });
            await newUser.save();
            return res.status(201).json({ message: "User created successfully" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Vérification de l'existence de l'utilisateur
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        
        // Génération du token JWT
        const payload = {
            user: {
                email: user.email
            }
        };
        const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: 60 * 60 * 2 });
        return res.status(200).json({ token });
    }
    catch (err) {
        return res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Get user profile by token
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Update user profile
const updateUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findOneAndUpdate(
            { email: req.user.email },
            { username, email },
            { new: true, runValidators: true }
        ).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Delete user profile
const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
};
