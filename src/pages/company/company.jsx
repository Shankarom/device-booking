import React, { useState } from "react";
import DeviceTable from "../../component/modules/Device/DeviceTable";
import SideBar from "../../component/modules/sidebar/superadminSidebar";
import Button from "../../component/button";
import AddDevice from "../../component/modules/Device/AddDevice"; // Assuming this is the correct path
import Modal from "../../component/modal/modal";
import { useCompanyContext } from "../../context/companyContext";
import CompanyTable from "../../component/modules/company/companyTable";
import AddCompany from "../../component/modules/company/addCompany";

function CompanyScreen() {
  const {showAddCompany, setShowAddCompany} = useCompanyContext()


  const handleAddDeviceClick = () => {
    setShowAddCompany(true);
  };

  const handleCloseAddDevice = () => {
    setShowAddCompany(false);
  };

  return (
    <div>
      <SideBar />
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
  );
}

export default CompanyScreen;
