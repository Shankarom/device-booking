import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {UserService} from '../component/apiServices/userService'

const userContext = createContext()

export const UserProvider = ({children}) =>{

    const [loading, setLoading] = useState(false)
    const [usersList, setUsersList] = useState([])
    const [updateManagerModal, setUpdateManagerModal] = useState(false);
    const [deleteManagerModal, setDeleteManagerModal] = useState(true)
    const [pageDetails, setPageDetails] = useState([]);

    const getUsers = async (page, limit) => {
        console.log("🚀 ~ getUsers ~ limit:", limit)
        console.log("🚀 ~ getUsers ~ page:", page)
        setLoading(true);
        try {
          const getUsers = await UserService.getUsers(page, limit);
          if (getUsers.data.success) {
            setUsersList(getUsers.data.result.results);
            setPageDetails(getUsers?.data?.result?.pageDetails)
            // toast.success(getUsers.data.message);
          } else {
            setUsersList([]);
            toast.error(getUsers.data.message);
          }
        } catch (error) {
          console.log("Error fetching devices:", error);
          toast.error("An error occurred while fetching devices");
        } finally {
          setLoading(false);
        }
      };

      const getCompanyUsers = async (
        companyId,
        limit,
        page
      ) => {
        try {
          // Assuming getOrderByDate returns a promise
          const getCompanyAssociatedUsers =
          await UserService.getCompanyAssociatedUsers({
            companyId,
            limit,
            page,
          });
          // console.log("🚀 ~ DeviceProvider ~ getCompanyAssociatedUsers:", getCompanyAssociatedUsers)
          if (getCompanyAssociatedUsers.data.success == true) {
            // setMachineOrders(getCompanyAssociatedUsers?.data?.result?.results);
            setUsersList(getCompanyAssociatedUsers?.data?.result?.results);
            // setPageDetails(getCompanyAssociatedUsers.data.pageDetails);
          } else {
            // setMachineOrders([]);
            setUsersList([]);
            // setPageDetails(null);
          }
        } catch (error) {
          // Handle errors
          console.error("Error fetching orders between dates:", error);
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
    const getUserListBySearch =  async (value) =>{
      setLoading(false)
      try{
          const userList =  await UserService.getUserListBySearch(value)
          if(userList.data.success == true){
           setUsersList(userList.data.result.results);
          //  setPageDetails(userList?.data?.result?.pageDetails)
      }
     }
     catch (error) {
      toast.error("An error occurred while fetching devices");
    }
  }
    return(
        <userContext.Provider
        value={{
            usersList,
            updateManagerModal,
            pageDetails,
            updateManagers,
            setDeleteManagerModal,
            deleteManager,
            getUsers,
            setUpdateManagerModal,
            getCompanyUsers,
            getUserListBySearch
        }}
        >
            {children}
        </userContext.Provider>
    )
}
export const useUserContext = () => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("useManagerContext must be used within a UserProvider");
    }
    return context;
};
