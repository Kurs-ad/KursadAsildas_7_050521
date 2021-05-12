const Post = require('../models/Post');
require('sequelize')
const fs = require('fs');

exports.createPost = (req, res, next) => {
    console.log(req.body)
    //const postObject = JSON.parse(req.body.post); //on extrait l'objet JSON de "sauce"
    //delete postObject._id // car mongoDB nous fournit un id (c'était req.body._id)
    Post.create({ //Cette méthode créé une nouvelle instance et l'enregistre dans la BDD
            ...req.body.post, //copie les champs dans le corps de la requête
            //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            reactionsTotal: 0,
            commentsTotal: 0,
        })
        .then(() => res.status(201).json({ message : 'Objet enregistré' }))
        .catch(error => res.status(400).json({ error }));
};

exports.react = (req, res, next) => {
    Post.findOne({ where: { _id: req.params.id } })
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
    Comment.create({
            ...req.body.comment
        })
    Post.findOne({ where: { _id: req.params.id } })
    .then(post => {
        const id = req.body.userId;
        const comment= req.body.comment;
        const userPhoto = req.body.userPhoto;
        const postId = req.params.id;
        post.usersCommented.push(id);
        post.comments.push(req.body.comment);
        post.commentsTotal ++;
    })
    .catch(error => res.status(500).json({ error }))
};

exports.modifyPost = (req, res, next) => {
    console.log("modify")
    const post = Post.findOne({ where: { _id: req.params.id } });
    const postObject = req.file ? //Pour vérifier si il y a une nouvelle image ou pas (opérateur ternaire)
            post.update({
                ...req.body.post,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`},
            { ...post, imageUrl })
            .then(() => res.status(200).json({ message : 'Objet modifié' }))
            .catch(error => res.status(400).json({ error }))
        : post.update({ ...req.body }, { ...post }) //copie de req.body si le fichier n'existe pas
        .then(() => res.status(200).json({ message : 'Objet modifié' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { _id: req.params.id } })
    .then(post => {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink('images/${filename}', () => {
            post.destroy()
            .then(() => res.status(200).json({ message: 'Objet supprimé' }))
            .catch(error => res.status(400).json({ error })) 
        })
    })
    .catch(error => res.status(500).json({ error}));
};

exports.deleteComment = (req, res, next) => {
    Comment.findOne({ where: { _id: req.params.id } })
    .then(comment => {
        comment.destroy()
        .then(() => res.status(200).json({ message: 'Objet supprimé' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error}));
};

exports.getOnePost = (req, res, next) => {
    console.log("frgegrege")
    const post = Post.findOne({ where: { _id: req.params.id } })
    //     if (post === null) {
    //         post => res.status(200).json(post)
    //     } else {
    //         error => res.status(404).json({ error })
    //         console.log(post instanceof Post); // true
    //         console.log(post.title); // 'My Title'
    //     }
    // Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }))
};

exports.getAllPosts = (req, res, next) => {
    console.log("all")
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }))
}