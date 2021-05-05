const express = require('express');
const router = express.Router(); //création du routeur

const postsCtrl = require('../controllers/posts.js');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');//à mettre après auth dans la route

//traiter les requêtes POST
router.post('/', auth, multer, postsCtrl.createPost);
router.post('/:id/react', auth, multer, postsCtrl.react);
router.post('/:id/comment', auth, postsCtrl.comment);

//pour modifier un objet
router.put('/:id', auth, multer, postsCtrl.modifyPost);

//route pour la suppression d'un objet
router.delete('/:id', auth, postsCtrl.deletePost);
router.delete('/:id/comment', auth, postsCtrl.deleteComment);

//middleware pour un seul objet
router.get('/:id', auth, postsCtrl.getOnePost);

//middleware avec pour premier argument l'url visée par l'application, aussi appeléé endpoint ou route; pour tous les objets
router.get('/', auth, postsCtrl.getAllPosts);

module.exports = router;