// const multer = require('multer');
// const fs = require('fs');
// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
// };

// const storage_pic = multer.diskStorage({
//     //La fonction destination indique à multer d'enregistrer les fichiers dans le dossier 'images'.
//     destination: (req, file, callback) => {
//         let path = 'images/';
//         callback(null, path);
//     },
//     //La fonction filename indique à multer d'utiliser le nom d'origine de l'image, de remplacer les espaces par des underscores, et d'ajouter la bonne extension.
//     filename: (req, file, callback) => {
//         const name = file.originalname.split(' ').join('_');
//         const extension = MIME_TYPES[file.mimetype];
//         callback(null, name);
//     }
// });
// //On exporte l'élément multer configuré en lui passant la constante storage et on lui indique qu'on accepte uniquement les fichiers de type image.
// module.exports = multer({ storage: storage_pic }).single('image');

