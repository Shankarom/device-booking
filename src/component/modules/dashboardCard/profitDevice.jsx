import React, { useContext, useEffect } from "react";
import { useDashboardContext } from "../../../context/dashBoardContext";
import moment from 'moment';

const TableOne = () => {
  const { getDashboardDevice, bookinglist } = useDashboardContext();

  useEffect(() => {
    getDashboardDevice();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Booking Details
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Device Name
            </h5>
          </div>
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
              Timings
            </h5>
          </div>
        </div>

        {bookinglist.map((booking, index) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              index === bookinglist.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={index}
          >
            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {booking.deviceName}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {booking?.bookings[0]?.userDetails.firstName}{" "}
                {booking?.bookings[0]?.userDetails.lastName}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {booking?.bookings[0]?.userDetails.email}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
              {`${moment(booking?.bookings[0]?.startTime).format("MMM D h:mm a")}--${moment(booking?.bookings[0]?.endTime).format("h:mm a")}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
