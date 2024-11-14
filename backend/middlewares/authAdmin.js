import jwt from 'jsonwebtoken'

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers
        if (!atoken) {
            return res.json({ success: false, message: "Not Authorized Login Again" })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECERT)

        if (token_decode !== process.env.AMDIN_EMAIL + process.env.AMDIN_PASSORD) {
            return res.json({ success: false, message: "not authoridez Login again!" })
        }

        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export default authAdmin