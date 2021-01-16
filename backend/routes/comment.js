const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middlewares/auth');

// ROUTER POSTS :
router.get('/:id', commentCtrl.getComments);
router.post('/:id', commentCtrl.addComment);

module.exports = router;