import React, { useState } from "react";
import Input from "../../../component/input";
import Button from "../../../component/button";

const OnBoarding = () =>{
    // let isSignInPage = false
    let [isSignInPage, setIsSignInPage] = useState(false)
    let [data,setData] = useState({
        email:'',
        password:''
    })
        return(
            <div className="flex justify-center items-center h-screen">

            <div className="bg-white w-[400px] h-[500px] shadow-lg rounded-lg flex flex-col justify-center items-center">
                <div className="text-4xl font-extrabold">Welcome Back</div>
                <div className="text-xl font-light mb-6">Sign In now to get start </div>
                <form>
                <Input label="Email Address" placeholder="Enter your email Address" className="mb-3" value={data.email}
                onChange={(e) => setData({...data, email:e.target.value})}/>
                <Input label='password' type="password" name="password" placeholder="Enter your password" className="mb-9" value={data.password}
                 onChange={(e) => setData({...data, password:e.target.value})}/>
                <Button label= "Sign in"type="submit" className="bg-black w-[50%] mb-3"/>

                </form>
            </div>
            </div>
        )
}

export default OnBoarding