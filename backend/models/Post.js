const Sequelize = require('sequelize');
const sequelize = new Sequelize();

//Création du schéma de donnée
const post = sequelize.define('Post', {
    userId: DataTypes.TEXT, allowNull: false,//{ type: String, required: true },
    photo: DataTypes.TEXT, allowNull: false,//{ type: String, required: true },
    pseudo: DataTypes.TEXT, allowNull: false,//{ type: String, required: true },
    text: DataTypes.TEXT, allowNull: false,//{ type: String, required: true },
    imageUrl: DataTypes.TEXT, allowNull: false,//{ type: String, required: true },
    reactions: DataTypes.TEXT, allowNull: false,//{ type: String, required: true },
    reactionsTotal: DataTypes.INTEGER, allowNull: false,//{ type: Number, required: true },
    comments: DataTypes.TEXT, allowNull: false,//{ type: [String], required: true },
    commentsTotal : DataTypes.INTEGER, allowNull: false,//{ type: Number, required: true },
    usersCommented : { type: [String], required: true },
    usersReacted : { type: [String], required: true }
});

//pour exploiter le schéma
module.exports = Sequelize.models.post;