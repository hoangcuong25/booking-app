import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext()

const DoctorContextProvider = (prors) => {

    const backendUrl = import.meta.env.VITE_BACKEN_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appoitments, setAppointments] = useState()
    const [dashData, setDashData] = useState()
    const [profileData, setProfileData] = useState(false)

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } })

            if (data.success) {
                setAppointments(data.appointments)

            } else {
                toast.error(data.messgae)
            }
        } catch (error) {
            toast.error(error.messgae)
        }
    }

    const completedAppoitment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/completed-appointment', { appointmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.messgae)
        }
    }

    const cancelAppoitment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.messgae)
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.messgae)
        }
    }

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } })
            if (data.success) {
                setProfileData(data.profileData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.messgae)
        }
    }

    const value = {
        dToken, setDToken,
        backendUrl,
        appoitments, setAppointments,
        getAppointments,
        completedAppoitment,
        cancelAppoitment,
        dashData, setDashData,
        getDashData,
        profileData, setProfileData,
        getProfileData
    }

    return (
        <DoctorContext.Provider value={value}>
            {prors.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider