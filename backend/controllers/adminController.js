import validator from 'validator'
import bycrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'

// api for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "Missing Details" })
        }

        // validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" })
        }

        // hashing doctor password
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: 'doctor added' })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.AMDIN_EMAIL && password === process.env.AMDIN_PASSORD) {

            const token = jwt.sign({ email: email, password: password }, process.env.JWT_SECERT, { expiresIn: "72h" })
            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

export { addDoctor, loginAdmin }