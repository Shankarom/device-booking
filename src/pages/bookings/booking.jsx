import React, { useState } from "react";
import Button from "../../component/button";
import Modal from "../../component/modal/modal";
import { useCompanyContext } from "../../context/companyContext";
import AddCompany from "../../component/modules/company/addCompany";
import CommonSideBar from "../../component/modules/sidebar/commonsideBar";
import { useToggleContext } from "../../context/ToogleContext";
import BookingTable from "../../component/modules/booking/bookingTable";

function BookingScreen() {
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
      {/* <Button
        label="Add company"
        className="bg-black mx-4 !w-[200px] mt-4 mb-4"
        onClick={handleAddDeviceClick}
      /> */}
      {showAddCompany && (
        <Modal title="Add company" descriptionText={<AddCompany/>}closeIcon={handleCloseAddDevice} />
      )}
      <BookingTable />
    </div>
    </div>
  );
}

export default BookingScreen;
