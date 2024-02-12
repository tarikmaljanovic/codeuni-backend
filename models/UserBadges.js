import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const UserBadge = sequelize.define('UserBadge', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    badge_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'badges',
            key: 'id'
        
        }
    },
    earning_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    tableName: 'user_badges'
})

export default UserBadge