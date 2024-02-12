import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Project = sequelize.define('Project', {
    project_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    project_content: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'courses',
            key: 'id'
        }
    },
}, {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    tableName: 'projects'
})

export default Project