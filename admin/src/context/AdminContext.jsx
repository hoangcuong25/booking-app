import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (prors) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppoitments] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEN_URL

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailablity = async (docId) => {
        try {
            const { data } = await axios.put(backendUrl + "/api/admin/change-availablity", { docId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllDoctors()

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })

            if (data.success) {
                setAppoitments(data.appointments)

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken, setAToken,
        backendUrl,
        doctors,
        getAllDoctors, changeAvailablity,
        appointments, setAppoitments,
        getAllAppointments
    }

    return (
        <AdminContext.Provider value={value}>
            {prors.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider