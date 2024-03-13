import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import {useAuthContext} from "../../context/authContext"
import Input from "../../component/input";
import Button from "../../component/button";
import CustomField from '../../component/input/field'; // Assuming you have your CustomField component defined in a separate file
const baseURL = import.meta.env.VITE_APP_BASE_URL;


const OnBoarding = () =>{
    const formik = useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        onSubmit : async (value) =>{
            handleLogin(value)
            console.log("__________value", value)
        }
    })
    
    const { handleLogin } = useAuthContext();
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white w-[400px] h-[500px] shadow-lg rounded-lg flex flex-col justify-center items-center">
                    <div className="text-4xl font-extrabold">Welcome Back</div>
                    <div className="text-xl font-light mb-6">Sign In now to get start </div>
                    <Formik>
                            <Form>
                                {/* Replace input fields with CustomField components */}
                                <CustomField
                                    label="Email Address"
                                    name="email"
                                    type="text"
                                    placeholder="Enter your email Address"
                                    className="mb-3"
                                    value={formik.values.email}     
                                    onChange={formik.handleChange}                           />
                                <CustomField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="mb-9"
                                    value={formik.values.password}     
                                    onChange={formik.handleChange}         
                                />
                                <Button  onClick={formik.handleSubmit} label="Sign in" className="bg-black w-[50%] mb-3" />
                            </Form>
                    </Formik>
                </div>
            </div>
        );
}

export default OnBoarding