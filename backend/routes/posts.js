const express = require('express');
const router = express.Router(); //création du routeur

const postsCtrl = require('../controllers/posts.js');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');//à mettre après auth dans la route

//traiter les requêtes POST
router.post('/:id', multer, postsCtrl.createPost);
router.post('/:id/:postId/react', postsCtrl.react);
router.post('/:id/:postId/comment', postsCtrl.comment);
router.post('/:id/exemple', multer, postsCtrl.exemple);

//pour modifier un objet
router.put('/:id', multer, postsCtrl.modifyPost);

//route pour la suppression d'un objet
router.delete('/:id', postsCtrl.deletePost);
router.delete('/:id/comment', auth, postsCtrl.deleteComment);
router.delete('/:id/:postId/reaction', postsCtrl.deleteReaction);

//middleware pour un seul objet
//router.get('/:id', postsCtrl.getOnePost);

//middleware avec pour premier argument l'url visée par l'application, aussi appeléé endpoint ou route; pour tous les objets
router.get('/', postsCtrl.getAllPosts, postsCtrl.reactionsTotal);
router.get('/:userId', postsCtrl.getUsersPost);
router.get('/postId/comments', postsCtrl.getPostComments);

module.exports = router;