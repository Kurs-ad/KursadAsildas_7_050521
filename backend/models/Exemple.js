const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
let username = process.env.USERNAME;
let password = process.env.PASSWORD;
let bdd = process.env.BDD;
const sequelize = new Sequelize(bdd, username, password, {
    host: 'localhost',
    dialect: 'mysql'
});

const Exemple = sequelize.define('exemples', {
    id: {type: DataTypes.SMALLINT, allowNull: false, autoIncrement: true, primaryKey: true},    
    photo : {type: DataTypes.TEXT, allowNull: false},
    createdAt: {type: DataTypes.DATE, allowNull: false},
    updatedAt: {type: DataTypes.DATE}
});

module.exports = Exemple