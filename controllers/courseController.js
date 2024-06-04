import Course from "../models/Course.js";
import UserCourse from '../models/UserCourse.js'
import Lesson from "../models/Lesson.js";
import Project from "../models/Project.js";
import { Op } from "sequelize";
import { verifyToken } from "../jwt.js";

UserCourse.belongsTo(Course, {foreignKey: 'course_id', targetKey: 'id'})
Course.belongsTo(UserCourse, {foreignKey: 'id', targetKey: 'course_id'})

const CourseController = {
    getAll: async (req, res) => {
        try {
            const courses = await Course.findAll({
                where: {
                    deleted: {
                        [Op.or]: [null, false]
                    }
                }
            })
            res.json(courses)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    getByUser: async (req, res) => {
        try {
            const course = await Course.findAll({
                where: {
                    id: req.params.id,
                    deleted: {
                        [Op.or]: [null, false]
                    },
                },
                include: {
                    model: UserCourse,
                    required: false,
                    where: {
                        user_id: {
                            [Op.eq]: [req.params.user_id, null]
                        }
                    }
                }
            })
            const lessons = await Lesson.findAll({
                where: {
                    course_id: req.params.id
                }
            })
            const projects = await Project.findAll({
                where: {
                    course_id: req.params.id
                }
            })
            if(!course) {
                return res.status(404).json({error: 'Course not found'})
            }
            
            

            res.json({
                course: course[0],
                lessons,
                projects,
            
            })
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    getCoursesByProgress: async (req, res) => {
        try {
            const userCourses = await Course.findAll({
                include: {
                    model: UserCourse,
                    required: false,
                    where: {
                        user_id: req.params.id
                    },
                },
                order: [[UserCourse, 'progress', 'DESC']]
            })
            res.json(userCourses)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    createCourse: async (req, res) => {
        try {
            if(verifyToken(req.body.token).admin === false) {
                return res.status(403).json({error: 'Unauthorized'})
            }
            const course = await Course.create(req.body)
            res.json(course)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    editCourse: async (req, res) => {
        try {
            if(verifyToken(req.body.token).admin === false) {
                return res.status(403).json({error: 'Unauthorized'})
            }
            const course = await Course.findByPk(req.params.id)
            if(!course) {
                return res.status(404).json({error: 'Course not found'})
            }
            await course.update(req.body)
            res.json(course)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    deleteCourse: async (req, res) => {
        try {
            if(verifyToken(req.body.token).admin === false) {
                return res.status(403).json({error: 'Unauthorized'})
            }
            const course = await Course.findByPk(req.params.id)
            if(!course) {
                return res.status(404).json({error: 'Course not found'})
            }
            await course.update({deleted: true})
            res.json({message: 'Course deleted'})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    favouriteCourse: async (req, res) => {
        try {
            const userCourse = await UserCourse.findOrCreate({
                where: {
                    user_id: req.body.user_id,
                    course_id: req.body.course_id
                },
                defaults: {
                    progress: 0,
                    certificate: false,
                    user_id: req.body.user_id,
                    course_id: req.body.course_id,
                    starred: true
                }
            }).then(([userCourse, created]) => {
                if(!created) {
                    userCourse.update({starred: req.body.favorite})
                }
                return userCourse
            }).then(userCourse => {
                return userCourse
            })

            res.json(userCourse)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    updateProgress: async (req, res) => {
        try {
            const numberOfLessons = await Lesson.count({
                where: {
                    course_id: req.body.course_id
                }
            })

            const numberOfProjects = await Project.count({
                where: {
                    course_id: req.body.course_id
                }
            })

            const total = parseInt(numberOfLessons) + parseInt(numberOfProjects);

            let userCourse = await UserCourse.findOrCreate({
                where: {
                    user_id: req.body.user_id,
                    course_id: req.body.course_id
                },
                defaults: {
                    progress: 0,
                    certificate: false,
                    user_id: req.body.user_id,
                    course_id: req.body.course_id,
                    completed_lessons: '',
                    completed_projects: ''
                }
            }).then(([userCourse, created]) => {
                return userCourse
            }).then(userCourse => {
                return userCourse
            })

            let completedLessons = userCourse.completed_lessons
            let completedProjects = userCourse.completed_projects

            if(req.body.type === 'lesson') {
                if(completedLessons != '' && completedLessons != null) {
                    completedLessons = completedLessons.split(',')
                } else {
                    completedLessons = []
                }
                if(completedLessons.includes(req.body.lesson_id + "")) {
                    return res.json({message: 'Lesson already completed'})
                }
                completedLessons.push(req.body.lesson_id)
                UserCourse.update({
                    completed_lessons: completedLessons.join(','),
                    progress: userCourse.progress + (1 / total)
                }, {
                    where: {
                        user_id: req.body.user_id,
                        course_id: req.body.course_id
                    }
                })
            } else {
                if(completedProjects != '' && completedProjects != null) {
                    completedProjects = completedProjects.split(',')
                } else {
                    completedProjects = []
                }
                if(completedProjects.includes(req.body.project_id + "")) {
                    return res.json({message: 'Project already completed'})
                }
                completedProjects.push(req.body.project_id)
                UserCourse.update({
                    completed_projects: completedProjects.join(','),
                    progress: userCourse.progress + (1 / total)
                }, {
                    where: {
                        user_id: req.body.user_id,
                        course_id: req.body.course_id
                    }
                })
            }

            if(userCourse.progress + (1 / total) == 1) {
                UserCourse.update({
                    certificate: true
                }, {
                    where: {
                        user_id: req.body.user_id,
                        course_id: req.body.course_id
                    }
                })
            }

            res.json({message: 'Progress updated'})


        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

export default CourseController;