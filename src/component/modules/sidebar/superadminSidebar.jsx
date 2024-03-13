import React, { useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { LiaIndustrySolid } from "react-icons/lia";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { HiOutlineLogout } from "react-icons/hi";
import { MdDeviceUnknown } from "react-icons/md";
import { GrLicense, GrUserManager } from "react-icons/gr";
import { IoBookmark } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; 
import { TbLogout } from "react-icons/tb";
import { useAuthContext } from "../../../context/authContext";
import Modal from "../../modal/modal";


const SideBar = () => {
  const { handleLogout,setRole } = useAuthContext()
  const [nav, setNav] = useState(false);
  const [openLogoutModal, setOpenModal] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate()

  const ModalButtons = [
    {
      label: "Cancel",
      Click: () => {
        setOpenModal(false);
      },
    },
    {
      label: "Logout",
      Click: () => {
        handleLogout();
      },
    },
  ];

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setOpenModal(true);
  };

  const userDetail = JSON.parse(localStorage.getItem("user"));
  const initials =
    userDetail && userDetail.name
      ? userDetail.name.charAt(0).toUpperCase()
      : null;


    const handleItemClick = (path) => {
    navigate(path); // Navigate to the specified path
    setNav(false); // Close the sidebar after navigation
  };
  const menuItems = [
    { icon: <MdDeviceUnknown size={25} className="mr-4" />, text: "Devices", path:"/device" },
    { icon: <GrUserManager size={25} className="mr-4" />, text: "Mangers", path:'/manager' },
    { icon: <LiaIndustrySolid size={25} className="mr-4" />, text: "Company", path: "/company" },
    { icon: <IoBookmark size={25} className="mr-4" />, text: "Booking" },
    { icon: <GrLicense size={25} className="mr-4" />, text: "License", path:"/license" },

  ];

  return (
    <>
    <div className="max-w-full flex justify-between items-center p-4 shadow-sm">
      {/* Left side */}
      <div className="flex">
        <div onClick={() => setNav(true)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Device <span className="font-bold">Booking</span>
        </h1>
        {/* <div className="hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]">
          <p className="bg-black text-white rounded-full p-2">Delivery</p>
          <p className="p-2">Pickup</p>
        </div> */}
      </div>

      {/* Search Input */}
      {/* <div className="bg-gray-200 rounded-full flex items-end px-2 w-[200px] sm:w-[400px] lg:w-[500px]"> */}
      <div>
        {/* <AiOutlineSearch size={25} />
        <input
          className="bg-transparent p-2 w-full focus:outline-none"
          type="text"
          placeholder="Search device"
        /> */}
          <div className="profileMain ml-auto">
              <div className="profilePop">
                <button onClick={toggleProfile}>
                  {/* <p className="mb-0 text-lg">
                    {userDetail && userDetail?.name}
                  </p> */}
                  <HiOutlineLogout className="mr-8 h-[30px] w-[30px]" />{" "}
                </button>
                {/* {isProfileOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-5 mt-12 w-auto bg-[#394253] p-4 rounded-lg shadow-lg"
                  >
                    <div className="absolute border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-[#394253] right-[33px] -top-2"></div>
                    <div className="profileContainer font-medium">
                      <h2>{userDetail && initials}</h2>
                      <h3 className="text-white my-2">
                        {userDetail && `${userDetail.name}`}
                      </h3>
                      <p className="text-white my-2 email border-b border-b-white pb-3 w-full text-center">
                        {userDetail && userDetail.email}
                      </p>
                    </div>
                    <ul>
                      <li
                        className="flex items-center cursor-pointer gap-2 mb-2 mt-2"
                        onClick={() => {
                          toggleProfile();
                          navigate("/change-password");
                        }}
                      >
                        <Lock className="text-white" />
                        <h3 className="!font-medium text-white !m-0">
                          Change Password
                        </h3>
                      </li>
                      <li
                        onClick={() => {
                          toggleProfile();
                          setOpenModal(true);
                        }}
                        className="logoutButton cursor-pointer flex items-center gap-2"
                      >
                        <LogoutIcon className="text-white" />
                        <h3 className="!font-medium text-white">Logout</h3>
                      </li>
                    </ul>
                  </div>
                )} */}
              </div>
            </div>      </div>
      {/* Cart button */}
      {/* <button className="bg-black text-white hidden md:flex items-center py-2 rounded-full border border-black px-5 ">
        <BsFillCartFill size={20} className="mr-2" /> Cart
      </button> */}

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => 
            setNav(false)
            // setNav(!nav)
          }
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4">
          Device <span className="font-bold">Booking</span>
        </h2>
        <hr/>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            {menuItems.map(({ icon, text, path }, index) => {
              return (
                <div key={index} className=" py-4">
                <li onClick={() => handleItemClick(path)} className="text-xl flex cursor-pointer w-[50%] rounded-full mx-auto p-2 hover:text-white hover:bg-black">
                    {icon} {text}
                  </li>
                </div>
              );
            })}
          </ul>
        </nav>
        
      </div>

    </div>
    {openLogoutModal && (
        <Modal
          openLogoutModal={openLogoutModal}
          closeIcon={() => {
            setOpenModal(false);
          }}
          title="Do you want to logout?"
          button={
            <div className="flex mt-12 items-center gap-[10px] !w-full">
              {ModalButtons.map((d, index) => (
                <button
                  onClick={d.Click}
                  className="bg-[#000000] rounded-[4px] border border-[#080808] shadow-sm hover:!bg-[#fff] hover:!border-[#0c0c0c] transition-all hover:!text-[#0a090a] duration-300 ease-in-out w-full text-white py-[10px]"
                  key={index}
                >
                  {d.label}
                </button>
              ))}
            </div>
          }
        />
      )}
    </>
  );
};

export default SideBar;
