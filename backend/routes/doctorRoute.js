import express from 'express'
import { doctorList, loginDoctor, appoinmentsDoctor, appointmentCancel, appointmentCompleted, doctorDashboard, updateDoctorProfie, doctorProfile } from '../controllers/doctorController.js'
import authDoc from '../middlewares/authDoc.js'


const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoc, appoinmentsDoctor)
doctorRouter.post('/completed-appointment', authDoc, appointmentCompleted)
doctorRouter.post('/cancel-appointment', authDoc, appointmentCancel)
doctorRouter.get('/dashboard', authDoc, doctorDashboard)
doctorRouter.get('/profile', authDoc, doctorProfile)
doctorRouter.post('/update-profile', authDoc, updateDoctorProfie)

export default doctorRouter