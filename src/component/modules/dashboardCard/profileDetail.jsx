import React, { useContext, useState, useEffect } from "react";
import { useUserContext } from "../../../context/userContext";
import { Link } from "react-router-dom";
import { ChevronRight } from 'react-feather';

const ProfileDetail = () => {
    const storedLimit = localStorage.getItem("limit");
  const { getUsers, usersList } = useUserContext()

  const [limit, setLimit] = useState(storedLimit || 10);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getUsers(limit, page);
  }, []);

  return (
    <div className="rounded-sm border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        User Details
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              User Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Company name
            </h5>
          </div>
        </div>

        {usersList.slice(0,5).map((user, index) => (
          
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${index === usersList.length-1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
              }`}
            key={index}
          >

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {user?.firstName}{" "}
                {user?.lastName}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {user?.email}
              </p>
            </div>
            <div className="flex items-end justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {user?.companyName}
              </p>
            </div>
          </div>
        ))}
      </div>
      {usersList.length > 5 &&
        <Link
          to={`/user`}
          className="bg-[#0c0c0c] float-right mt-4 min-w-[100px] text-white hover:bg-[#4992FF] left-120 transition-all duration-300 ease-in-out flex items-center uppercase rounded-md px-4 py-2 relative" >
          <span className="text-sm ">View All</span>
          <ChevronRight className="text-sm" /> 
        </Link>
      }
    </div>
    
  );
};

export default ProfileDetail;
