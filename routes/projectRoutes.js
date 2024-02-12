import express from 'express';
import ProjectController from '../controllers/projectController.js';

const router = express.Router();

router.get('/', ProjectController.getAll);
router.get('/byId/:id', ProjectController.getById);
router.post('/createProject', ProjectController.createProject);
router.put('/updateProject/:id', ProjectController.editProject);
router.put('/updateProjectContent/:id', ProjectController.editProjectContent);
router.put('/deleteProject/:id', ProjectController.deleteProject);

export default router;