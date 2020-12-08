//importer tout ce qu'il faut ici :
const mysql = require('mysql');
const mysql2 = require('mysql2');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize("groupomania", "root", "pass", { dialect: "mysql", host: "localhost" });

//On crée le modèle pour les thèmes.
class Theme extends Model {}
Theme.init({
    user: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: 'Divers'
    }
}, { sequelize, modelName: 't_themes' });


//On exporte le modèle.
module.exports = sequelize.models.t_themes;