const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
let username = process.env.USERNAME;
let password = process.env.PASSWORD;
let bdd = process.env.BDD;
const sequelize = new Sequelize(bdd, username, password, {
    host: 'localhost',
    dialect: 'mysql'
});
const User = require('./User')
const Reaction = require('./Reaction');
const Comment = require('./Comment');

//Création du schéma de donnée
const Post = sequelize.define('posts', {    
    id: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING },
    createdAt : { type: DataTypes.DATE, allowNull: false },
    updatedAt : { type: DataTypes.DATE }
});

Post.hasMany(Reaction, {foreignKey: "postId" });
User.hasMany(Reaction, { foreignKey: "userId" });
Reaction.belongsTo(Post);
Reaction.belongsTo(User);
Post.hasMany(Comment, {foreignKey: "postId" });
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(Post);
Comment.belongsTo(User);
User.hasMany(Post);
Post.belongsTo(User);

//pour exploiter le schéma
module.exports = Post