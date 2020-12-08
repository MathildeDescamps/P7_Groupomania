const express = require('express');
const router = express.Router();
const Theme = require('../models/Theme');
const themeCtrl = require('../controllers/theme');
const auth = require('../middlewares/auth');

// ROUTER THÈMES :
router.get('/', themeCtrl.getThemes);
router.get('/:id', themeCtrl.getOneTheme);
router.post('/', themeCtrl.createTheme);
router.delete('/', themeCtrl.deleteTheme);

module.exports = router;