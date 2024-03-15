import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {ManagerService} from '../component/apiServices/managerService'

const managerContext = createContext()

export const ManagerProvider = ({children}) =>{

    const [loading, setLoading] = useState(false)
    const [managerList, setManagerList] = useState([])
    const [showAddManager, setShowAddManger] = useState(false);
    const [managerId, setManagerId] = useState('')
    const [updateManagerModal, setUpdateManagerModal] = useState(false);
    const [assignDeviceManagerModal, setAssignDeviceManagerModal] = useState(false);
    const [deleteManagerModal, setDeleteManagerModal] = useState(true)
    const [pageDetails, setPageDetails] = useState([]);

    const navigate = useNavigate()

    const getManagers = async () => {
        setLoading(true);
        try {
          const getManagers = await ManagerService.getManager();
          if (getManagers.data.success) {
            setManagerList(getManagers.data.result.results);
            setPageDetails(getManagers?.data?.result?.pageDetails)
          } else {
            setManagerList([]);
            toast.error(getManagers.data.message);
          }
        } catch (error) {
          console.log("Error fetching devices:", error);
          toast.error("An error occurred while fetching devices");
        } finally {
          setLoading(false);
        }
    }; 
    const addManagers = async (value) => {
        setLoading(true);
        try {
            const data = { 
              firstName: value.firstName,
              lastName: value.lastName,
              email: value.email,
              deviceId:["65dc1e117275b74abc0a751b"]
             };
            const createDevice = await ManagerService.AddManager(data);
            if (createDevice.data.success == true) {
              setShowAddManger(false);
              navigate("/manager");
              getManagers(); // Assuming you want to fetch devices after adding a new one
              toast.success(createDevice.data.message);
            } else {
                toast.error(createDevice.data.message);
            }
        } catch (error) {
            console.log("Error adding device:", error);
            toast.error("An error occurred while creating the device");
        } finally {
            setLoading(false);
        }
    };
    const updateManagers = async (updatedField, limit, page) =>{
      try{

        setLoading(true)
        const updateManager = await ManagerService.updateManager(updatedField,managerId)
        if(updateManager?.data.success === true){
          setLoading(false)
          setUpdateManagerModal(false)
          toast.success(updateManager?.data?.message)
          getManagers()
        }else{
          setLoading(false);
        }
      }catch (error) {
        console.log("🚀 ~ deleteDevice ~ error:", error)
        if (error.response && error.response.status === 400) {
          setLoading(false);
          setUpdateManagerModal(false);
          // Handle the 400 error specifically
        } else {
          setDeleteDeviceModal(false);
          setLoading(false);
          // Handle other errors
          toast.error("An error occurred while deleting the device");
        }
      }
    }
    const deleteManager = async (managerId) => {
      setDeleteManagerModal(true)
      setLoading(true)
      try{
        const isManagerDelete = await ManagerService.deleteManager(managerId)
        if(isManagerDelete.data.success === true){
          setDeleteManagerModal(false)
          toast.success(isManagerDelete.data.message);
          getManagers(10,1)
        }else if (isManagerDelete.data.success === false){
          setDeleteManagerModal(false)
          toast.error(isManagerDelete?.data?.message);
        }

      } catch (error) {
        console.log("🚀 ~ deleteDevice ~ error:", error)
        if (error.response && error.response.status === 400) {
          setLoading(false);
          setDeleteDeviceModal(false);
          // Handle the 400 error specifically
        } else {
          setDeleteDeviceModal(false);
          setLoading(false);
          // Handle other errors
          toast.error("An error occurred while deleting the device");
        }
      }
    }
    const searchDevice = async(value) =>{
      setLoading(true)
      try {
        let searchResult = await ManagerService.searchManager(value)
        if (searchResult.data.success) {
          setManagerList(searchResult.data.result.results);
          setPageDetails(getManagers?.data?.result?.pageDetails)
        } else {
          setManagerList([]);
          toast.error(searchResult.data.message);
        }
      } catch (error) {
        console.log("Error fetching devices:", error);
        toast.error("An error occurred while fetching devices");
      } finally {
        setLoading(false);
      }

    }
    return(
        <managerContext.Provider
        value={{
            managerList,
            showAddManager,
            managerId,
            updateManagerModal,
            setManagerId,
            updateManagers,
            setDeleteManagerModal,
            deleteManager,
            setShowAddManger,
            addManagers,
            getManagers,
            setUpdateManagerModal,
            searchDevice
        }}
        >
            {children}
        </managerContext.Provider>
    )
}
export const useManagerContext = () => {
    const context = useContext(managerContext);
    if (!context) {
        throw new Error("useManagerContext must be used within a ManagerProvider");
    }
    return context;
};
