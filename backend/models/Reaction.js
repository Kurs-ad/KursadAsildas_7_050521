const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Reaction = sequelize.define('Reaction', {
    reactionId = { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true },
    userId = { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    postId = { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
});

module.exports = Sequelize.model.Reaction