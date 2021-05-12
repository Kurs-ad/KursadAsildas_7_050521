const express = require('express');
const router = express.Router(); //création du routeur

const postsCtrl = require('../controllers/posts.js');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');//à mettre après auth dans la route

//traiter les requêtes POST
router.post('/', multer, postsCtrl.createPost);
router.post('/:id/react', multer, postsCtrl.react);
router.post('/:id/comment', postsCtrl.comment);

//pour modifier un objet
router.put('/:id', multer, postsCtrl.modifyPost);

//route pour la suppression d'un objet
router.delete('/:id', auth, postsCtrl.deletePost);
router.delete('/:id/comment', auth, postsCtrl.deleteComment);

//middleware pour un seul objet
router.get('/:id', postsCtrl.getOnePost);

//middleware avec pour premier argument l'url visée par l'application, aussi appeléé endpoint ou route; pour tous les objets
router.get('/', postsCtrl.getAllPosts);

module.exports = router;