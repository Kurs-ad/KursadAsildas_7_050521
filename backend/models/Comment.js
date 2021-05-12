const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Comment = sequelize.define('Comment', {
    commentId = { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true },
    userId = { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    userPhoto = { type: DataTypes.STRING, allowNull: false },
    comment = { type: DataTypes.STRING, allowNull: false },
    commentDate = { type: DataTypes.DATE, allowNull: false },
    postId = { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
});

module.exports = Sequelize.model.Comment