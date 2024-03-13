import * as Yup from 'yup';
import { PHONE_REGEX } from '../utils/utils';

export const addDeviceSchema = Yup.object().shape({
    name: Yup.string().required('Name is required')
})
export const updateVendorSchema = Yup.object({
    name: Yup.string().required("Name is required"),
  });
export const addManagerSchema = Yup.object({
    firstName:Yup.string().required("firstName is required"),
    lastName: Yup.string().required("lastName is required"),
     email:Yup.string().required("email is required")
})

export const updateManagerSchema = Yup.object({
  firstName:Yup.string().required("firstName is required"),
  lastName: Yup.string().required("lastName is required"),
   email:Yup.string().required("email is required")
})

export const addCompanySchema = Yup.object({
  companyName:Yup.string().required("Company name is required"),
  companyType:Yup.string().required("Company type is required"), 
  website:Yup.string().required("Website is required"),
  email: Yup.string().required("Email is required"), 
  address:Yup.string().required("Address is required"), 
  // companyLogo:Yup.string().required("Company logo is required"), 
  industry:Yup.string().required("Industry is required"),
  founded:Yup.string().required("Founded is required"),
  companyHead:Yup.string().required("Company head is required"),
})

export const updateCompanySchema = Yup.object({
  companyName:Yup.string(),
  companyType:Yup.string(), 
  website:Yup.string(),
  email: Yup.string(), 
  address:Yup.string(), 
  industry:Yup.string(),
  founded:Yup.string(),
  companyHead:Yup.string(),
})

export const addLicenseSchema = Yup.object({
  name:Yup.string().required("name is required"),
  companySize: Yup.string().required("companySize is required"),
  maxUsers:Yup.string().required("maxUsers is required")
})