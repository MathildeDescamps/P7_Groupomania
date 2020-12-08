const Theme = require('../models/Theme');

// CRÉER UN THÈME :
exports.createTheme = (req, res, next) => {
    //Le front-end doit envoyer les données de la requête sous la forme 'data-form', et non 'JSON'. On doit donc parser l'objet reçu pour pouvoir l'utiliser.
    const themeObject = req.body.theme;
    Theme.create({
            ...themeObject,
        })
        .then(() => res.status(201).json({ message: 'Thème enregistré !' }))
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

// SUPPRIMER UN THÈME :
exports.deleteTheme = (req, res, next) => {
    //On utilise l'ID reçu en paramètre pour trouver le thème correspondant dans la base de données.
    Theme.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(theme => {
            //La méthode destroy() supprime le theme unique, ayant le même id que le paramètre de la requête, dans la base de données. 
            Theme.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({ message: 'Thème supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};