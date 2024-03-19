import React from "react";
import { Formik, Form, Field } from "formik";
import Button from "../../../button";
import { useManagerContext } from "../../../../context/managerContext";
import {  addManagerInitialValues } from "../../../../formik/formikInitialValues";
import { addDeviceSchema, addManagerSchema } from "../../../../formik/formikValidationSchema";
import Select from "react-select";


const AddManager = () => {
  const { addManagers } = useManagerContext();

  return (
    <div className="">
      <Formik
        initialValues={addManagerInitialValues}
        validationSchema={addManagerSchema}
        onSubmit={(values) => {
          console.log(values)
          addManagers(values);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div className="grid !w-full grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Field */}
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="firstName" className="text-[#444] !text-xs">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Field
                  label="FirstName"
                  name="firstName"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  values={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                {formik.errors.firstName && formik.touched.firstName ? (
                  <p className="text-red-500">{formik.errors.firstName}</p>
                ) : null}
              </div>
              {/* Second Field */}
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="lastName" className="text-[#444] !text-xs">
                last Name <span className="text-red-500">*</span>
                </label>
                <Field
                  label="lastName"
                  name="lastName"
                  type="text"
                  className="!w-full border border-gray-400 text-black !px-5 rounded-md h-[30px]"
                  values={formik.values.lastName}
                  onChange={formik.handleChange}
                />
                {formik.errors.lastName && formik.touched.lastName ? (
                  <p className="text-red-500">{formik.errors.lastName}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="email" className="text-[#444] !text-xs">
                  email <span className="text-red-500">*</span>
                </label>
                <Field
                  label="email"
                  name="email"
                  type="email"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  values={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className="text-red-500">{formik.errors.email}</p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="email" className="text-[#444] !text-xs">
                  Device <span className="text-red-500">*</span>
                </label>
                <Select
                        className="!w-full text-left"
                        placeholder="Select Machine"
                        // options={availableMachinesOptions}
                        name="allotMachine"
                        value={formik?.values?.allotMachine}
                        onChange={(selectedOption) => {
                          formik.setFieldValue("allotMachine", selectedOption);
                        }}
                      
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className="text-red-500">{formik.errors.email}</p>
                ) : null}
              </div>
            </div>
            <Button
              label="Add manager"
              className="bg-black !w-[200px] mt-4 mb-4"
              onClick={formik.handleSubmit}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddManager;
