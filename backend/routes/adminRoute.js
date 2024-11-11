import express from 'express'
import { addDoctor, loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authenticateToken from '../middlewares/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authenticateToken, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)

export default adminRouter