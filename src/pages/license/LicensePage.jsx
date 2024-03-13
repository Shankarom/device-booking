import React, { useState } from "react";
import LicenseTable from "../../component/modules/license/LicenseTable";
import SideBar from "../../component/modules/sidebar/superadminSidebar";
import Button from "../../component/button";
import AddLicense from "../../component/modules/license/AddLicense"; // Assuming this is the correct path
import Modal from "../../component/modal/modal";
import { useLicenseContext } from "../../context/licenseContext";

function LicenseScreen() {
    const {showAddLicense, setShowAddLicense} = useLicenseContext()
  
  
    const handleAddlicenseClick = () => {
      setShowAddLicense(true);
    };
  
    const handleCloseAddLicense = () => {
      setShowAddLicense(false);
    };
  
    return (
      <div>
        <SideBar />
        <Button
          label="Add License"
          className="bg-black mx-4 !w-[200px] mt-4 mb-4"
          onClick={handleAddlicenseClick}
        />
        {showAddLicense && (
          <Modal title="Add License" descriptionText={<AddLicense/>}closeIcon={handleCloseAddLicense} />
        )}
        <LicenseTable />
      </div>
    );
  }
  
  export default LicenseScreen;