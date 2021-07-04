const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');

router.post('/signup', multer, userCtrl.signup); // pas besoin de auth et multer car on s'authentifie
router.post('/login', userCtrl.login); //auth ne doit pas être présent
router.get('/allUsers', userCtrl.getAllUsers);
router.get('/oneUser/:email', userCtrl.getOneUser);

module.exports = router;