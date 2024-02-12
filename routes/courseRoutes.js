import express from 'express';
import CourseController from '../controllers/courseController.js';

const router = express.Router();

router.get('/', CourseController.getAll);
router.get('/byId/:id/:user_id', CourseController.getByUser);
router.get('/userCourses/:id', CourseController.getCoursesByProgress);
router.post('/createCourse', CourseController.createCourse);
router.put('/favoriteCourse', CourseController.favouriteCourse);
router.put('/updateCourse/:id', CourseController.editCourse);
router.put('/deleteCourse/:id', CourseController.deleteCourse);

export default router;