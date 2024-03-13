import React, { useState } from "react";
import DeviceTable from "../../component/modules/Device/DeviceTable";
import SideBar from "../../component/modules/sidebar/superadminSidebar";
import Button from "../../component/button";
import AddDevice from "../../component/modules/Device/AddDevice"; // Assuming this is the correct path
import Modal from "../../component/modal/modal";
import { useCompanyContext } from "../../context/companyContext";
import CompanyTable from "../../component/modules/company/companyTable";
import AddCompany from "../../component/modules/company/addCompany";
import CommonSideBar from "../../component/modules/sidebar/commonsideBar";
import { useToggleContext } from "../../context/ToogleContext";

function CompanyScreen() {
  const {showAddCompany, setShowAddCompany} = useCompanyContext()


  const handleAddDeviceClick = () => {
    setShowAddCompany(true);
  };

  const handleCloseAddDevice = () => {
    setShowAddCompany(false);
  };
  const {show} = useToggleContext()
  return (
    <div className={`transition-all duration-300 ease-in-out m-auto pt-[90px]  ${show ? 'pl-[270px]' : 'pl-[100px]'}`}>
    <div>
      <CommonSideBar />
      <Button
        label="Add company"
        className="bg-black mx-4 !w-[200px] mt-4 mb-4"
        onClick={handleAddDeviceClick}
      />
      {showAddCompany && (
        <Modal title="Add company" descriptionText={<AddCompany/>}closeIcon={handleCloseAddDevice} />
      )}
      <CompanyTable />
    </div>
    </div>
  );
}

export default CompanyScreen;
