import express from 'express'
import { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/doctorController.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors', authAdmin, allDoctors)
adminRouter.put('/change-availablity', authAdmin, changeAvailablity)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/canel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter