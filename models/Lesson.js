import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Lesson = sequelize.define('Lesson', {
    lesson_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lesson_content: {
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
    tableName: 'lessons'
})

export default Lesson