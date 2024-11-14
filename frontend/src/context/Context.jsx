import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = "$"
    const backendUrl = import.meta.env.VITE_BACKEN_URL

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')

            console.log(backendUrl + '/api/doctor/list')
            console.log(data.doctors)

            if (data.success) {
                console.log(data.doctors)
                setDoctors(data.doctors)
            } else {
                console.log('sai ')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        doctors, currencySymbol,
        token, setToken,
        backendUrl
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider