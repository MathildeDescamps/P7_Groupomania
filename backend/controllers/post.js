const Post = require('../models/Post');
const fs = require('fs');


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
            ]
        }) 
        .then(posts => {
            let allPosts = posts.map(p => {
                p.dataValues.url = getImages(p.id);
                return p;
            });
            res.status(200).json(allPosts)
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

// MODIFIER UN POST :
exports.updatePost = (req, res, next) => {
    const postObject = req.body.post;
    Post.update(
        { ...postObject },
        { where: { id: req.params.id } }
    )
    .then(() => res.status(200).json({ message: 'Post modifié !' }))
    .catch(error => res.status(400).json({ error }));
};


// SUPPRIMER UN POST :
exports.deletePost = (req, res, next) => {
    Post.destroy({
            where: {
                id: req.params.id
            }
    })
        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

// UPLOADER LES IMAGES : 
exports.uploadImage = (req, res, next) => {
    res.status(200).json({ message: 'Image uploadée !' });
};