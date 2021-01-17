const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// ROUTER POSTS :
router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id/image', userCtrl.updateImage);

module.exports = router;