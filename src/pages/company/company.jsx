import React, { useEffect, useState } from "react";
import SideBar from "../../component/modules/sidebar/superadminSidebar";
import Button from "../../component/button";
import Modal from "../../component/modal/modal";
import { useCompanyContext } from "../../context/companyContext";
import CompanyTable from "../../component/modules/company/companyTable";
import AddCompany from "../../component/modules/company/addCompany";
import CommonSideBar from "../../component/modules/sidebar/commonsideBar";
import { useToggleContext } from "../../context/ToogleContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "../../utils/utils";

function CompanyScreen() {
  const {showAddCompany, setShowAddCompany, searchCompany} = useCompanyContext()
  const [search, setSearch] = useState("");
  console.log("🚀 ~ CompanyScreen ~ search:", search)

  const handleChange = (event) => {
      setSearch(event.target.value);
  };


  const handleAddDeviceClick = () => {
    setShowAddCompany(true);
  };

  const handleCloseAddDevice = () => {
    setShowAddCompany(false);
  };
  const {show} = useToggleContext()
  
    useEffect(() => {
      // Debounce search function with 300ms delay
      const delayedSearch = debounce(searchCompany, 100);
      // Call the delayed search function when search state changes
      delayedSearch(search);
    }, [search]);

  return (
    <div className={`transition-all duration-300 ease-in-out m-auto pt-[90px]  ${show ? 'pl-[270px]' : 'pl-[100px]'}`}>
    <div>
      <CommonSideBar />
       <div className="flex justify-between items-center mr-4 bg-[#d4d1d1] ml-[-19px] rounded-lg mt-[1px] mb-2">
      {showAddCompany && (
        <Modal title="Add company" descriptionText={<AddCompany/>}closeIcon={handleCloseAddDevice} />
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
          Company
      </p>
      <Button
        label="Add company"
        className="bg-black !w-[200px] mt-4 mb-4 mr-2"
        onClick={handleAddDeviceClick}
      />
      </div>
      <CompanyTable />
    </div>
    </div>
  );
}

export default CompanyScreen;
