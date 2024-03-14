const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserController');

router.post('/', controller.get);

module.exports = router