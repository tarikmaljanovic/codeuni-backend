import express from 'express';
import LessonController from '../controllers/lessonController.js';

const router = express.Router();

router.get('/', LessonController.getAll);
router.get('/byId/:id', LessonController.getById);
router.post('/createLesson', LessonController.createLesson);
router.put('/updateLesson/:id', LessonController.editLesson);
router.put('/updateLessonContent/:id', LessonController.editLessonContent);
router.put('/deleteLesson/:id', LessonController.deleteLesson);

export default router;