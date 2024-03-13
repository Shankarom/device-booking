  import React, { useEffect, useState } from 'react';
import { useManagerContext } from "../../../context/managerContext";
import { useCompanyContext } from '../../../context/companyContext';
import DataTable from 'react-data-table-component';
import { CircularProgress, FormControlLabel, FormGroup, Switch, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';
import Modal from '../../modal/modal';
import { Field, Formik,Form } from 'formik';
import { updateCompanySchema } from '../../../formik/formikValidationSchema';
import { customStyles } from '../../../utils/utils';


const CompanyTable = () => {
  const storedLimit = localStorage.getItem("limit");
  
  const [limit, setLimit] = useState(storedLimit || 10);
  const [page, setPage] = useState(1);
  const [existingData, setExistingData] = useState(null);
  const {
    companyList,
    GetCompany,
    loading,
    setLoading,
    updateCompany,
    updateCompanyModal,
    setUpdateCompanyModal,
    setCompanyId,
    deleteCompany,
    pageDetails,
  } = useCompanyContext()

  console.log("pageDetails?.totalResults",pageDetails)

    // getting the jwt token from the localstorage:
    const jwt = (localStorage.getItem("token"));
    // getting the user type from localstorage :
    // const user = JSON.parse(localStorage.getItem("role"));
    // all admins list mapping through api :
    const companyLisiting = companyList && companyList?.map((item) => item);


    useEffect(() => {
      console.log("useEffect called with limit:", limit, "page:", page, "jwt:", jwt);
      if (jwt) {
        GetCompany(limit, page);
      }
  }, [limit, page]);


  const initialValues = {
    companyName: existingData?.companyName || "",
    companyType: existingData?.companyType || "",
    website: existingData?.website || "",
    email: existingData?.email || "",
    address: existingData?.address || "",
    industry: existingData?.industry || "",
    founded: existingData?.founded || "",
    companyHead: existingData?.companyHead || "",
  };

   
    // const fetchData = (searchKey = "", searchTerm = "") => {
    //   getManagers(limit, page, searchTerm, searchKey);
    // };  
    const columns = [
      // {
      //   name: "COMPANY LOGO",
      //   selector: (row, index) => (
      //     <p className="text-xs 2xl:text-base">
      //       {row?.companyLogo}
      //     </p>
      //   ),
      // },
      {
        name: "COMPANY NAME",
        selector: (row, index) => (
          <p className="text-xs 2xl:text-base">
            {row?.companyName}
          </p>
        ),
      },
      {
        name: "COMPANY TYPE",
        selector: (row, index) => (
          <p className="text-xs 2xl:text-base">
            {row?.companyType}
          </p>
        ),
      },
      {
        name: "EMAIL",
        selector: (row, index) => (
          <p className="text-xs 2xl:text-base">
            {row?.email}
          </p>
        ),
      },
      {
        name: "ADDRESS",
        selector: (row, index) => (
          <p className="text-xs 2xl:text-base">
            {row?.address}
          </p>
        ),
      },
      {
        name:"INDUSTRY",
        selector:(row, index) =>(
            <p className='text-as 2xl:text-base'>
                {row?.industry}
            </p>
        )
      },
      {
        name:"COMPANY HEAD",
        selector: (row, index) =>(
            <p className='text-as 2xl:text-base'>
                {row?.companyHead}
            </p>
        )
      },
      {
        name:"ACTIONS",
        selector: (row, index) => (
          <div className='flex justify-between items-center gap-4'>
            <div
          className="bg-[#8E5EF9] text-white hover:bg-[#8E5EF9] transition-all duration-300 ease-in-out flex justify-center items-center cursor-pointer text-base uppercase rounded-md p-[7px] 2xl:p-[10px]"            onClick={() => {
              setUpdateCompanyModal(true);
              setExistingData(row);
              setCompanyId(row?.id);
            }}
          >
            <Tooltip
              placement="left"
              title={<span className="text-base">Edit manager</span>}
            >
              <Icon icon="mdi:pencil" fontSize={18} />
            </Tooltip>
          </div>
          <div
            className="bg-[#8E5EF9] text-white hover:bg-[#8E5EF9] transition-all duration-300 ease-in-out flex justify-center items-center cursor-pointer text-base uppercase rounded-md p-[7px] 2xl:p-[10px]"
            onClick={() => {
              deleteCompany(row?.id);
            }}
          >
            <Tooltip
              placement="left"
              title={<span className="text-base">Edit manager</span>}
            >
              <Icon icon="ic:outline-auto-delete" fontSize={18} />
            </Tooltip>
          </div>
          </div>

        ),
      },      
    ];
  return (
    <>
    <div className="mx-2">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg ">
            <div className="admin-lists orderListing">
              <DataTable
                className="events-lists-table"
                data={[...companyLisiting]}
                columns={columns}
                // striped={true}
                pagination
                paginationServer                
                // fixedHeader
                highlightOnHover
                // responsive
                noDataComponent={<h4>No company found</h4>}
                paginationRowsPerPageOptions={[10, 20, 30, 40]}
                paginationTotalRows={pageDetails?.totalResults}
                paginationPerPage={limit}
                onChangeRowsPerPage={(perPage) => {
                  {console.log("pageDetails?.totalResults",pageDetails?.totalResults)}
                  localStorage.setItem("limit", perPage);
                  // setLimit(parseInt(perPage, 10));                 
                }}
                onChangePage={(page) => {
                  setPage(page);
                }}
                progressPending={loading}
                customStyles={customStyles}
                progressComponent={
                  <CircularProgress
                    size={42}
                    style={{
                      color: "#45267e",
                      display: "flex",
                      justifyContent: "center",
                      height: "90vh",
                      alignItems: "center",
                    }}
                  />
                }
              />
            </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
    {updateCompanyModal && (
        <Modal
        updateCompanyModal={updateCompanyModal}
          title="Update Machine Details"
          closeIcon={() => {
            setUpdateCompanyModal(false);
          }}
          descriptionText={
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={updateCompanySchema}
                onSubmit={(values) => {
                  console.log("🚀  LicenseTable  values:", values)
                  if (!values || typeof values !== "object") {
                    return;
                  }
                  let changed = {}; 
                  let i 
                  Object.keys(values).forEach((ind) => {
                     console.log("🚀  Object.keys  ind:", ind)
                     i = values[ind]
                    if (i !== initialValues?.[ind]) {
                      changed = {
                        ...changed,
                        [ind]: i,
                      };
                    }
                    else if (i == initialValues?.[ind]) {
                      changed = {
                        ...changed,
                        [ind]: i,
                      };
                    }
                  });
                  // Call your update function with the changed values
                  updateCompany(changed, limit, page);
                }}
             

              >
        {(formik) => (
          <Form
           onSubmit={formik.handleSubmit}
           className="mainDiv mt-10 h-auto"
          >
            <div className="grid !w-full grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="companyName" className="text-[#444] !text-xs">
                  Name <span className="text-red-500">*</span>
                </label>
                <Field
                  label="companyName"
                  name="companyName"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  onBlur={formik?.handleBlur}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (/^\s/.test(inputValue)) {
                      // e.preventDefault();
                      return;
                    }
                    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                      formik.setFieldValue("companyName", inputValue);
                    }
                  }}                
                  />
                {formik.errors.companyName && formik.touched.companyName ? (
                  <p className="text-red-500">{formik.errors.companyName}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="companyType" className="text-[#444] !text-xs">
                  Type <span className="text-red-500">*</span>
                </label>
                <Field
                  label="companyType"
                  name="companyType"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  values={formik.values.companyType}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (/^\s/.test(inputValue)) {
                      // e.preventDefault();
                      return;
                    }
                    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                      formik.setFieldValue("companyType", inputValue);
                    }
                  }}                
                  /> 
                {formik.errors.companyType && formik.touched.companyType ? (
                  <p className="text-red-500">{formik.errors.companyType}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="email" className="text-[#444] !text-xs">
                  Email <span className="text-red-500">*</span>
                </label>
                <Field
                  label="email"
                  name="email"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  values={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className="text-red-500">{formik.errors.email}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="address" className="text-[#444] !text-xs">
                  Address <span className="text-red-500">*</span>
                </label>
                <Field
                  label="address"
                  name="address"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  values={formik.values.address}
                  onChange={formik.handleChange}
                />
                {formik.errors.address && formik.touched.address ? (
                  <p className="text-red-500">{formik.errors.address}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="website" className="text-[#444] !text-xs">
                  Website <span className="text-red-500">*</span>
                </label>
                <Field
                  label="website"
                  name="website"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  values={formik.values.website}
                  onChange={formik.handleChange}
                />
                {formik.errors.website && formik.touched.website ? (
                  <p className="text-red-500">{formik.errors.website}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="industry" className="text-[#444] !text-xs">
                  Industry <span className="text-red-500">*</span>
                </label>
                <Field
                  label="industry"
                  name="industry"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  values={formik.values.industry}
                  onChange={formik.handleChange}
                />
                {formik.errors.industry && formik.touched.industry ? (
                  <p className="text-red-500">{formik.errors.industry}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="founded" className="text-[#444] !text-xs">
                  Founded <span className="text-red-500">*</span>
                </label>
                <Field
                  label="founded"
                  name="founded"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  values={formik.values.founded}
                  onChange={formik.handleChange}
                />
                {formik.errors.address && formik.touched.founded ? (
                  <p className="text-red-500">{formik.errors.founded}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="companyHead" className="text-[#444] !text-xs">
                Head <span className="text-red-500">*</span>
                </label>
                <Field
                  label="companyHead"
                  name="companyHead"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  values={formik.values.companyHead}
                  onChange={formik.handleChange}
                />
                {formik.errors.companyHead && formik.touched.companyHead ? (
                  <p className="text-red-500">{formik.errors.companyHead}</p>
                ) : null}
              </div>
            </div>
            <div className="flex items-center flex-col lg:flex-row gap-[10px] mt-4">
                      <button
                        type="button"
                        onClick={() => setUpdateCompanyModal(false)}
                        className="bg-[#fff] rounded-[4px] border !border-[#000000] shadow-sm hover:!bg-[#020202] hover:!border-[#8E5EF9] hover:!text-white transition-all duration-300 ease-in-out w-full text-[#0f0f0f] py-[17px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#141414] rounded-[4px] border border-[#070707] shadow-sm hover:!bg-[#fff] hover:!border-[#000000] transition-all hover:!text-[#080808] duration-300 ease-in-out w-full text-white py-[17px]"
                      >
                        Update
                      </button>
                    </div>
          </Form>
        )}
              </Formik>
            </>
          }
        />
      )}
    </>
    
  );
};

export default CompanyTable;