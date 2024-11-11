import { createContext, useState } from "react";

export const AdminContext = createContext()

const AdminContextProvider = (prors) => {
    const [aToken, setAToketn] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

    const backendUrl = import.meta.env.VITE_BACKEN_URL

    const value = {
        aToken, setAToketn,
        backendUrl,
    }

    return (
        <AdminContext.Provider value={value}>
            {prors.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider