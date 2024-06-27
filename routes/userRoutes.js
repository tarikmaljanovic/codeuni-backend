import express from 'express'
import UserController from '../controllers/userController.js'

const router = express.Router()

router.get('/byId/:id', UserController.getById)
router.get('/allStudents', UserController.getAllStudents)
router.get('/leaderboard', UserController.leaderboard)
router.post('/login', UserController.login)
router.post('/signup', UserController.signup)
router.put('/update/:id', UserController.editUser)
router.post('/sendEmail', UserController.sendEmail)
router.post('/downloadCertificate', UserController.downloadCertificate)
router.put('/disableAccount', UserController.disableAccount)
router.put('/enableAccount', UserController.enableAccount)

export default router