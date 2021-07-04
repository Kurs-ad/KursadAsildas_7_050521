const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Post = require('../models/Post');
const Reaction = require("../models/Reaction")
const { getUsersPost } = require('./posts');

exports.signup = (req, res, next) => {
    console.log("create") ;
    console.log( req.body , req.params);console.log(req.file, req.files);
    bcrypt.hash(req.body.password, 10) //nous appelons la fonction de hachage de bcrypt dans notre mot de passe et lui demandons de « saler » le mot de passe 10 fois.
    .then(hash => { // nous recevons le hash généré
        User.create({
            email: Buffer.from(req.body.email).toString('base64'),
            password: hash,
            pseudo: req.body.pseudo,
            photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            createdAt: Date.now(),
        })
        .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    console.log("login")
    //Buffer.from(req.body.email).toString('base64')
    User.findOne({where : { email: Buffer.from(req.body.email).toString('base64') }}, {include: [Post]})
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé '});
        }
        return res.status(200).json(user)
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect'});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign( // nous utilisons la fonction sign dejsonwebtoken pour encoder un nouveau token
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET', // nous utilisons une chaîne secrète de développement temporaire RANDOM_SECRET_KEY pour encoder notre token, à remplacer pour la prod
                    { expiresIn: '24h' } // nous définissons la durée de validité du token à 24 heures. L'utilisateur devra donc se reconnecter au bout de 24 heures ;
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
    User.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }))
}

exports.getOneUser = (req, res, next) => {
    User.findOne({ where: { email: Buffer.from(req.params.email).toString('base64') } })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }))
}