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

// Route DELETE /api/user/me
router.delete('/me', auth, UserController.deleteUser);

// Route PUT /api/user/me
router.put('/me', auth, UserController.updateUser);

// Route GET /api/user
router.get('/', auth, UserController.getUsers);

// Route GET /api/user/:id
router.get('/:userId', auth, UserController.getUserById);


module.exports = router