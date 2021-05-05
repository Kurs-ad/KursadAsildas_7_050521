const Post = require('../models/Post');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post); //on extrait l'objet JSON de "sauce"
    delete postObject._id // car mongoDB nous fournit un id (c'était req.body._id)
    const post = new Post({
        ...postObject, //copie les champs dans le corps de la requête
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        reactionsTotal: 0,
        commentsTotal: 0,
        usersReacted: [],
        usersCommented: []
    });
    post.save() //enregistre sauce dans la BDD et renvoie une promise
    .then(() => res.status(201).json({ message : 'Objet enregistré' }))
    .catch(error => res.status(400).json({ error }));
};

exports.react = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
    .then(post => {
        const id = req.body.userId;
        const reactions = req.body.reactionsTotal;
        let reactIndex = post.usersReacted.indexOf(id);
        if (react == 1){
            if(reactIndex < 0){
                post.usersReacted.push(id);
                post.reactionsTotal ++;
                console.log(post)
            }
        } else {
            if(reactIndex > -1){
                post.usersReacted.splice(reactIndex, 1);
                post.reactionsTotal --;
            }
        }
        post.save();
        res.status(201).json({sauce})
    })
    .catch(error => res.status(500).json({ error }))
};

exports.comment = (req, res, next) => {
    Post.findOnde({ _id: req.params.id })
    .then(post => {
        const id = req.body.userId;
        const comments = req.body.commentsTotal;
        const commentIndex = post.usersCommented.indexOf(id);
        post.usersCommented.push(id);
        post.comments.push(req.body.comment);
        post.commentsTotal ++;
    })
    .catch(error => res.status(500).json({ error }))
};

exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? //Pour vérifier si il y a une nouvelle image ou pas (opérateur ternaire)
    { 
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }; //copie de req.body si le fichier n'existe pas
    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message : 'Objet modifié' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
    .then(post => {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink('images/${filename}', () => {
            Post.deleteOne({ _id: req.params.id})
            .then(() => res.status(200).json({ message: 'Objet supprimé' }))
            .catch(error => res.status(400).json({ error })) 
        })
    })
    .catch(error => res.status(500).json({ error}));
};

exports.deleteComment = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
    .then(post => {
        Post.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Objet supprimé' }))
        .catch(error => res.status(400).json({ error })) 
    })
    .catch(error => res.status(500).json({ error}));
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }))
};

exports.getAllPosts = (req, res, next) => {
    Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};