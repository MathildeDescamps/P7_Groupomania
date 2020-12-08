const Post = require('../models/Post');

// CRÉER UN POST :
exports.createPost = (req, res, next) => {
    //Le front-end doit envoyer les données de la requête sous la forme 'data-form', et non 'JSON'. On doit donc parser l'objet reçu pour pouvoir l'utiliser.
    const postObject = req.file ? {
        ...req.body.post,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };
    Post.create({
            ...postObject,
        })
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// RÉCUPÉRER TOUS LES POSTS :
exports.getPosts = (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

// RÉCUPÉRER TOUS LES POSTS D'UN USER :
exports.getPostsOfOneUser = (req, res, next) => {
    Post.findAll({
            where: {
                user: req.params.user_id
            }
        })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({ error }));
};
/*
// MODIFIER UN POST :
exports.modifyPost = (req, res, next) => {
    //On regarde si req.file existe ou non. Si oui, on traite l'image. Si non, on change simplement les champs modifiés ( = objet entrant).
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };
    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};
*/