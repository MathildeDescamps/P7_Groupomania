const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Theme = require('../models/Theme');
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');


// ROUTER POSTS :
router.get('/', postCtrl.getPosts);
router.get('/:user_id', postCtrl.getPostsOfOneUser);
router.post('/', postCtrl.createPost);
router.post('/:id/images', multer, postCtrl.uploadImage);
router.delete('/:id', postCtrl.deletePost);
router.put('/:id', postCtrl.updatePost);

module.exports = router;