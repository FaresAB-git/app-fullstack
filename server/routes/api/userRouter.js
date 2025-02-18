const express = require('express');
const User = require('../../models/User');
const { validateRegisterMiddleware, validateLoginMiddleware } = require('../../middleware/validators/UserValidator');
const UserController = require('../../controllers/UserController');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const router = express.Router();

// Route POST /api/user/register
router.post('/register', validateRegisterMiddleware ,UserController.registerUser);
// Route POST /api/user/login
router.post('/login', validateLoginMiddleware,UserController.loginUser);
// Route GET /api/user/me
router.get('/me', auth, UserController.getUser);

module.exports = router