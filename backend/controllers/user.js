const bcrypt = require('bcrypt');

//On importe le package jsonwebtoken pour créer et vérifier les tokens d'authentification.
const jwt = require('jsonwebtoken');

const User = require('../models/User');


exports.signup = (req, res, next) => {
    console.log(JSON.stringify(req.body));
    //On appelle la fonction de hachage de bcrypt et on lui dit de saler le mot de passe 10 fois. Elle nous renvoie une promesse avec le hash généré.
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //On crée un nouvel utilisateur et on le sauvegarde dans la base de données.
            const user = User.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    status: req.body.status,
                    hiringDate: req.body.hiringDate,
                    password: hash
                })
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    //On vérifie que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données.
    (async () => {
        const user = await User.findOne({
            where: {
            email: req.body.email
            }
        })
        if (!user) return res.status(401).json({ error: 'Utilisateur non trouvé !' })
        //On utilise la fonction compare() de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
        bcrypt.compare(req.body.password, user.dataValues.password)
        .then((valid) => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            //S'il n'y a pas d'erreur, on renvoie une réponse 200 contenant l'ID utilisateur et un token.
            return res.status(200).json({
                firstname: user.dataValues.firstname ,
                // On utilise la fonction sign() de jsonwebtoken pour encoder un nouveau token. Ce token contient l'ID de l'utilisateur en tant que payload.
                token: jwt.sign({ user: user.dataValues.id, firstname: user.dataValues.firstname },
                            'THIS_IS_MY_RANDOM_TOKEN_SECRET_KEY_THAT_NOBODY_HAS_TO_KNOW', { expiresIn: '24h' }
                        )
            });
        })
        .catch(error => res.status(500).json({ error }));
    }) ()
};