const Post = require('../models/Post');
const Reaction = require('../models/Reaction');
const Comment = require('../models/Comment');
const User = require("../models/User")
require('sequelize')
const fs = require('fs');
const Exemple = require('../models/Exemple')

exports.exemple = (req, res) => {
    console.log("exemple +", req.body, " - ", req.file, "*", Object.keys(req.params))
    Exemple.create({
        photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    .then(()=>res.status(201).json({message: "exemple réalisé"}))
    .catch(error=>res.status(400).json({error}))
}

exports.createPost = (req, res) => {
    console.log("create post")
    req.file ?
    Post.create({ //Cette méthode créé une nouvelle instance et l'enregistre dans la BDD
        ...req.body,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
        .then(() => res.status(201).json({ message : 'Objet enregistré' }))
        .catch(error => res.status(400).json({ error }))
        : Post.create({ //Cette méthode créé une nouvelle instance et l'enregistre dans la BDD
            ...req.body})
            .then(() => res.status(201).json({ message : 'Objet enregistré' }))
            .catch(error => res.status(400).json({ error }));
};

exports.react = (req, res) => {
    console.log(req.params)
    Reaction.findOrCreate({where: { postId: req.params.postId, userId: req.params.id }, defaults: {createdAt: Date.now()}})
    .then((userCreated) =>{
        if(userCreated[1]){
            res.status(201).json({message: "Réaction créée"})
        } else {
            Reaction.destroy({where: { postId: req.params.postId, userId: req.params.id }})
            .then(() => res.status(204).json({message: "Réaction supprimée"}))
            .catch(erreur =>  res.status(404).json({erreur}))
        }
    })
    .catch(error => res.status(500).json({error}))
};

exports.deleteReaction = (req, res) => {
    Reaction.destroy({ where: { userId: req.params.id, postId: req.params.postId }})
    .then(() => res.status(200).json({ message: 'Objet supprimé' }))
    .catch(error => res.status(400).json({ error }))
};

exports.comment = (req, res) => {
    Comment.create({
        comment : req.body.text,
        createdAt : Date.now(),
        userId : req.body.user,
        postId : req.body.post,
    })
    .then(() => res.status(201).json({ message : 'Objet enregistré' }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res) => {
    console.log("modify")
    const postObject = req.file ? //Pour vérifier si il y a une nouvelle image ou pas (opérateur ternaire)
            Post.update({
                ...req.body.post,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`},
            { where: { id: req.params.id } })
            .then(() => res.status(200).json({ message : 'Objet modifié' }))
            .catch(error => res.status(400).json({ error }))
        : post.update({ ...req.body }, { where: { id: req.params.id } }) //copie de req.body si le fichier n'existe pas
        .then(() => res.status(200).json({ message : 'Objet modifié' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deletePost = (req, res) => {
    console.log("delete")
    Post.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'Objet supprimé' }))
    .catch(error => res.status(400).json({ error })) 
};

exports.deleteComment = (req, res) => {
    Comment.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'Objet supprimé' }))
    .catch(error => res.status(400).json({ error }))
};

// exports.getOnePost = (req, res, next) => {
//     const post = Post.findOne({ where: { id: req.params.id } })
//     .then(post => res.status(200).json(post))
//     .catch(error => res.status(404).json({ error }))
// };

exports.getAllPosts = (req, res) => {
    console.log("all")
    Post.findAll({ include: [Reaction, Comment, User] })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }))
};

exports.getUsersPost = (req, res) => {
    Post.findAll({
        where: { userId: req.params.userId }
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(404).json({ error }))
};

exports.getPostComments = (req, res) => {
    Comment.findAll({
        where: { commentedPost: req.params.postId }
    })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(404).json({ error }))
};

exports.reactionsTotal = (req, res) =>{
    Reaction.findAndCountAll({
        where: { reactedToPost: req.params.post }
    })
    .then(reactions => res.status(200).json(reactions.count))
    .catch(error => res.status(500).json({ error }))
}