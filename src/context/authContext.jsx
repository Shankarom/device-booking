import React, { createContext, useContext, useState } from "react";
import { AuthService } from "../component/apiServices/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [role,setRole] = useState("")
    const [formData, setFormData] = useState({email: '', password: ''});
    const [loading, setLoading] = useState(false);
    const [updatePasswordModal, setUpdatePasswordModal] = useState(false);
    const [vendorId, setDeviceId] = useState("");


    const navigate = useNavigate();


    const handleLogin = async (values) => {
        const loginData = { email: values?.email, password: values?.password };
        setLoading(true);
        try {
          const loginApi = await AuthService.login(loginData);
          console.log("🚀 ~ handleLogin ~ loginApi:", loginApi.data.data.user)
          if (loginApi.data.success === true) {
            setLoading(false);
            toast.success(loginApi.data.message);
            localStorage.setItem('token',loginApi.data.data.tokens.refresh.token)
            localStorage.setItem('role',loginApi.data.data.user.userType)
            navigate("/dashboard");
            // role(loginApi.data.data.user.role)
        //     if (loginApi.data.user.roles[0] === "admin") {
        //     } else {
        //       navigate("/dashboard");
        //       // navigate(`/machine-list/${loginApi?.data?.user?.id}`);
        //     }
        //     // storing the response data in the state
        //     setData(loginApi.data.user);
        //     // storing the end user data from the api to the localStorage for usage:
        //     // token
        //     localStorage.setItem(jwtToken, JSON.stringify(loginApi?.data?.token));
        //     // user details
        //     localStorage.setItem(userDetails, JSON.stringify(loginApi?.data?.user));
        //     // role
        //     localStorage.setItem(
        //       "role",
        //       JSON.stringify(loginApi.data.user.roles[0])
        //     );
          }
          // if login api return false or 400 then handling that:
          else if (loginApi.data.status === false) {
            // setting the loading state to default or false:
            setLoading(false);
            toast.error(loginApi.data.message);
          }
        } catch (error) {
          // if some other errors then setting the loading state to false
          setLoading(false);
        }
      };
     const handleLogout = (e) => {
        // preventing the page to stop refreshing itself
        // const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
          // Proceed with logout
          // localStorage.removeItem(role);
          // localStorage.removeItem(userDetails);
          localStorage.removeItem("token");
          // navigating the user to the login page after logout
          navigate("/dashboard");
        }
      };

    return (
        <AuthContext.Provider 
        value={{
          handleLogin,
          setDeviceId,
          handleLogout,
          setRole
           }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
