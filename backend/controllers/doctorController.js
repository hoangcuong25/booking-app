import doctorModel from '../models/doctorModel.js'

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

export { changeAvailablity, doctorList }