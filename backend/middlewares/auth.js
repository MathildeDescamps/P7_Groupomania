const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        //On utilise la fonction verify pour décoder notre token.
        const decodedToken = jwt.verify(token, 'THIS_IS_MY_RANDOM_TOKEN_SECRET_KEY_THAT_NOBODY_HAS_TO_KNOW');
        //On extrait l'ID utilisateur de notre token.
        const userId = decodedToken.user;
        //On vérifie qu'il y ait un ID utilisateur dans la requête et qu'il corresponde à l'ID utilisateur du token.
        if (req.params.user != userId) {
            throw 'User ID non valable';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({error: error});
    }
};