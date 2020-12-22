const express = require('express');
const router = express.Router();
const User = require('../models/User');
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');

// ROUTER POSTS :
router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.getOneUser);

module.exports = router;