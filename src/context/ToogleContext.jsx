import { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

export const ToggleContextProvider = ({ children }) => {
    const [show, setShow] = useState(true);
    return (
        <ToggleContext.Provider value={{ show, setShow }}>
            {children}
        </ToggleContext.Provider>
    );
};

export const useToggleContext = () => {
    const context = useContext(ToggleContext);
    return context;
};
