const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'THIS_IS_MY_RANDOM_TOKEN_SECRET_KEY_THAT_NOBODY_HAS_TO_KNOW');
    let image = req.body.image;
    if((req.params.id == decodedToken.user)||(decodedToken.rights == "admin")) {
        User.update(
            { profilePic: image },
            { where: { id: req.params.id, } })
        .then(result => res.status(200).json(result))
        .catch(err => { console.log(err); res.status(500).json(err); }); 
    } else {
        res.status(401).json({erreur: "Vous n'avez pas le droit de modifier ce profile !"});
    }
};