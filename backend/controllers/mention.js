const Mention = require('../models/Mention');
const { param } = require('../routes/comment');

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

// RÉCUPÉRER MA MENTION J'AIME ET J'AIME PAS D'UN POST :
exports.getMyMention = async (req, res, next) => {
    Mention
        .findOne({ where: { post: req.params.id, user: req.params.userid} })
        .then(function(result) {
            if (result) {
                res.status(200).json({mention : result.mention});
            } else {
                res.status(200).json({mention : 0});
            }
        })
        .catch(error => res.status(500).json({ error }));
};

// AJOUTER UNE MENTION :
exports.addMention = (req, res, next) => {
    let param = req.body;
    Mention
        .findOne({ where: { post: param.post, user: param.user} })
        .then(function(result) {
            // update
            if(result) {
                result.update({ mention: ((result.mention == param.mention) ? 0:param.mention)})
                .then(res.status(200).json("mention modifiée!"))
                .catch(error => res.status(400).json({ error }));
            } else {
            // insert
                Mention.create({ ...param })
                .then(res.status(201).json("Mention ajoutée!"))
                .catch(error => res.status(400).json({ error }));
            }
        })
};