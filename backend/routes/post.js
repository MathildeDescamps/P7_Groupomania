const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Theme = require('../models/Theme');
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');

// ROUTER POSTS :
router.get('/', postCtrl.getPosts);
router.get('/:user_id', postCtrl.getPostsOfOneUser);
router.post('/', postCtrl.createPost);
//router.delete('/', postCtrl.deletePost);

module.exports = router;