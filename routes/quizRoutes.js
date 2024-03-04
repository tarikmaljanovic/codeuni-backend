import express from 'express';
import QuizController from '../controllers/quizController.js';

const router = express.Router();

router.get('/byLessonId/:id', QuizController.getByLessonId);
router.put('/updateQuiz/:id', QuizController.updateQuiz);

export default router;