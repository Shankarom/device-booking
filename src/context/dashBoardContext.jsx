import {createContext, useContext, useState} from 'react';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { DashboardService } from "../component/apiServices/dashBoardService";

const DashboardContext = createContext()

export const DashboardProvider = ({children}) =>{
    const [loading, setLoading] = useState(false)
    const [deviceCount, setDeviceCount] = useState([])
    const [bookinglist, setBookinglist] = useState([])



    const getDashboardDevice = async () =>{
        setLoading(false)
        try{
            const DashboardDevice = await DashboardService.DashboardDevice()
            if(DashboardDevice.data.success === true){
                setDeviceCount(DashboardDevice.data.result.device)
                setBookinglist(DashboardDevice.data.result.bookingDetails)
                // setPageDetails(getCompany?.data?.result?.pageDetails)
    
            }
            else{
                setDeviceCount([])
            toast.error(DashboardDevice.data.message);
            }
    
        }catch(error){
            toast.error("An error occurred while fetching devices");
        }
    }
    return(
        <DashboardContext.Provider
        value={{
            setDeviceCount,
            getDashboardDevice,
            deviceCount,
            bookinglist
        }}
        >
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () =>{
    const context = useContext(DashboardContext)
    if (!context) {
        throw new Error("useManagerContext must be used within a ManagerProvider");
    }
    return context;
}
