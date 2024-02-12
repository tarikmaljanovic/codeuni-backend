import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import User from "./User.js";

const Course = sequelize.define('Course', {
    course_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    course_image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deleted: {
        type: DataTypes.BOOLEAN,
    },
}, {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    tableName: 'courses'
})

export default Course