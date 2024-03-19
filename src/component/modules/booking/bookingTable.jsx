import React, { useEffect, useState } from 'react';
import { useDeviceContext } from "../../../context/deviceContext";
import { useBookingContext} from "../../../context/bookingContext"
import DataTable from 'react-data-table-component';
import { FormControlLabel, FormGroup, Switch, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';
import Modal from '../../modal/modal';
import { Field, Formik } from 'formik';
import moment from 'moment';
import { CircularProgress } from "@mui/material";
import { updateVendorSchema } from '../../../formik/formikValidationSchema';
import { useParams, useNavigate } from "react-router-dom";


const BookingTable = () => {
const [limit, setLimit] = useState(10);
const storedLimit = localStorage.getItem("limit");

const [page, setPage] = useState(1);
const [result, setResult] = useState([])
const [existingData, setExistingData] = useState(null);
  

const params = useParams();



const {
    loading,
    getDevices,
    deviceList,
    updateDeviceDetails,
    setUpdateDeviceModal,
    setDeviceId,
    updateDeviceModal,
    deleteDevice,
    pagination,
    getDeviceByMangers,
    setPageDetails,
    pageDetails
  } = useDeviceContext()

  let {getBookingDetails, bookingList} = useBookingContext()

  const initialValues = {
    name: existingData?.name || "",
    // email: existingData?.email || "",
    // phone: existingData?.phone || "",
  };

  const jwt = (localStorage.getItem("token"));
  const BookingListing = bookingList && bookingList?.map((item) => item);

  useEffect(() => {
    if (jwt && params.deviceId) {
        getDeviceByMangers(params.deviceId, limit, page);
    } else if (jwt && (params.deviceId == null || !params.deviceId || params.deviceId == "") ) {
        fetchData(limit, page);
    } 
}, [limit, page, jwt, params.deviceId]);


 const fetchData = (searchKey = "", searchTerm = "") => {
  getBookingDetails(limit, page, searchTerm, searchKey)
};
  const columns = [
    {
      name: "Company",
      selector: (row, index) => (
        <p className="text-xs _2xl:text-base">
      {row?.companyName ? row.companyName.charAt(0).toUpperCase() + row.companyName.slice(1).toLowerCase() : ''}
        </p>
      ),
    },
    {
      name: "Device",
      selector: (row, index) => (
        <p className="text-xs _2xl:text-base">
      {row?.deviceName ? row.deviceName.charAt(0).toUpperCase() + row.deviceName.slice(1).toLowerCase() : ''}
        </p>
      ),
    },
    {
      name: "User",
      selector: (row, index) => (
        <p className=" text-xs _2xl:text-base">
      {row?.userFirstName ? row.userFirstName.charAt(0).toUpperCase() + row.userFirstName.slice(1).toLowerCase() : ''}
        </p>
      ),
    },
    {
      name: "Email",
      selector: (row, index) => (
        <p className="text-xs _2xl:text-base">
      {row?.userEmail}
        </p>
      ),
    },
    {
      name: "Company plan",
      selector: (row, index) => (
      <p className="text-xs _2xl:text-base">
      {row?.licenseName ? row.licenseName.charAt(0).toUpperCase() + row.licenseName.slice(1).toLowerCase() : ''}

        </p>
      ),
    },
    {
      name: "Request time",
      selector: (row, index) => (
      <p className="text-xs _2xl:text-base">
      {moment(row?.updatedAt).format('llll')}

        </p>
      ),
    },
    {
      name: "Booking status",
      selector: (row, index) => (
        <p className="text-xs _2xl:text-base">
       {row?.bookingStatus ? row.bookingStatus.charAt(0).toUpperCase() + row.bookingStatus.slice(1).toLowerCase() : ''}
        </p>
      ),
    },
    // {
    //   name: "Action",
    //   selector: (row) => (
    //     <div className='flex justify-between items-center gap-4'>
    //       <div
    //         className="bg-[#8E5EF9] text-white hover:bg-[#8E5EF9] transition-all duration-300 ease-in-out flex justify-center items-center cursor-pointer text-base uppercase rounded-md p-[7px] 2xl:p-[10px]"
    //         onClick={() => {
    //           setUpdateDeviceModal(true);
    //           setExistingData(row);
    //           setDeviceId(row?.id);
    //         }}
    //       >
    //         <Tooltip
    //           placement="left"
    //           title={<span className="text-base">Edit Device</span>}
    //         >
    //           <Icon icon="mdi:pencil" fontSize={18} />
    //         </Tooltip>
    //       </div>
    //       {/* Status */}
    //       <div
    //         className="bg-[#8E5EF9] text-white hover:bg-[#8E5EF9] transition-all duration-300 ease-in-out flex justify-center items-center cursor-pointer text-base uppercase rounded-md p-[7px] 2xl:p-[10px]"
    //         onClick={async() => {
    //           await deleteDevice(row?.id);
    //         }}
    //       >
    //         <Tooltip
    //           placement="left"
    //           title={<span className="text-base">Delete Device</span>}
    //         >
    //           <Icon icon="ic:outline-auto-delete" fontSize={18} />
    //         </Tooltip>
    //       </div>
    //     </div>
    //   ),
    // },

  ];
  return (
    <>
    <div className="mx-2 ml-[-40px]">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg ">
                <div className="admin-lists orderListing">
                  <DataTable
                    className="events-lists-table"
                    data={BookingListing}
                    columns={columns}
                    striped={true}
                    pagination
                    paginationServer
                    // fixedHeader
                    // highlightOnHover
                    // responsive
                    noDataComponent={<h4>No Device found</h4>}
                    paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                    paginationTotalRows={pageDetails?.totalResults}
                    paginationPerPage={limit}
                    onChangeRowsPerPage={(perPage) => {
                      localStorage.setItem("limit", perPage);
                      // setLimit(parseInt(perPage, 10));                 
                    }}
                    // onChangePage={(page) => {
                    //   setPage(page);
                    // }}

                    progressPending={loading}
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
                  // customStyles={customStyles}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {updateDeviceModal && (
        <Modal
          updateDeviceModal={updateDeviceModal}
          title="Update Device"
          className="w-[10px]"
          closeIcon={() => {
            setUpdateDeviceModal(false);
          }}
          descriptionText={
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={updateVendorSchema}
                onSubmit={(values) => {
                  if (!values || typeof values !== "object") {
                    return;
                  }
                  let changed = {};
                  let i
                  Object.keys(values).forEach((ind) => {
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
                  updateDeviceDetails(changed, limit, page);
                }}
              >
                {(formik) => (
                  <form
                    onSubmit={formik?.handleSubmit}
                    className="mainDiv mt-10"
                  >
                    <div className="email form-group flex items-start flex-col gap-2">
                      <label
                        className="!text-[#333] !text-base !font-normal"
                        htmlFor="name"
                      >
                        Name<span className="text-[#d50000]">*</span>
                      </label>
                      <Field
                        name="name"
                        onBlur={formik.handleBlur}
                        type="text"
                        className="border border-[#DCDCDC] rounded-[4px] !shadow-none !filter-none !text-base"
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^\s/.test(inputValue)) {
                            // e.preventDefault();
                            return;
                          }
                          if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                            formik.setFieldValue("name", inputValue);
                          }
                        }}
                      />
                      {formik?.errors?.name && formik?.touched?.name ? (
                        <p className="text-red-500">{formik?.errors?.name}</p>
                      ) : null}
                    </div>
                    {/* <div className="email form-group flex items-start flex-col gap-2">
                      <label
                        className="!text-[#333] !text-base !font-normal"
                        htmlFor="email"
                      >
                        Email<span className="text-[#d50000]">*</span>
                      </label>
                      <Field
                        name="email"
                        className="border border-[#DCDCDC] rounded-[4px] !shadow-none !filter-none !text-base"
                        type="email"
                      />
                      {formik?.errors?.email && formik?.touched?.email ? (
                        <p className="text-red-500">{formik?.errors?.email}</p>
                      ) : null}
                    </div> */}
                    {/* <div className="email form-group flex items-start flex-col gap-2">
                      <label
                        className="!text-[#333] !text-base !font-normal"
                        htmlFor="phone"
                      >
                        Phone<span className="text-[#d50000]">*</span>
                      </label>
                      <Field
                        name="phone"
                        type="text"
                        className="border border-[#DCDCDC] rounded-[4px] !shadow-none !filter-none !text-base"
                      />
                      {formik?.errors?.phone && formik?.touched?.phone ? (
                        <p className="text-red-500">{formik?.errors?.phone}</p>
                      ) : null}
                    </div> */}
                    <div className="flex items-center flex-col lg:flex-row gap-[10px] mt-4">
                      <button
                        type="button"
                        onClick={() => setUpdateDeviceModal(false)}
                        className="bg-[#fff] rounded-[4px] border !border-[#8E5EF9] shadow-sm hover:!bg-[#8E5EF9] hover:!border-[#8E5EF9] hover:!text-white transition-all duration-300 ease-in-out w-full text-[#8E5EF9] py-[17px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#8E5EF9] rounded-[4px] border border-[#8E5EF9] shadow-sm hover:!bg-[#fff] hover:!border-[#8E5EF9] transition-all hover:!text-[#8E5EF9] duration-300 ease-in-out w-full text-white py-[17px]"
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

export default BookingTable;