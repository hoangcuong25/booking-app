import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appoitnmentModel from '../models/appointmenModel.js'

const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body

        const doctor = await doctorModel.findOne({ _id: docId })

        if (!doctor) return res.status(400).json({ success: false })

        doctor.available = !doctor.available

        await doctor.save()

        return res.json({ success: true, message: 'changed available' })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api login for doctor
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECERT)

            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api to get doctor appoinment for doctor pannel
const appoinmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body
        const appointments = await appoitnmentModel.find({ docId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api to mark appoitnment completed for doctor pannel
const appointmentCompleted = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body

        const appoinmentData = await appoitnmentModel.findById(appointmentId)

        if (appoinmentData && appoinmentData.docId === docId) {
            await appoitnmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: "Appointment Completed" })
        } else {
            return res.json({ success: false, message: 'Mark Failed' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api to cannel appoitnment for doctor pannel
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body

        const appoinmentData = await appoitnmentModel.findById(appointmentId)

        if (appoinmentData && appoinmentData.docId === docId) {
            await appoitnmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: "Appointment Cancelled" })
        } else {
            return res.json({ success: false, message: 'Cancel Failed' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api to get dashboard data for doctor pannel
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body

        const appointments = await appoitnmentModel.find({ docId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api to get doctor profile for doctor pannel
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body

        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api to update doctor profile data from doctor pannel 
const updateDoctorProfie = async (req, res) => {
    try {
        const { docId, fees, address, available } = req.body

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

export {
    changeAvailablity, doctorList, loginDoctor,
    appoinmentsDoctor, appointmentCompleted,
    appointmentCancel, doctorDashboard,
    doctorProfile, updateDoctorProfie
}