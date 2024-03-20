import React, { useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import Input from "../../input";
import Button from "../../button";
import { useDeviceContext } from "../../../context/deviceContext";
import CustomField from "../../input/field";
import { addDeviceInitialValues } from "../../../formik/formikInitialValues";
import { addDeviceSchema } from "../../../formik/formikValidationSchema";

const AddDevice = () => {
  const { addDevice } = useDeviceContext()
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

            <div className="grid !w-full grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col items-start gap-0.5">
                <label htmlFor="name" className="text-[#444] !text-xs">
                  Name <span className="text-red-500">*</span>
                </label>
                <Field
                  placeholder="name"
                  name="name"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  // values={formik.values.name}
                  // onChange={formik.handleChange}
                  onBlur={formik?.handleBlur}
                  onChange={(e) => {
                    var inputValue = e.target.value;
                    if (/^\s/.test(inputValue)) {
                      return;
                    }
                    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                      formik.setFieldValue("name", inputValue);
                    }
                  }}
                />
                {formik.errors.name && formik.touched.name ? (
                  <p className="text-red-500">{formik.errors.name}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="deviceType" className="text-[#444] !text-xs">
                  Type <span className="text-red-500">*</span>
                </label>
                <Field
                  placeholder="deviceType"
                  name="deviceType"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  // values={formik.values.deviceType}
                  // onChange={formik.handleChange}
                  onBlur={formik?.handleBlur}
                  onChange={(e) => {
                    var inputValue = e.target.value;
                    if (/^\s/.test(inputValue)) {
                      return;
                    }
                    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                      formik.setFieldValue("deviceType", inputValue);
                    }
                  }}
                />
                {formik.errors.deviceType && formik.touched.deviceType ? (
                  <p className="text-red-500">{formik.errors.deviceType}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="runningDuration" className="text-[#444] !text-xs">
                  Usage Duration <span className="text-red-500">*</span>
                </label>
                <Field
                  placeholder="runningDuration"
                  name="runningDuration"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  values={formik.values.runningDuration}
                  onChange={formik.handleChange}
                />
                {formik.errors.runningDuration && formik.touched.runningDuration ? (
                  <p className="text-red-500">{formik.errors.runningDuration}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="price" className="text-[#444] !text-xs">
                  Price <span className="text-red-500">*</span>
                </label>
                <Field
                  placeholder="price"
                  name="price"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  // values={formik.values.price}
                  // onChange={formik.handleChange}
                  onBlur={formik?.handleBlur}
                  onChange={(e) => {
                    var inputValue = e.target.value;
                    if (/^\s/.test(inputValue)) {
                      return;
                    }
                    if (/^[0-9\s]*$/.test(inputValue)) {
                      formik.setFieldValue("price", inputValue);
                    }
                  }}
                />
                {formik.errors.price && formik.touched.price ? (
                  <p className="text-red-500">{formik.errors.price}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="description" className="text-[#444] !text-xs">
                  Description <span className="text-red-500"></span>
                </label>
                <Field
                  placeholder="description"
                  name="description"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  // values={formik.values.description}
                  // onChange={formik.handleChange}
                  onBlur={formik?.handleBlur}
                  onChange={(e) => {
                    var inputValue = e.target.value;
                    if (/^\s/.test(inputValue)) {
                      return;
                    }
                    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                      formik.setFieldValue("description", inputValue);
                    }
                  }}
                />
                {formik.errors.description && formik.touched.description ? (
                  <p className="text-red-500">{formik.errors.description}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="purpose" className="text-[#444] !text-xs">
                  Purpose <span className="text-red-500"></span>
                </label>
                <Field
                  placeholder="purpose"
                  name="purpose"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  // values={formik.values.purpose}
                  // onChange={formik.handleChange}
                  onBlur={formik?.handleBlur}
                  onChange={(e) => {
                    var inputValue = e.target.value;
                    if (/^\s/.test(inputValue)) {
                      return;
                    }
                    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                      formik.setFieldValue("purpose", inputValue);
                    }
                  }}
                />
                {formik.errors.purpose && formik.touched.purpose ? (
                  <p className="text-red-500">{formik.errors.purpose}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="location" className="text-[#444] !text-xs">
                  Location <span className="text-red-500">*</span>
                </label>
                <Field
                  placeholder="location"
                  name="location"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  values={formik.values.location}
                  onChange={formik.handleChange}
                />
                {formik.errors.location && formik.touched.location ? (
                  <p className="text-red-500">{formik.errors.location}</p>
                ) : null}
              </div>
            </div>
            <div className="flex justify-center "><Button
              label="Add Device"
              className="bg-black !w-[200px] mt-4 mb-4"
              onClick={formik.handleSubmit} /></div>
            
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default AddDevice