import React from "react";
import UserTable from "../../component/modules/users/managers/userTable";
import CommonSideBar from "../../component/modules/sidebar/commonsideBar";
import { useToggleContext } from "../../context/ToogleContext";

const UsersScreen = () =>{

  const {show} = useToggleContext()
    return(
      <div className={`transition-all duration-300 ease-in-out m-auto pt-[90px]  ${show ? 'pl-[270px]' : 'pl-[100px]'}`}>
        <div>
        <CommonSideBar/>
      <UserTable/>   
      </div>
      </div>
    )
}

export default UsersScreen