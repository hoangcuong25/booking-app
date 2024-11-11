import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (prors) => {

    const value = {

    }

    return (
        <AppContext.Provider value={value}>
            {prors.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider