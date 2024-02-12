import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Badge = sequelize.define('Badge', {
    badge_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    badge_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    badge_image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    tableName: 'badges'
})

export default Badge