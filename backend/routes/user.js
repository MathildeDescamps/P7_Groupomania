const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-pic-config');

// ROUTER POSTS :
router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id/image', userCtrl.updateImage);

module.exports = router;