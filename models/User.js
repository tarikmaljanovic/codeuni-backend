import { DataTypes } from "sequelize"
import sequelize from "../sequelize.js"
import Course from "./Course.js"

const User = sequelize.define('User', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    tableName: 'users'
})

export default User