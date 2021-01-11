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

//UPLOADER UNE PHOTO DE PROFILE :
exports.updateImage = (req, res, next) => {
    let image = req.body.image;
    //On va chercher en base le user à mettre à jour avec findByPk (=find by primary key). 
    User.findByPk(req.params.id)
        .then(user => {
                user.update({ profilePic: image});
                res.status(200);
        })
        .catch(error => res.status(404).json({ error }));
};