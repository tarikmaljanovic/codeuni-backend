import Lesson from '../models/Lesson.js'
import { verifyToken } from '../jwt.js'

function escapeJsonString(inputString) {
    if (typeof inputString !== 'string') {
        return inputString;
    }
    return JSON.stringify({ content: inputString });
}

const LessonController = {
    getAll: async (req, res) => {
        try {
            const lessons = await Lesson.findAll()
            res.json(lessons)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    getById: async (req, res) => {
        try {
            const lesson = await Lesson.findByPk(req.params.id)
            if(!lesson) {
                return res.status(404).json({error: 'Lesson not found'})
            }
            res.json(lesson)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    createLesson: async (req, res) => {
        try {   
            if(verifyToken(req.body.token).admin === false) {
                return res.status(403).json({error: 'Unauthorized'})
            }
            const lesson = await Lesson.create({
                ...req.body,
                lesson_content: JSON.stringify({content: []})
            })
            res.json(lesson)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    editLesson: async (req, res) => {
        try {
            if(verifyToken(req.body.token).admin === false) {
                return res.status(403).json({error: 'Unauthorized'})
            }
            const lesson = await Lesson.findByPk(req.params.id)
            if(!lesson) {
                return res.status(404).json({error: 'Lesson not found'})
            }
            await lesson.update(req.body)
            res.json(lesson)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    editLessonContent: async (req, res) => {
        try {
            if(verifyToken(req.body.token).admin === false) {
                return res.status(403).json({error: 'Unauthorized'})
            }
            const lesson = await Lesson.findByPk(req.params.id)
            if(!lesson) {
                return res.status(404).json({error: 'Lesson not found'})
            }
            await lesson.update({lesson_content: JSON.stringify({content: req.body.content})})
            res.json(lesson)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    deleteLesson: async (req, res) => {
        try {
            if(verifyToken(req.body.token).admin === false) {
                return res.status(403).json({error: 'Unauthorized'})
            }
            const lesson = await Lesson.findByPk(req.params.id)
            if(!lesson) {
                return res.status(404).json({error: 'Lesson not found'})
            }
            await lesson.destroy()
            res.json({message: 'Lesson deleted'})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

export default LessonController