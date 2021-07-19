const {DataTypes} = require("sequelize")
const dbConnection = require("../db")

const User = dbConnection.define("user", {
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User