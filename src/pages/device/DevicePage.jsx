import React, { useEffect, useState } from "react";
import DeviceTable from "../../component/modules/Device/DeviceTable";
import SideBar from "../../component/modules/sidebar/superadminSidebar";
import Button from "../../component/button";
import AddDevice from "../../component/modules/Device/AddDevice"; // Assuming this is the correct path
import Modal from "../../component/modal/modal";
import { useDeviceContext } from "../../context/deviceContext";
import CommonSideBar from "../../component/modules/sidebar/commonsideBar";
import { useToggleContext } from "../../context/ToogleContext";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "../../utils/utils";


function DeviceScreen() {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const params = useParams();
  const {showAddDevice, setShowAddDevice,searchDevice,getDevices } = useDeviceContext()
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

    // Debounce function
    useEffect(() => {
      // Debounce search function with 300ms delay
      if(search.length > 0 ){
        const delayedSearch = debounce(searchDevice, 100);
        // Call the delayed search function when search state changes
        delayedSearch(search);
      } else {
        getDevices()
      }
    }, [search]);

  return (
    <div className={`transition-all duration-300 ease-in-out m-auto pt-[90px]  ${show ? 'pl-[270px]' : 'pl-[100px]'}`}>
      <div>
      <CommonSideBar />
      <div className="flex justify-between items-center mr-4 bg-[#d4d1d1] ml-[-34px] rounded-lg mt-[1px]">
      {showAddDevice && (
        <Modal title="Add device" descriptionText={<AddDevice/>}closeIcon={handleCloseAddDevice} />
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
          Devices
      </p>
      <Button
        label="Add Device"
        className="bg-black !w-[200px] mt-4 mb-4 mr-2"
        onClick={handleAddDeviceClick}
      />
      </div>
        
      <DeviceTable/>
      </div>
    </div>
  );
}

export default DeviceScreen;
