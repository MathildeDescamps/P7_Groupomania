const multer = require('multer');
const fs = require('fs');
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    //La fonction destination indique à multer d'enregistrer les fichiers dans le dossier 'images'.
    destination: (req, file, callback) => {
        console.log('multer:', req.params.id);
        let path = 'images/' + req.params.id;
        if (!fs.existsSync(path)) {
            fs.mkdir(path, function(err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("New directory successfully created.")
                }
                });
        }
        callback(null, path);
    },
    //La fonction filename indique à multer d'utiliser le nom d'origine de l'image, de remplacer les espaces par des underscores, et d'ajouter la bonne extension.
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name);
    }
});
//On exporte l'élément multer configuré en lui passant la constante storage et on lui indique qu'on accepte uniquement les fichiers de type image.
module.exports = multer({ storage: storage }).array('image', 10);