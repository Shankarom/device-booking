import React, { useEffect, useState } from 'react';
import { useDeviceContext } from "../../../context/deviceContext";
import DataTable from 'react-data-table-component';
import { FormControlLabel, FormGroup, Switch, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';
import Modal from '../../modal/modal';
import { Field, Formik } from 'formik';
import moment from 'moment';
import { updateVendorSchema } from '../../../formik/formikValidationSchema';


const DeviceTable = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [existingData, setExistingData] = useState(null);
  const {
    loading,
    getDevices,
    deviceList,
    updateDeviceDetails,
    setUpdateDeviceModal,
    setDeviceId,
    updateDeviceModal,
    deleteDevice,
    pagination
  } = useDeviceContext()

  const initialValues = {
    name: existingData?.name || "",
    // email: existingData?.email || "",
    // phone: existingData?.phone || "",
  };


  // getting the jwt token from the localstorage:
  const jwt = (localStorage.getItem("token"));
  // getting the user type from localstorage :
  // const user = JSON.parse(localStorage.getItem("role"));
  // all admins list mapping through api :
  const deviceLisiting = deviceList && deviceList?.map((item) => item);
  console.log("🚀 ~ DeviceTable ~ deviceLisiting:", deviceLisiting)


  useEffect(() => {
    console.log("useEffect called with limit:", limit, "page:", page, "jwt:", jwt);
    if (jwt) {
      fetchData(limit, page);
    }
  }, [limit, page, jwt]);

  const fetchData = (searchKey = "", searchTerm = "") => {
    getDevices(limit, page, searchTerm, searchKey);
  };
  const columns = [
    {
      name: "NAME",
      selector: (row, index) => (
        <p className="text-xs 2xl:text-base">
          {row?.name}
        </p>
      ),
    },
    {
      name: "DEVICE TYPE",
      selector: (row, index) => (
        <p className="text-xs 2xl:text-base">
          {row?.deviceType}
        </p>
      ),
    },
    {
      name: "LAST ACTIVE",
      selector: (row, index) => (
        <p className="text-xs 2xl:text-base">
          {moment(row?.updatedAt).format('lll')}
        </p>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className='flex justify-between items-center gap-4'>
          <div
            className="bg-[#8E5EF9] text-white hover:bg-[#8E5EF9] transition-all duration-300 ease-in-out flex justify-center items-center cursor-pointer text-base uppercase rounded-md p-[7px] 2xl:p-[10px]"
            onClick={() => {
              setUpdateDeviceModal(true);
              setExistingData(row);
              setDeviceId(row?.id);
            }}
          >
            <Tooltip
              placement="left"
              title={<span className="text-base">Edit Device</span>}
            >
              <Icon icon="mdi:pencil" fontSize={18} />
            </Tooltip>
          </div>
          {/* Status */}
          <div
            className="bg-[#8E5EF9] text-white hover:bg-[#8E5EF9] transition-all duration-300 ease-in-out flex justify-center items-center cursor-pointer text-base uppercase rounded-md p-[7px] 2xl:p-[10px]"
            onClick={async() => {
              await deleteDevice(row?.id);
            }}
          >
            <Tooltip
              placement="left"
              title={<span className="text-base">Delete Device</span>}
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
                    data={deviceLisiting}
                    columns={columns}
                    striped={true}
                    pagination
                    paginationServer
                    // fixedHeader
                    // highlightOnHover
                    // responsive
                    noDataComponent={<h4>No Device found</h4>}
                    paginationRowsPerPageOptions={[20, 30, 40, 80, 100]}
                    paginationTotalRows={pagination?.totalResults}
                    paginationPerPage={limit}
                    onChangeRowsPerPage={(perPage) => {
                      setLimit(perPage);
                    }}
                    onChangePage={(page) => {
                      setPage(page);
                    }}

                    progressPending={loading}
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

export default DeviceTable;