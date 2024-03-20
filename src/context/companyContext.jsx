import {createContext, useContext, useState} from 'react';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import  {CompanyService} from "../component/apiServices/companyService"



const companyContext = createContext()

export const CompanyProvider = ({children}) =>{
    const [showAddCompany, setShowAddCompany] = useState(false)
    const [companyList, setCompanyList] = useState([])
    const [pageDetails, setPageDetails] = useState([]);
    const [loading, setLoading] = useState(false)
    const [updateCompanyModal, setUpdateCompanyModal] = useState(false);
    const [deleteCompanyModal, setDeleteCompanyModal] = useState(true)
    const [companyId, setCompanyId] = useState("")
    const navigate = useNavigate()

    const GetCompany = async (page, limit) =>{
        setLoading(false)
        try{
            const getCompany = await CompanyService.GetCompany(page, limit)
            if(getCompany.data.success === true){
              setCompanyList(getCompany.data.result.results)
                setPageDetails(getCompany?.data?.result?.pageDetails)

            }
            else{
                setCompanyList([])
            toast.error(getCompany.data.message);
            }

        }catch(error){
            toast.error("An error occurred while fetching devices");
        }
    }

    const addCompany = async (value) =>{
        setLoading(true)
        try{
            const data = {
                companyName:value?.companyName,
                companyType:value?.companyType,
                email:value?.email,
                website:value?.website,
                industry:value?.industry,
                founded:value?.founded,
                address:value?.address,
                companyHead:value?.companyHead,
                licenseId:"65ddb036429579c6bd0bb154"

            }
            const createCompany = await CompanyService.AddCompany(data)
            console.log("🚀 ~ addCompany ~ createCompany:", createCompany)
            if(createCompany.data.success === true){
                setShowAddCompany(false)
                navigate("/company")
                GetCompany()
                toast.success(createCompany.data.message);
            }
            else {
                toast.error(createCompany.data.message);
                navigate("/company")
            }
        }catch (error) {
            toast.error("An error occurred while creating the device")
        }
    }

    const updateCompany = async (updateField, limit, page) =>{
        try{
            setLoading(true)
            const updateCompany = await CompanyService.updateCompany(updateField,companyId)
            if (updateCompany?.data.success == true) {
                // closing the update device modal
                setLoading(false);
                setUpdateCompanyModal(false);
                // setUpdatePasswordModal(false);
                // displaying the response message in the toast
                toast.success(updateCompany?.data?.message);
                // refreshing the current page
                GetCompany(10,1)
              } else {
                setLoading(false);
              }

        }catch (error) {
        console.log("🚀 ~ deleteDevice ~ error:", error)
        if (error.response && error.response.status === 400) {
          setLoading(false);
          setUpdateCompanyModal(false);
          // Handle the 400 error specifically
        } else {
            setUpdateCompanyModal(false);
          setLoading(false);
          // Handle other errors
          toast.error("An error occurred while deleting the device");
        }
      }
    }
    const deleteCompany = async (companyId) => {
        console.log("🚀 ~ deleteCompany ~ companyId:", companyId)
        setDeleteCompanyModal(true)
        setLoading(true)
        try{
          const isCompanyDelete = await CompanyService.deleteCompany(companyId)
          console.log("🚀 ~ deleteCompany ~ isCompanyDelete:", isCompanyDelete)
          if(isCompanyDelete.data.success === true){
            setDeleteCompanyModal(false)
            toast.success(isCompanyDelete.data.message);
            GetCompany(10,1)
          }else if (isCompanyDelete.data.success === false){
            setDeleteCompanyModal(false)
            toast.error(isCompanyDelete?.data?.message);
          }
  
        } catch (error) {
          console.log("🚀 ~ deleteDevice ~ error:", error)
          if (error.response && error.response.status === 400) {
            setLoading(false);
            setDeleteCompanyModal(false);
            // Handle the 400 error specifically
          } else {
            setDeleteCompanyModal(false);
            setLoading(false);
            // Handle other errors
            toast.error("An error occurred while deleting the device");
          }
        }
      }
    const searchCompany = async (value) => {
      try{
        const companyData = await CompanyService.companySearching(value)
        if(companyData.data.success == true){
          setCompanyList(companyData.data.result.results)
          setPageDetails(companyData?.data?.result?.pageDetails)
        }
        else{
          setCompanyList([])
          setPageDetails([])
        }


      }catch (error) {
        console.log("Error fetching devices:", error);
        toast.error("An error occurred while fetching devices");
      }
    }
    return(
        <companyContext.Provider
        value={{
            companyList,
            showAddCompany,
            updateCompanyModal,
            pageDetails,
            setPageDetails, 
            deleteCompany,
            setDeleteCompanyModal,
            setCompanyId,
            setUpdateCompanyModal,
            GetCompany,
            addCompany,
            updateCompany,
            setShowAddCompany,
            searchCompany
            
        }}
        >
            {children}
        </companyContext.Provider>
    )
}
export const useCompanyContext = () =>{
    const context = useContext(companyContext)
    if (!context) {
        throw new Error("useManagerContext must be used within a ManagerProvider");
    }
    return context;
}