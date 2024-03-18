import React, {useState, useEffect} from "react";
import Button from "../../component/button";
import { useManagerContext } from "../../context/managerContext";
import Modal from "../../component/modal/modal";
import AddManager from "../../component/modules/users/managers/Addmanagers";
import ManagerTable from "../../component/modules/users/managers/managerTable";
import CommonSideBar from "../../component/modules/sidebar/commonsideBar";
import { useToggleContext } from "../../context/ToogleContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const ManagersScreen = () =>{

  const {showAddManager, searchManager} = useManagerContext()
  const [search, setSearch] = useState("");
  const handleChange = (event) => {
      setSearch(event.target.value);
  };

  const handleAddDeviceClick = () => {
    setShowAddDevice(true);
  };

  const handleCloseAddDevice = () => {
    setShowAddDevice(false);
  };
  const {show} = useToggleContext()
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  useEffect(() => {
    const delayedSearch = debounce(searchManager, 300);
    delayedSearch(search);
  }, [search]);
    return(
      <div className={`transition-all duration-300 ease-in-out m-auto pt-[90px]  ${show ? 'pl-[270px]' : 'pl-[100px]'}`}>
        <div>
        <CommonSideBar/>
        {/* <div className="flex justify-between items-center mr-4">
        <Button
        label="Add manager"
        className="bg-black mx-4 mt-4 mb-4 !w-[200px]"
        onClick={handleAddDeviceClick}
      />
      {showAddManager && (
        <Modal title="Add Mangers" descriptionText={<AddManager/>}closeIcon={handleCloseAddDevice} />
      )}
             <div className="relative">
        </div>
        <input
          type="text"
          className="border rounded pl-10 pr-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Search..."
          value={search}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
        </div>
        <button
        type="submit"
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Search
      </button>
      </div> */}
             <div className="flex justify-between items-center mr-4 bg-[#d4d1d1] ml-[-19px] rounded-lg mt-[1px]">
      {showAddManager && (
        <Modal title="Add company" descriptionText={<AddManager/>}closeIcon={handleCloseAddDevice} />
      )}

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
      <p
        className=" mt-4 mb-4 flex justify-between items-center space-x-2  font-semibold">
          Manager
      </p>
      <Button
        label="Add company"
        className="bg-black !w-[200px] mt-4 mb-4 mr-2"
        onClick={handleAddDeviceClick}
      />
      </div>
      <ManagerTable/>   
      </div>
      </div>
    )
}

export default ManagersScreen