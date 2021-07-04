//importation de dotenv
require('dotenv').config();
let username = process.env.USERNAME;
let password = process.env.PASSWORD;
let bdd = process.env.BDD;

//importation de sequelize
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(bdd, username, password, {
    host: 'localhost',
    dialect: 'mysql'
});

//Pour tester si la connection à la BDD est réalisée
run().catch(error => console.log(error.stack));
async function run() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = sequelize;