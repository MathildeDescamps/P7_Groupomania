const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize("groupomania", "root", "pass", { dialect: "mysql", host: "localhost" });

//On crée le modèle pour les commentaires.
class Comment extends Model {}
Comment.init({
    post: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    content: DataTypes.STRING,
}, { sequelize, modelName: 't_comments' });


//On exporte le modèle.
module.exports = sequelize.models.t_comments;