const User = require('../models/User');

// RÉCUPÉRER TOUS LES USERS :
exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

// RÉCUPÉRER UN USER :
exports.getOneUser = (req, res, next) => {
    User.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};