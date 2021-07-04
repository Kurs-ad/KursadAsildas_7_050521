const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Comment = sequelize.define('Comment', {
    id : { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true },
    comment : { type: DataTypes.STRING, allowNull: false },
    createdAt : { type: DataTypes.DATE, allowNull: false },
    userId : { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    postId : { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
});

module.exports = Comment