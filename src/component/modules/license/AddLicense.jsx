import React, { useState } from "react";
import { Formik, Form, Field,useFormik } from "formik";
import Input from "../../input";
import Button from "../../button";
import { useLicenseContext } from "../../../context/licenseContext";
import CustomField from "../../input/field";
import { addLicenseInitialValues } from "../../../formik/formikInitialValues";
import { addLicenseSchema } from "../../../formik/formikValidationSchema";

const AddLicense = () => {
  const {addLicense} = useLicenseContext()
  return (
      <div className="">
        <Formik 
        initialValues={addLicenseInitialValues}
        validationSchema={addLicenseSchema} 
        onSubmit={(values) => {
        addLicense(values)
        }}>
          {(formik) => (
                        <Form onSubmit={formik.handleSubmit}>
                        <div className="grid !w-full grid-cols-1">
                          <div className="flex !w-full flex-col items-start gap-1">
                            <label htmlFor="name" className="text-[#444] !text-xs">License Name <span className="text-red-500">*</span></label>
                          <Field
                            label="License Name"
                            name="name"
                            type="text"
                            className="!w-1/2 border border-gray-400 text-black px-2 rounded-md h-[30px]"
                            values={formik.values.name}
                            onChange={formik.handleChange}/>
                            {formik.errors.name && formik.touched.name ? <p className="text-red-500">{formik.errors.name}</p> : null}
                            
                          </div>
                          <div className="flex !w-full flex-col items-start gap-1">
                            <label htmlFor="name" className="text-[#444] !text-xs">Company Size <span className="text-red-500">*</span></label>
                          <Field
                            label="Company Name"
                            name="companySize"
                            type="text"
                            className="!w-1/2 border border-gray-400 text-black px-2 rounded-md h-[30px]"
                            values={formik.values.companySize}
                            onChange={formik.handleChange}/>
                            {formik.errors.companySize && formik.touched.companySize ? <p className="text-red-500">{formik.errors.companySize}</p> : null}
                            
                          </div>
                          <div className="flex !w-full flex-col items-start gap-1">
                            <label htmlFor="name" className="text-[#444] !text-xs">Maximum Users <span className="text-red-500">*</span></label>
                          <Field
                            label="Maximum Users"
                            name="maxUsers"
                            type="text"
                            className="!w-1/2 border border-gray-400 text-black px-2 rounded-md h-[30px]"
                            values={formik.values.maxUsers}
                            onChange={formik.handleChange}/>
                            {formik.errors.maxUsers && formik.touched.maxUsers ? <p className="text-red-500">{formik.errors.maxUsers}</p> : null}
                            
                          </div>
                        </div>
                        <Button
                          label="Add License"
                          className="bg-black !w-[200px] mt-4 mb-4"
                          onClick={formik.handleSubmit}/>
                      </Form>
          )}
        </Formik>
      </div>
  );
};
export default AddLicense