const Comment = require('../models/Comment');

// RÉCUPÉRER LES COMMENTAIRES D'UN POST :
exports.getComments = (req, res, next) => {
    Comment.findAll({
        where: {
            post: req.params.id
        },
    })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
};

// AJOUTER UNE MENTION :
exports.addComment = (req, res, next) => {
    Comment.create({
        ...req.body,
    })
    .then(res.status(201).json("Commentaire ajouté!"))
    .catch(error => res.status(400).json({ error }));
};