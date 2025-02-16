const express = require('express');
const { validateRegisterMiddleware, validateLoginMiddleware } = require('../../middleware/validators/user-validator');
const { User } = require('../../models/User');
const UserController = require('../../controllers/user-controller');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth-middleware');

const router = express.Router();

// Route POST /api/user/register
router.post('/register', validateRegisterMiddleware ,UserController.registerUser);
// Route POST /api/user/login
router.post('/login', validateLoginMiddleware,UserController.loginUser);
// Route GET /api/user/me
router.get('/me', auth, UserController.getUser);

module.exports = router