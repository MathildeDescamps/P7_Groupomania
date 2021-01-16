const express = require('express');
const router = express.Router();
const mentionCtrl = require('../controllers/mention');
const auth = require('../middlewares/auth');

// ROUTER POSTS :
router.get('/:id', mentionCtrl.getMentions);
router.get('/mine/:id/:userid', mentionCtrl.getMyMention);
router.post('/:id', mentionCtrl.addMention);

module.exports = router;