const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

//Création du schéma de donnée
const Post = sequelize.define('Posts', {    
    postId: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING },
    reactionsTotal: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    commentsTotal: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    postDate : { type: DataTypes.DATE, allowNull: false }
    // photo: { type: DataTypes.STRING(100), allowNull: false },
    // pseudo: { type: DataTypes.STRING(30), allowNull: false },
});

//pour exploiter le schéma
module.exports = Post