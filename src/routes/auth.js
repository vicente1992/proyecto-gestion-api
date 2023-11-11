const express = require('express');
const { register, login, refreshToken } = require('../controllers/auth/auth');
const { loginValidator, registerValidator } = require('../validators');
const { authMiddleware } = require('../middleware');

const router = express.Router();

router.get('/refresh', authMiddleware, refreshToken);

router.post('/login', loginValidator, login)

router.post('/register', registerValidator, register);



module.exports = router;
