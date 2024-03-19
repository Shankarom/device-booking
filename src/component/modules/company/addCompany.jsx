import React from "react";
import { Formik, Form, Field } from "formik";
import Button from "../../button/index";
import { useCompanyContext } from "../../../context/companyContext";
import { addCompanyInitialValues } from "../../../formik/formikInitialValues";
import { addCompanySchema } from "../../../formik/formikValidationSchema";

const AddCompany = () => {
  const { addCompany } = useCompanyContext();
  return (
    <div className="">
      <Formik
        initialValues={addCompanyInitialValues}
        validationSchema={addCompanySchema}
        onSubmit={(values) => {
          console.log("🚀 ~ AddCompany ~ values:", values)
          addCompany(values);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div className="grid !w-full grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="companyName" className="text-[#444] !text-xs">
                  Name <span className="text-red-500">*</span>
                </label>
                <Field
                  label="companyName"
                  name="companyName"
                  type="text"
                  className="!w-full border border-gray-400 text-black px-2 rounded-md h-[30px]"
                  values={formik.values.companyName}
                  onChange={formik.handleChange}
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
                  onChange={formik.handleChange}
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
            <Button
              label="Add Company"
              className="bg-black !w-[200px] mt-4 mb-4"
              onClick={formik.handleSubmit}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCompany;
