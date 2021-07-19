const dbConnection = require("../db")
const {DataTypes} = require("sequelize")

const Log = dbConnection.define("log", {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    definition: {
        type: DataTypes.STRING,
        allowNull: false
    },

    result: {
        type: DataTypes.STRING,
        allowNull: false
    },

    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Log