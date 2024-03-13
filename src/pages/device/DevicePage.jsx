import React, { useState } from "react";
import DeviceTable from "../../component/modules/Device/DeviceTable";
import SideBar from "../../component/modules/sidebar/superadminSidebar";
import Button from "../../component/button";
import AddDevice from "../../component/modules/Device/AddDevice"; // Assuming this is the correct path
import Modal from "../../component/modal/modal";
import { useDeviceContext } from "../../context/deviceContext";
import CommonSideBar from "../../component/modules/sidebar/commonsideBar";
import { useToggleContext } from "../../context/ToogleContext";

function DeviceScreen() {
  const {showAddDevice, setShowAddDevice} = useDeviceContext()


  const handleAddDeviceClick = () => {
    setShowAddDevice(true);
  };

  const handleCloseAddDevice = () => {
    setShowAddDevice(false);
  };
  const {show} = useToggleContext()

  return (
    <div className={`transition-all duration-300 ease-in-out m-auto pt-[90px]  ${show ? 'pl-[270px]' : 'pl-[100px]'}`}>
      <div>
      <CommonSideBar />
      <Button
        label="Add Device"
        className="bg-black mx-4 !w-[200px] mt-4 mb-4"
        onClick={handleAddDeviceClick}
      />
      {showAddDevice && (
        <Modal title="Add device" descriptionText={<AddDevice/>}closeIcon={handleCloseAddDevice} />
      )}
      <DeviceTable />
      </div>
    </div>
  );
}

export default DeviceScreen;
