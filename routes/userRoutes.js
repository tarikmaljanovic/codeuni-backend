import express from 'express'
import UserController from '../controllers/userController.js'

const router = express.Router()

router.get('/byId/:id', UserController.getById)
router.get('/leaderboard', UserController.leaderboard)
router.post('/login', UserController.login)
router.post('/signup', UserController.signup)
router.put('/update/:id', UserController.editUser)

export default router