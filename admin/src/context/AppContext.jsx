import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (prors) => {

    const calulateAge = (dob) => {
        const today = new Date()
        let birtDate = dob.split('-')[0]

        let age = today.getFullYear() - Number(birtDate)

        return age
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev']

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    }

    const value = {
        calulateAge,
        slotDateFormat
    }

    return (
        <AppContext.Provider value={value}>
            {prors.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider