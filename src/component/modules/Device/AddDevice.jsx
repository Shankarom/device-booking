import React, { useState } from "react";
import { Formik, Form, Field,useFormik } from "formik";
import Input from "../../input";
import Button from "../../button";
import { useDeviceContext } from "../../../context/deviceContext";
import CustomField from "../../input/field";
import { addDeviceInitialValues } from "../../../formik/formikInitialValues";
import { addDeviceSchema } from "../../../formik/formikValidationSchema";

const AddDevice = () => {
  const {addDevice} = useDeviceContext()
  return (
      <div className="">
        <Formik 
        initialValues={addDeviceInitialValues}
        validationSchema={addDeviceSchema} 
        onSubmit={(values) => {
        addDevice(values)
        }}>
          {(formik) => (
                        <Form onSubmit={formik.handleSubmit}>
                        <div className="grid !w-full grid-cols-1">
                          <div className="flex !w-full flex-col items-start gap-1">
                            <label htmlFor="deviceName" className="text-[#444] !text-xs">Device Name <span className="text-red-500">*</span></label>
                          <Field
                            label="Device Name"
                            name="name"
                            type="text"
                            className="!w-1/2 border border-gray-400 text-black px-2 rounded-md h-[30px]"
                            values={formik.values.deviceName}
                            onChange={formik.handleChange}/>
                            {formik.errors.deviceName && formik.touched.deviceName ? <p className="text-red-500">{formik.errors.deviceName}</p> : null}
                            
                          </div>
                          
                          
                        </div>
                        <Button
                          label="Add Device"
                          className="bg-black !w-[200px] mt-4 mb-4"
                          onClick={formik.handleSubmit}/>
                      </Form>
          )}
        </Formik>
      </div>
  );
};
export default AddDevice