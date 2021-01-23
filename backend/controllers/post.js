const Post = require('../models/Post');
const fs = require('fs');
const { post } = require('../routes/post');
const { TokenExpiredError } = require('jsonwebtoken');
const { decode } = require('punycode');
const jwt = require('jsonwebtoken');

// CRÉER UN POST :
exports.createPost = (req, res, next) => {
    const postObject = {...req.body };
    Post.create({
            ...postObject,
        })
        .then((p) => res.status(201).json({ id: p.id }))
        .catch(error => res.status(400).json({ error }));
};

// RÉCUPÉRER TOUS LES POSTS :
exports.getPosts = (req, res, next) => {
    //Récupération des images du post s'il y en a:
    const getImages = (postId) => {
        let path = 'images/' + postId;
        let files = [];
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(file => {
                files.push(path + '/' + file);
            });
        }
        return files; 
    };
    //Récupération du contenu (texte) du post:
    Post.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
        }) 
        .then(posts => {
            let allPosts = posts.map(p => {
                p.dataValues.url = getImages(p.id);
                return p;
            });
            res.status(200).json(allPosts);
        })
        .catch(error => res.status(400).json({ error }));
};

// RÉCUPÉRER TOUS LES POSTS D'UN USER :
exports.getPostsOfOneUser = (req, res, next) => {
    Post.findAll({
            where: {
                user: req.params.user_id
            }
        })
        .then(posts => {
            let allPosts = posts.map(p => {
                p.dataValues.url = getImages(p.id);
                return p;
            });
            res.status(200).json(allPosts)
        })
        .catch(error => res.status(404).json({ error }));
};

// SUPPRIMER UN POST :
exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'THIS_IS_MY_RANDOM_TOKEN_SECRET_KEY_THAT_NOBODY_HAS_TO_KNOW');
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
    .then( post => {
        if((req.params.user == post.user)||(decodedToken.rights == "admin")) {
            post.destroy({})
            .then(() => res.status(200).json({ message: 'Post supprimé !' }))
            .catch(error => res.status(400).json({ error }));
        }
        else {
            return res.status(401).json({erreur: "Vous n'avez pas le droit de supprimer ce post."});
        }
    })
};

// UPLOADER LES IMAGES : 
exports.uploadImage = (req, res, next) => {
    res.status(200).json({ message: 'Image uploadée !' });
};