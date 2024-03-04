import Quiz from '../models/Quiz.js';
import { verifyToken } from '../jwt.js';

const QuizController = {
    getByLessonId: async (req, res) => {
        try {
            const quiz = await Quiz.findOrCreate({
                where: {
                    lesson_id: req.params.id
                },
                defaults: {
                    lesson_id: req.params.id,
                    quiz_content: '[]'
                }
            }).then(([quiz, created]) => {
                return quiz
            })

            res.json(quiz)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    updateQuiz: async (req, res) => {
        try {
            if(verifyToken(req.body.token).admin === false) {
                return res.status(403).json({error: 'Unauthorized'})
            }
            const quiz = await Quiz.findByPk(req.params.id)
            if(!quiz) {
                return res.status(404).json({error: 'Quiz not found'})
            }
            await quiz.update({
                quiz_content: req.body.quiz_content
            })
            res.json(quiz)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },
}

export default QuizController;