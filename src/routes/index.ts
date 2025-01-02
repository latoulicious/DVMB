import express from 'express'
// import { authenticateToken } from '../middleware/auth'
import { userController } from '../controllers/userController'
import { karyawanController } from '../controllers/karyawanController'
// import * as authController from '../controllers/authController'

const router = express.Router()

// Authentication Routes
// router.post('/login', authController.login)

const userRoutes = express.Router()
// userRoutes.use(authenticateToken) // Apply authentication to all user routes

// User Routes
userRoutes.post('/', userController.createUser)
userRoutes.get('/', userController.getAllUsers)
userRoutes.get('/:id', userController.getUserById)
userRoutes.put('/:id', userController.updateUser)
userRoutes.delete('/:id', userController.deleteUser)

// Karyawan Routes
const karyawanRoutes = express.Router()
karyawanRoutes.post('/', karyawanController.createKaryawan)
karyawanRoutes.get('/', karyawanController.getAllKaryawan)
karyawanRoutes.get('/:id', karyawanController.getKaryawanById)
karyawanRoutes.put('/:id', karyawanController.updateKaryawan)
karyawanRoutes.delete('/:id', karyawanController.deleteKaryawan)

// Combine Routes
router.use('/users', userRoutes)
router.use('/karyawan', karyawanRoutes)

export default router
