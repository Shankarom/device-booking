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
    const [pagination, setPagination] = useState([])

    const [deviceList, setDeviceList] = useState([]);
    const [deviceId, setDeviceId] = useState("");

    const navigate = useNavigate();

    const addDevice = async (value) => {
        setLoading(true);
        try {
            const data = { name: value.name };
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
        console.log("🚀 ~ getDevices ~ getDevice:", getDevice?.data?.result?.pageDetails)
        if (getDevice.data.success) {
          setDeviceList(getDevice.data.result.results);
          // setPagination(getDevice?.data?.result?.)
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

    const deleteDevice = async (userId) => {
        setDeleteDeviceModal(true);
        setLoading(true);
        try {
          const isDelete = await DeviceService.deleteDevice(userId);
    
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

    return (
        <DeviceContext.Provider
            value={{
                loading,
                deviceList,
                showAddDevice,
                updateDeviceModal,
                pagination,
                setDeviceId,
                addDevice,
                setShowAddDevice,
                getDevices,
                updateDeviceDetails,
                setUpdateDeviceModal,
                deleteDevice
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
