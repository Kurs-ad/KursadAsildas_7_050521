const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
let username = process.env.USERNAME;
let password = process.env.PASSWORD;
let bdd = process.env.BDD;
const sequelize = new Sequelize(bdd, username, password, {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('users', {
    id : { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    pseudo: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.TEXT, allowNull: false },
    createdAt : { type: DataTypes.DATE, allowNull: false },
    updatedAt : { type: DataTypes.DATE }
});

module.exports = User