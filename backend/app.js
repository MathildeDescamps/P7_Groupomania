const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize("groupomania", "root", "pass", { dialect: "mysql", host: "localhost" });
const cors = require('cors');

//On importe les modèles :
const User = require('./models/User');
const Post = require('./models/Post');
const Theme = require('./models/Theme');
const Mention = require('./models/Mention');
const Comment = require('./models/Comment');


//On importe la middleware d'authentification :
const auth = require('./middlewares/auth');

//Headers pour éviter les erreurs de CORS.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.options('*', cors());

//On importe les routeurs :
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const themeRoutes = require('./routes/theme');
const mentionRoutes = require('./routes/mention');
const commentRoutes = require('./routes/comment');


app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL!');
} catch (error) {
    console.error('Impossible de se connecter, erreur :', error);
}

//On définit la fonction json de bodyParser comme middleware globale pour notre appli, pour pouvoir extraire l'object JSON des demandes POST du front.
app.use(bodyParser.json());

//On importe les routes :
app.use('/api/auth', authRoutes);
app.use('/api/:user/users', auth, userRoutes);
app.use('/api/:user/posts', auth, postRoutes);
app.use('/api/:user/themes', auth, themeRoutes);
app.use('/api/:user/mentions', auth, mentionRoutes);
app.use('/api/:user/comments', auth, commentRoutes);

module.exports = app;