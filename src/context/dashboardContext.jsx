import {createContext, useContext, useState} from 'react';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { DashboardService } from "../component/apiServices/dashboardService";

const DashboardContext = createContext()

export const DashboardProvider = ({children}) =>{
    const [loading, setLoading] = useState(false)
    const [dashboardData, setDashboardData] = useState([])



    const getDashboardData = async () =>{
        setLoading(true)
        try{
            const DashboardData = await DashboardService.GetDashboardData()
            console.log("🚀 ~ getDashboardData ~ DashboardData:", DashboardData)
            if(DashboardData.data.success === true){
                setDashboardData(DashboardData.data.result)
                // setPageDetails(getCompany?.data?.result?.pageDetails)
    
            }
            else{
                setDashboardData([])
            toast.error(DashboardData.data.message);
            }
    
        }catch(error){
            toast.error("An error occurred while fetching devices");
        }
    }
    return(
        <DashboardContext.Provider
        value={{
            setDashboardData,
            getDashboardData,
            dashboardData
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
