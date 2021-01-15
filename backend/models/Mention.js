//importer tout ce qu'il faut ici :
const mysql = require('mysql');
const mysql2 = require('mysql2');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize("groupomania", "root", "pass", { dialect: "mysql", host: "localhost" });

//On crée le modèle pour les mentions.
class Mention extends Model {}
Mention.init({
    post: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    mention: DataTypes.INTEGER,
}, { sequelize, modelName: 't_mentions' });


//On exporte le modèle.
module.exports = sequelize.models.t_mentions;