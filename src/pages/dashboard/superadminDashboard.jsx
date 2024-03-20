// import React from "react";
// import DashboardItem from "../../component/modules/dashBoard";
// import CommonSideBar from "../../component/modules/sidebar/commonsideBar";
// import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
// import { useToggleContext } from "../../context/ToogleContext";


// export default function DashboardScreen(){
//     const{show} = useToggleContext();
//     return(
//         <>
//          <div className={`max-w-full flex justify-between items-center p-4 transition-all duration-300 ease-in-out shadow-sm ${show ? 'pl-[280px]' : 'pl-[100px]'}`}>
//           <div className="flex">
//         <div onClick={() => setNav(true)} className="cursor-pointer">
//         </div>
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
//           Device <span className="font-bold">Booking</span>
//         </h1>
//         </div>
//       </div>
//         <CommonSideBar/>
//         <DashboardItem/>
//           {/* </ThemeProvider> */}
//         </>
//     )
// }
import React, { useState } from "react";
import DashboardItem from "../../component/modules/dashBoard";
import CommonSideBar from "../../component/modules/sidebar/commonsideBar";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useToggleContext } from "../../context/ToogleContext";

export default function DashboardScreen(){
    const { show } = useToggleContext();
    const [nav, setNav] = useState(false); // State to manage sidebar visibility

    return(
        <>
            {/* <div className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 transition-all duration-300 ease-in-out ${show ? 'pl-[280px]' : 'pl-[100px]'}`}>
                <div className="max-w-full flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
                            Device <span className="font-bold">Booking</span>
                        </h1>
                    </div>
                    <div className="hidden sm:flex items-center space-x-4">
                        <AiOutlineSearch size={24} />
                        <AiOutlineClose size={24} />
                    </div>
                </div>
            </div> */}
            <div className="pt-[90px]"> {/* Adjust the padding top to match the height of your header */}
                <CommonSideBar />
                <DashboardItem />
            </div>
        </>
    )
}
