import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {LicenseService} from '../component/apiServices/licenseService'
const LicenseContext = createContext()


export const LicenseProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [showAddLicense, setShowAddLicense] = useState(false);
    const [updateLicenseModal, setUpdateLicenseModal] = useState(false);
    const [deleteLicenseModal, setDeleteLicenseModal] = useState(false);

    const [licenseList, setlicenseList] = useState([]);
    const [licenseId, setLicenseId] = useState("");

    const navigate = useNavigate();

    const addLicense = async (value) => {
        console.log("🚀  addLicense  value:", value)
        setLoading(true);
        try {
            const data = { name: value.name, companySize: value.companySize, maxUsers: value.maxUsers };
            console.log("🚀  addLicense  data:", data)
            const createLicense = await LicenseService.addLicense(data);
            if (createLicense.data.success) {
                setShowAddLicense(false);
                navigate("/license");
                getLicense(); // Assuming you want to fetch devices after adding a new one
                toast.success(createLicense.data.message);
            } else {
                toast.error(createLicense.data.message);
            }
        } catch (error) {
            console.log("Error adding license:", error);
            toast.error("An error occurred while creating the license");
        } finally {
            setLoading(false);
        }
    };

    const getLicense = async () => {
      setLoading(true);
      try {
        const getDevice = await LicenseService.getLicense();
        if (getDevice.data.success) {
          setlicenseList(getDevice.data.result);
          // toast.success(getDevice.data.message);
        } else {
          setlicenseList([]);
          toast.error(getDevice.data.message);
        }
      } catch (error) {
        console.log("Error fetching license:", error);
        toast.error("An error occurred while fetching license");
      } finally {
        setLoading(false);
      }
    };
    

    const updateLicenseDetails = async (updatedFields, limit, page) => {
        setLoading(true);
        // calling the AuthService for update the device details and sending the required values and vendorId to the payload:
        const updateDetails = await LicenseService.updateLicense(
          updatedFields,
          licenseId
        );
        // if the api return true or 200 then doing the further process:
        if (updateDetails?.data.success == true) {
          // closing the update device modal
          setLoading(false);
          setUpdateLicenseModal(false);
          // setUpdatePasswordModal(false);
          // displaying the response message in the toast
          toast.success(updateDetails?.data?.message);
          // refreshing the current page
          // getLicense(5, 1);
          getLicense(10,1)
        } else {
          setLoading(false);
          // toast.error(updateDetails?.data?.message);
        }
    };
    const getLicenseList = async (limit, page) => {
        // calling the AuthService for getting the device list:
        const getVendorList = await AuthService.getVendors({
          params: {
            pageSize: limit,
            page: page,
          },
        });
    }

    const deleteLicense = async (licenseId) => {
        setDeleteLicenseModal(true);
        setLoading(true);
        try {
          const isDelete = await LicenseService.deleteLicense(licenseId);
    
          if (isDelete.data.success === true) {
            setDeleteLicenseModal(false);
            toast.success(isDelete.data.message);
            getLicense(10,1)
          } else if (isDelete.data.success === false) {
            setDeleteLicenseModal(false);
            toast.error(isDelete?.data?.message);
          }
        } catch (error) {
          console.log("🚀  deleteLicense  error:", error)
          if (error.response && error.response.status === 400) {
            setLoading(false);
            setDeleteLicenseModal(false);
            // Handle the 400 error specifically
          } else {
            setDeleteLicenseModal(false);
            setLoading(false);
            // Handle other errors
            toast.error("An error occurred while deleting the device");
          }
        }
      };

    return (
        <LicenseContext.Provider
            value={{
                loading,
                licenseList,
                showAddLicense,
                updateLicenseModal,
                setLicenseId,
                addLicense,
                setShowAddLicense,
                getLicense,
                getLicenseList,
                updateLicenseDetails,
                setUpdateLicenseModal,
                deleteLicense
            }}
        >
            {children}
        </LicenseContext.Provider>
    );
};

export const useLicenseContext = () => {
    const context = useContext(LicenseContext);
    if (!context) {
        throw new Error("useLicenseContext must be used within a LicenseProvider");
    }
    return context;
};