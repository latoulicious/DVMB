import express from 'express'
import { userController } from '../controllers/userController'
import { karyawanController } from '../controllers/karyawanController'

const router = express.Router()

router.post('/users', userController.createUser)
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getUserById)
router.put('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

router.post('/karyawan', karyawanController.createKaryawan)
router.get('/karyawan', karyawanController.getAllKaryawan)
router.get('/karyawan/:id', karyawanController.getKaryawanById)
router.put('/karyawan/:id', karyawanController.updateKaryawan)
router.delete('/karyawan/:id', karyawanController.deleteKaryawan)

export default router
