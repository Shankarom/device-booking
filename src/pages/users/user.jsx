import React, { useEffect, useState } from "react";
import UserTable from "../../component/modules/users/managers/userTable";
import CommonSideBar from "../../component/modules/sidebar/commonsideBar";
import { useToggleContext } from "../../context/ToogleContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../context/userContext"
import { debounce } from "../../utils/utils";

const UsersScreen = () =>{
  let {getUserListBySearch} = useUserContext()
  const [search, setSearch] = useState("");

const handleChange = (event) => {
    setSearch(event.target.value);
};
useEffect(() => {
  if(search.length > 0) {
    const delayedSearch = debounce(getUserListBySearch, 100);
    delayedSearch(search);
  }
}, [search]);

  const {show} = useToggleContext()
    return(
      <div className={`transition-all duration-300 ease-in-out m-auto pt-[90px]  ${show ? 'pl-[270px]' : 'pl-[100px]'}`}>
        <div>
        <CommonSideBar/>
        <div className="flex items-center mr-4 bg-[#d4d1d1] h-[75px] ml-[-34px] rounded-lg mt-[1px]">
        <div className="relative">
        <input
          type="text"
          className="border rounded-lg pl-10 py-2 focus:outline-none focus:ring focus:border-blue-300 ml-2"
          placeholder="Search..."
          value={search}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 pl-2" />
        </div>
      </div>
      <div className="ml-96">
      <p
        className=" mt-4 mb-4 space-x-2  font-semibold ml-24">
          USERS
      </p>
      </div>
      </div>
      <UserTable/>   
      </div>
      </div>
    )
}

export default UsersScreen