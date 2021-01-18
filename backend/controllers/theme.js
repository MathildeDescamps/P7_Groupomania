const Theme = require('../models/Theme');

// CRÉER UN THÈME :
exports.createTheme = (req, res, next) => {
    //Le front-end doit envoyer les données de la requête sous la forme 'data-form', et non 'JSON'. On doit donc parser l'objet reçu pour pouvoir l'utiliser.
    const themeObject = {...req.body};
    Theme.findOne({ where: { name: themeObject.name } })
        .then(function (result) {
        //Si le thème existe déjà, on ne le recrée pas :
        if (result) {
            return res.status(200).json({message: 'Ce thème existe déjà !'});
        } else {
            //S'il n'existe pas, on le crée :
            Theme.create({
                ...themeObject,
            })
            .then((t) => res.status(201).json({ id: t.id }))
            .catch(error => res.status(400).json({ error }));
        }
        return;
    })
    .catch(error => res.status(400).json({ error }));
};

// RÉCUPÉRER TOUS LES THEMES :
exports.getThemes = (req, res, next) => {
    Theme.findAll()
        .then(themes => res.status(200).json(themes))
        .catch(error => res.status(400).json({ error }));
};

// RÉCUPÉRER UN THÈME :
exports.getOneTheme = (req, res, next) => {
    Theme.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(theme => res.status(200).json(theme))
        .catch(error => res.status(404).json({ error }));
};

// MODIFIER UN THEME : 
exports.updateTheme = (req, res, next) => {
    const themeObject = req.body.theme;
    Theme.update(
        { ...themeObject },
        { where: { id: req.params.id } }
    )
    .then(() => res.status(200).json({ message: 'Thème modifié !' }))
    .catch(error => res.status(400).json({ error }));
};


// SUPPRIMER UN THÈME :
exports.deleteTheme = (req, res, next) => {
            Theme.destroy({
                    where: {
                        id: req.params.id
                    }
            })
                .then(() => res.status(200).json({ message: 'Thème supprimé !' }))
                .catch(error => res.status(400).json({ error }));
};