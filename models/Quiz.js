import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Quiz = sequelize.define('Quiz', {
    quiz_content: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    lesson_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'lessons',
            key: 'id'
        }
    },
}, {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    tableName: 'quizzes'
})

export default Quiz;