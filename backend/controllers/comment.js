const Comment = require('../models/Comment');

// RÉCUPÉRER LES COMMENTAIRES D'UN POST :
exports.getComments = (req, res, next) => {
    Comment.findAll({
        where: {
            post: req.params.id
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
};

// AJOUTER UNE MENTION :
exports.addComment = (req, res, next) => {
    Comment.create({
        ...req.body,
    })
    .then(obj => res.status(201).json(obj))
    .catch(error => res.status(400).json({ error }));
};