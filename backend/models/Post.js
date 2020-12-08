//importer tout ce qu'il faut ici :
const mysql = require('mysql');
const mysql2 = require('mysql2');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize("groupomania", "root", "pass", { dialect: "mysql", host: "localhost" });

//On crée le modèle posts.
class Post extends Model {}
Post.init({
    content: {
        type: DataTypes.TEXT,
        defaultValue: ' '
    },
    user: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    theme: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    imageUrl: {
        type: DataTypes.STRING,
        defaultValue: null
    }
}, { sequelize, modelName: 't_posts' });


//On exporte le modèle.
module.exports = sequelize.models.t_posts;