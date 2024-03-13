import React, { useEffect, useState } from 'react';
import { useLicenseContext } from "../../../context/licenseContext";
import DataTable from 'react-data-table-component';
import { FormControlLabel, FormGroup, Switch, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';
import Modal from '../../modal/modal';
import { Field, Formik } from 'formik';
import { updateVendorSchema } from '../../../formik/formikValidationSchema';


const LicenseTable = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [existingData, setExistingData] = useState(null);
  console.log("🚀  LicenseTable  existingData:", existingData)
  const {
        getLicense,
      licenseList,
      updateLicenseDetails, 
      setUpdateLicenseModal,
      setLicenseId,
      updateLicenseModal,
      deleteLicense
    } = useLicenseContext()

      const initialValues = {
        name: existingData?.name || "",
        companySize: existingData?.companySize || "",
        maxUsers: existingData?.maxUsers || "",
      };
      console.log("🚀  LicenseTable  initialValues:", initialValues)


    // getting the jwt token from the localstorage:
    const jwt = (localStorage.getItem("token"));
    // getting the user type from localstorage :
    // const user = JSON.parse(localStorage.getItem("role"));
    // all admins list mapping through api :
    const licenseLisiting = licenseList && licenseList?.map((item) => item);
    console.log("🚀  LicenseTable  licenseLisiting:", licenseLisiting)


    useEffect(() => {
      console.log("useEffect called with limit:", limit, "page:", page, "jwt:", jwt);
      if (jwt) {
        fetchData();
      }
  }, [limit, page, jwt]);
   
    const fetchData = (searchKey = "", searchTerm = "") => {
      getLicense(limit, page, searchTerm, searchKey);
    };  
    const columns = [
      {
        name: "Name",
        selector: (row, index) => (
          <p className="text-xs 2xl:text-base">
            {row?.name}
          </p>
        ),
      },
      {
        name: "Company Size",
        selector: (row, index) => (
          <p className="text-xs 2xl:text-base">
            {row?.companySize}
          </p>
        ),
      },
      {
        name: "Maximum User",
        selector: (row, index) => (
          <p className="text-xs 2xl:text-base">
            {row?.maxUsers}
          </p>
        ),
      },
      {
        name: "Created",
        selector: (row, index) => (
          <p className="text-xs 2xl:text-base">
            {row?.createdAt}
          </p>
        ),
      },
      {
        name: "Update License",
        selector: (row, index) => (
          <div
            className="bg-[#8E5EF9] text-white hover:bg-[#8E5EF9] transition-all duration-300 ease-in-out flex justify-center items-center cursor-pointer text-base uppercase rounded-md p-[7px] 2xl:p-[10px]"
            onClick={() => {
              setUpdateLicenseModal(true);
              setExistingData(row);
              setLicenseId(row?.id);
            }}
          >
            <Tooltip
              placement="left"
              title={<span className="text-base">Edit License</span>}
            >
              <Icon icon="mdi:pencil" fontSize={18} />
            </Tooltip>
          </div>
        ),
      },
      {
        name: "Delete License",
        selector: (row, index) => (
          <div
            className="bg-[#8E5EF9] text-white hover:bg-[#8E5EF9] transition-all duration-300 ease-in-out flex justify-center items-center cursor-pointer text-base uppercase rounded-md p-[7px] 2xl:p-[10px]"
            onClick={() => {
              deleteLicense(row?.id);
            }}
          >
            <Tooltip
              placement="left"
              title={<span className="text-base">Delete license</span>}
            >
              <Icon icon="ic:outline-auto-delete" fontSize={18} />
            </Tooltip>
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
                data={licenseLisiting}
                columns={columns}
                striped={true}
                pagination
                paginationServer
                fixedHeader
                highlightOnHover
                responsive
                noDataComponent={<h4>No license found</h4>}
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
    {updateLicenseModal && (
        <Modal
          updateLicenseModal={updateLicenseModal}
          title="Update License"
          closeIcon={() => {
            setUpdateLicenseModal(false);
          }}
          descriptionText={
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={updateVendorSchema}
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
                  updateLicenseDetails(changed, limit, page);
                }}
              >
                {(formik) => (
                  <form
                    onSubmit={formik?.handleSubmit}
                    className="mainDiv my-10"
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
                      />
                      {formik?.errors?.name && formik?.touched?.name ? (
                        <p className="text-red-500">{formik?.errors?.name}</p>
                      ) : null}
                    </div>
                    <div className="email form-group flex items-start flex-col gap-2">
                      <label
                        className="!text-[#333] !text-base !font-normal"
                        htmlFor="company size"
                      >
                        Company Size<span className="text-[#d50000]">*</span>
                      </label>
                      <Field
                        name="companySize"
                        className="border border-[#DCDCDC] rounded-[4px] !shadow-none !filter-none !text-base"
                        type="companysize"
                      />
                      {formik?.errors?.companySize && formik?.touched?.companySize ? (
                        <p className="text-red-500">{formik?.errors?.companySize}</p>
                      ) : null}
                    </div>
                    <div className="email form-group flex items-start flex-col gap-2">
                      <label
                        className="!text-[#333] !text-base !font-normal"
                        htmlFor="maximumusers"
                      >
                        Maximum Users<span className="text-[#d50000]">*</span>
                      </label>
                      <Field
                        name="maxUsers"
                        type="text"
                        className="border border-[#DCDCDC] rounded-[4px] !shadow-none !filter-none !text-base"
                      />
                      {formik?.errors?.maxUsers && formik?.touched?.maxUsers ? (
                        <p className="text-red-500">{formik?.errors?.maxUsers}</p>
                      ) : null}
                    </div>
                    <div className="flex items-center flex-col lg:flex-row gap-[10px] mt-4">
                      <button
                        type="button"
                        onClick={() => setUpdateLicenseModal(false)}
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

export default LicenseTable;