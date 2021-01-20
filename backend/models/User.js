//importer tout ce qu'il faut ici :
const mysql = require('mysql');
const mysql2 = require('mysql2');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize("groupomania", "root", "pass", { dialect: "mysql", host: "localhost" });

//On crée le modèle utilisateurs.
class User extends Model {}
User.init({
    rights: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.STRING,
    hiringDate: DataTypes.DATE,
    profilePic: DataTypes.BLOB('long'),
    password: DataTypes.STRING,
}, { sequelize, modelName: 't_users' });


//On exporte le modèle.
module.exports = sequelize.models.t_users;