import React, { useEffect, useState } from 'react';
import { useManagerContext } from "../../../../context/managerContext";
import DataTable from 'react-data-table-component';
import { FormControlLabel, FormGroup, Switch, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';
import Modal from '../../../modal/modal';
import { Link } from "react-router-dom";
import { Field, Formik } from 'formik';


const ManagerTable = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [existingData, setExistingData] = useState(null);
  const {
      getManagers,
      managerList,
      setManagerId,
      updateManagers,
      setUpdateManagerModal,
      updateManagerModal,
      deleteManager
    } = useManagerContext()



    // getting the jwt token from the localstorage:
    const jwt = (localStorage.getItem("token"));
    // getting the user type from localstorage :
    // const user = JSON.parse(localStorage.getItem("role"));
    // all admins list mapping through api :
    const managerLisiting = managerList && managerList?.map((item) => item);
    console.log("🚀 ~ ManagerTable ~ managerLisiting:", managerLisiting)


    useEffect(() => {
      console.log("useEffect called with limit:", limit, "page:", page, "jwt:", jwt);
      if (jwt) {
        getManagers();
      }
  }, [limit, page, jwt]);

  const initialValues = {
    firstName: existingData?.firstName || "",
    lastName: existingData?.lastName || "",
    email: existingData?.email || "",
    // password : " "
  };

  const renderDevices = (devices) => {
    return devices.map((device) => device.name).join(', ');
  };
    // const fetchData = (searchKey = "", searchTerm = "") => {
    //   getManagers(limit, page, searchTerm, searchKey);
    // };  
    const columns = [
      {
        name: "FIRST NAME",
        selector: (row, index) => (
          <p className="text-xs 2xl:text-base">
            {row?.firstName}
          </p>
        ),
      },
      {
        name: "LAST NAME",
        selector: (row, index) => (
          <p className="text-xs 2xl:text-base">
            {row?.lastName}
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
        name: "DEVICES",
        selector: (row, index) => (
          <p className="text-xs 2xl:text-base">
            {renderDevices(row?.deviceId)}
          </p>
        ),
      },
      {
        name: "View Devices",
        selector: (row, index) => (
          <Link
            to={`/${row?.id}/device`}
            // onClick={() => {
            //   localStorage.setItem(machineLocation, row?.location);
            //   localStorage.setItem(imeiMachine, JSON.stringify(row?.machineImei));
            //   // localStorage.removeItem("vendor_name");
            // }}
            className="bg-[#4992FF] text-white hover:bg-[#4992FF] transition-all duration-300 ease-in-out flex justify-center items-center text-base uppercase rounded-md p-[7px] 2xl:p-[10px]"
          >
            <Tooltip
              placement="bottom"
              title={
                <span className="text-base">
                  Click here to see 's all orders for this machine(
                  {/* {row?.machineImei}) */}
                </span>
              }
            >
              <Icon icon="mdi:eye" fontSize={18} />
            </Tooltip>
          </Link>
        ),
      },
      {
        name: "ACTION",
        selector: (row, index) => (
          <div className='flex justify-between items-center gap-4'>
            <div
            className="bg-[#8E5EF9] text-white hover:bg-[#8E5EF9] transition-all duration-300 ease-in-out flex justify-center items-center cursor-pointer text-base uppercase rounded-md p-[7px] 2xl:p-[10px]"
            onClick={() => {
              setUpdateManagerModal(true);
              
              console.log("_______________________setExistingData(row)", setExistingData(row))
              setExistingData(row);
              setManagerId(row?.id);
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
              deleteManager(row?.id);
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
        )
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
                data={managerLisiting}
                columns={columns}
                striped={true}
                pagination
                paginationServer
                fixedHeader
                highlightOnHover
                responsive
                noDataComponent={<h4>No Device found</h4>}
                paginationRowsPerPageOptions={[10, 20, 40, 80, 100]}
                // paginationTotalRows={pageDetails?.noOfRecords}
                paginationPerPage={limit}
                onChangeRowsPerPage={(perPage) => {
                  setLimit(perPage);
                }}
                onChangePage={(page) => {
                  setPage(page);
                }}
                // progressPending={loading}
                // customStyles={customStyles}
              />
            </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
    {updateManagerModal && (
        <Modal
        updateManagerModal={updateManagerModal}
          title="Update Manager"
          closeIcon={() => {
            setUpdateManagerModal(false);
          }}
          descriptionText={
            <>
              <Formik
                initialValues={initialValues}
                // validationSchema={updateManagerSchema}
                onSubmit={(values) => {
                  if (!values || typeof values !== "object") {
                    return;
                  }
                  let changed = {};
                  Object.keys(values).forEach((ind) => {
                    const i = values[ind];
                    if (i !== initialValues?.[ind]) {
                      changed = {
                        ...changed,
                        [ind]: i,
                      };
                    }
                  });
                  updateManagers(changed, limit, page);
                }}
              >
                {(formik) => (
                  <form
                    onSubmit={formik?.handleSubmit}
                    className="mainDiv my-10"
                  >
                    <div className="email form-group flex items-start flex-col gap-2 mt-[12px]">
                      <label
                        className="!text-[#333] !text-base !font-normal"
                        htmlFor="firstName"
                      >
                       First Name<span className="text-[#d50000]">*</span>
                      </label>
                      <Field
                        name="firstName"
                        onBlur={formik.handleBlur}
                        type="text"
                        className="border border-[#2e2a2a] rounded-[8px] !shadow-none !filter-none !text-base text-black -mt-1 pl-2"
                      />
                      {/* {formik?.errors?.firstName && formik?.touched?.firstName ? (
                        <p className="text-red-500">{formik?.errors?.firstName}</p>
                      ) : null} */}
                    </div>
                    <div className="form-group flex items-start flex-col gap-2 mt-[12px]">
                      <label
                        className="!text-[#1f1d1d] !text-base !font-normal"
                        htmlFor="lastName"
                      >
                        last Name<span className="text-[#d50000]">*</span>
                      </label>
                      <Field
                        name="lastName"
                        className="border border-[#2e2a2a] rounded-[8px] !shadow-none !filter-none !text-base text-black -mt-1 pl-2"
                        type="text"
                      />
                      {/* {formik?.errors?.lastName && formik?.touched?.lastName ? (
                        <p className="text-red-500">{formik?.errors?.lastName}</p>
                      ) : null} */}
                    </div>
                    <div className="email form-group flex items-start flex-col gap-2 mt-[12px]">
                      <label
                        className="!text-[#333] !text-base !font-normal"
                        htmlFor="email"
                      >
                        email<span className="text-[#d50000]">*</span>
                      </label>
                      <Field
                        name="email"
                        type="text"
                        className="border border-[#2e2a2a] rounded-[8px] !shadow-none !filter-none !text-base text-black -mt-1 pl-2"
                      />
                      {/* {formik?.errors?.email && formik?.touched?.email ? (
                        <p className="text-red-500">{formik?.errors?.email}</p>
                      ) : null} */}
                    </div>
                    <div className="email form-group flex items-start flex-col gap-2 mt-[12px]">
                      <label
                        className="!text-[#333] !text-base !font-normal"
                        htmlFor="password"
                      >
                        password<span className="text-[#d50000] ">*</span>
                      </label>
                      <Field
                        name="password"
                        type="text"
                        className="border border-[#2e2a2a] rounded-[8px] !shadow-none !filter-none !text-base -mt-1 pl-2"
                      />
                      {/* {formik?.errors?.password && formik?.touched?.password ? (
                        <p className="text-red-500">{formik?.errors?.password}</p>
                      ) : null} */}
                    </div>
                    <div className="flex items-center flex-col lg:flex-row gap-[10px] mt-4">
                      <button
                        type="button"
                        onClick={() => setUpdateManagerModal(false)}
                        className="bg-[#fff] rounded-[4px] border !border-[#141314] shadow-sm hover:!bg-[#8E5EF9] hover:!border-[#8E5EF9] hover:!text-white transition-all duration-300 ease-in-out w-full text-[#070707] py-[17px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#000000] rounded-[4px] border border-[#0a0a0a] shadow-sm hover:!bg-[#fff] hover:!border-[#020202] transition-all hover:!text-[#030303] duration-300 ease-in-out w-full text-white py-[17px]"
                        onSubmit={formik?.handleSubmit}
                      >
                        Update
                      </button>
                    </div>
                    
                  </form>
                )}
              </Formik>
            </>
          }
        />
      )}
    </>
    
  );
};

export default ManagerTable;