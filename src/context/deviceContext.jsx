import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {DeviceService} from '../component/apiServices/deviceService'
const DeviceContext = createContext()


export const DeviceProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [showAddDevice, setShowAddDevice] = useState(false);
    const [updateDeviceModal, setUpdateDeviceModal] = useState(false);
    const [deleteDeviceModal, setDeleteDeviceModal] = useState(false);
    const [pageDetails, setPageDetails] = useState([]);
    const [deviceList, setDeviceList] = useState([]);
    const [deviceId, setDeviceId] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();

    const addDevice = async (value) => {
        setLoading(true);
        try {
            const data = { name: value.name,
              deviceType: value.deviceType,
              runningDuration: value.runningDuration,
              price: value.price,
              location: value.location,
              description: value.description,
              purpose: value.purpose
            };
            const createDevice = await DeviceService.AddDevice(data);
            if (createDevice.data.success) {
                setShowAddDevice(false);
                navigate("/device");
                getDevices(); // Assuming you want to fetch devices after adding a new one
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
    const getDevices = async () => {
      setLoading(true);
      try {
        const getDevice = await DeviceService.getDevice();
        if (getDevice.data.success) {
          setDeviceList(getDevice.data.result.results);
          setPageDetails(getDevice?.data?.result?.pageDetails)
          // toast.success(getDevice.data.message);
        } else {
          setDeviceList([]);
          toast.error(getDevice.data.message);
        }
      } catch (error) {
        console.log("Error fetching devices:", error);
        toast.error("An error occurred while fetching devices");
      } finally {
        setLoading(false);
      }
    };
    const updateDeviceDetails = async (updatedFields, limit, page) => {
      try{
        setLoading(true);
        // calling the AuthService for update the device details and sending the required values and vendorId to the payload:
        const updateDetails = await DeviceService.updateDevice(
          updatedFields,
          deviceId
        );
        // if the api return true or 200 then doing the further process:
        if (updateDetails?.data.success == true) {
          // closing the update device modal
          setLoading(false);
          setUpdateDeviceModal(false);
          // setUpdatePasswordModal(false);
          // displaying the response message in the toast
          toast.success(updateDetails?.data?.message);
          // refreshing the current page
          // getDevices(5, 1);
          getDevices(10,1)
        } else {
          setLoading(false);
          // toast.error(updateDetails?.data?.message);
        }
      }catch (error) {
        if (error.response && error.response.status === 400) {
          setLoading(false);
          setUpdateDeviceModal(false);
          // Handle the 400 error specifically
        } else {
          setUpdateDeviceModal(false);
          setLoading(false);
          // Handle other errors
          toast.error("An error occurred while deleting the device");
        }
      }
    };
    const getDevicesList = async (limit, page) => {
        // calling the AuthService for getting the device list:
        const getVendorList = await AuthService.getVendors({
          params: {
            pageSize: limit,
            page: page,
          },
        });
    }
    const deleteDevice = async (deviceId) => {
        setDeleteDeviceModal(true);
        setLoading(true);
        try {
          const isDelete = await DeviceService.deleteDevice(deviceId);
    
          if (isDelete.data.success === true) {
            setDeleteDeviceModal(false);
            toast.success(isDelete.data.message);
            getDevices(10,1)
          } else if (isDelete.data.success === false) {
            setDeleteDeviceModal(false);
            toast.error(isDelete?.data?.message);
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
      };
    const getDeviceByMangers = async (
        managerId,
        limit,
        page
      ) => {
        try {
          // Assuming getOrderByDate returns a promise
          const getDeviceByManager = await DeviceService.getDeviceByManager({ managerId, pageSize: limit, page, });
          console.log("🚀 ~ DeviceProvider ~ getDeviceByManager:", getDeviceByManager)
          if (getDeviceByManager.data.success == true) {
            // setMachineOrders(getVendorAndMachineOrder?.data?.result?.results);
            setDeviceList(getDeviceByManager?.data?.result?.results);
            setManagerDevice(getDeviceByManager?.data?.result?.results)
          } else {
            // setMachineOrders([]);
            setDeviceList([]);
          }
        } catch (error) {
          // Handle errors
          console.error("Error fetching orders between dates:", error);
        }
      };
    const searchDevice = async(value) =>{
      try{
        const deviceData = await DeviceService.deviceSearching(value)
        if(deviceData.data.success == true){
          setDeviceList(deviceData.data.result.results)
          setPageDetails(deviceData?.data?.result?.pageDetails)

        }
        else{
          setSearchResults([])
        }
      }catch (error) {
        console.log("Error fetching devices:", error);
        toast.error("An error occurred while fetching devices");
      }
    }

  
  

    return (
        <DeviceContext.Provider
            value={{
                loading,
                deviceList,
                showAddDevice,
                updateDeviceModal,
                pageDetails,
                searchResults,
                setPageDetails,
                setDeviceId,
                addDevice,
                setShowAddDevice,
                getDevices,
                updateDeviceDetails,
                setUpdateDeviceModal,
                deleteDevice,
                getDeviceByMangers,
                searchDevice,
                
            }}
        >
            {children}
        </DeviceContext.Provider>
    );
};

export const useDeviceContext = () => {
    const context = useContext(DeviceContext);
    if (!context) {
        throw new Error("useDeviceContext must be used within a DeviceProvider");
    }
    return context;
};
