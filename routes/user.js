const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/UserController');
const { validateToken } = require('../middleWare/ValidateTokenHandler');
const router = express.Router()

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/currentuser', validateToken, currentUser)

module.exports = router