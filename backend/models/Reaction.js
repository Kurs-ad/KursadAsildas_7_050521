const { Sequelize, DataTypes } = require('sequelize');
const Post = require('./Post');
const User = require('./User');
require('dotenv').config();
let username = process.env.USERNAME;
let password = process.env.PASSWORD;
let bdd = process.env.BDD;
const sequelize = new Sequelize(bdd, username, password, {
    host: 'localhost',
    dialect: 'mysql'
});

const Reaction = sequelize.define('reactions', {
    id : { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true },
    postId : { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    userId : { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    createdAt : { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE }
});



module.exports = Reaction