import { createContext } from "react";

export const DoctorContext = createContext()

const DoctorContextProvider = (prors) => {

    const value = {

    }

    return (
        <DoctorContext.Provider value={value}>
            {prors.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider