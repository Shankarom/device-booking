import React from "react";
import SideBar from "../../component/modules/sidebar/superadminSidebar";
import Button from "../../component/button";
import { useManagerContext } from "../../context/managerContext";
import Modal from "../../component/modal/modal";
import AddDevice from "../../component/modules/Device/AddDevice";
import AddManager from "../../component/modules/users/managers/Addmanagers";
import ManagerTable from "../../component/modules/users/managers/managerTable";

const ManagersScreen = () =>{

  const {showAddManager, setShowAddManger} = useManagerContext()


  const handleAddDeviceClick = () => {
    setShowAddManger(true);
  };

  const handleCloseAddDevice = () => {
    setShowAddManger(false);
  };
    return(
        <div>
        <SideBar/>
        <Button
        label="Add manager"
        className="bg-black mx-4 mt-4 mb-4 !w-[200px]"
        onClick={handleAddDeviceClick}
      />
      {showAddManager && (
        <Modal title="Add Mangers" descriptionText={<AddManager/>}closeIcon={handleCloseAddDevice} />
      )}
      <ManagerTable/>   
      </div>
    )
}

export default ManagersScreen