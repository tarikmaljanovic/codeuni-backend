import { DATE, DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'
import User from './User.js'
import Course from './Course.js'

const UserCourse = sequelize.define('UserCours', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'courses',
            key: 'id'
        }
    },
    progress: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    certificate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    starred: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    completed_lessons: {
        type: DataTypes.TEXT
    },
    completed_projects: {
        type: DataTypes.TEXT
    }
}, {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    tableName: 'user_courses'
})

export default UserCourse