const Mention = require('../models/Mention');

// RÉCUPÉRER LE NOMBRE DE J'AIME ET J'AIME PAS D'UN POST :
exports.getMentions = async (req, res, next) => {
    try{
        let likes;
        let dislikes;
        let mentions;
        //On récupère le nombre de likes.
        await Mention.findAndCountAll({
            where: {
                post: req.params.id,
                mention: 1
            },
        })
        .then(result => {likes = result.count;});
        //On récupère le nombre de dislikes.
        await Mention.findAndCountAll({
            where: {
                post: req.params.id,
                mention: -1
            },
        })
        .then(result => {dislikes = result.count;});
        mentions = {"likes": likes, "dislikes": dislikes};
        return res.status(200).json(mentions);
    }
    catch{
        return res.status(500).json(err);
    }
};

// AJOUTER UNE MENTION :
exports.addMention = (req, res, next) => {
    Mention.create({
            ...req.body,
        })
        .then(res.status(201).json("Mention ajoutée!"))
        .catch(error => res.status(400).json({ error }));
};