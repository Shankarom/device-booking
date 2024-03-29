import React, { useEffect, useState } from 'react';
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";
import { Input, Card, Typography } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LaptopIcon from "@mui/icons-material/Laptop";
import useMediaQuery from "@mui/material/useMediaQuery";
import Cards from "../modules/dashboardCard/card";
import TabletIcon from "@mui/icons-material/Tablet";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useToggleContext } from "../../context/ToogleContext";
import ChartTwo from "./dashboardCard/profitChart";
import ChartThree from "./dashboardCard/visitorAnalysis";
import TableOne from "./dashboardCard/profitDevice";
import { useDashboardContext } from "../../context/dashboardContext";


const DashboardItem = () => {
  const {
    dashboardData,
    getDashboardData
  } = useDashboardContext()
    console.log("🚀 ~ DashboardItem ~ dashboardData:", dashboardData.device.totalDevices)
  // const data = dashboardData && dashboardData?.map((item) => item);
  // console.log("🚀 ~ dashboardData:", data)
  const jwt = (localStorage.getItem("token"));
  useEffect(() => {
    // console.log("useEffect called with limit:", limit, "page:", page, "jwt:", jwt);
    if (jwt) {
      fetchData();
    }
}, []);
const fetchData = () => {
  getDashboardData();
};  
  const cardData = [
    {
      title: "Total Devices",value: dashboardData.device.totalDevices, trend: -3, icon: CheckCircleIcon },
    { title: "Available Devices", value: "120", trend: -3, icon: CheckCircleIcon },
    { title: "Booked Devices", value: "130", trend: 10, icon: CalendarTodayIcon },
    { title: "Mobile Devices", value: "350", trend: 10, icon: TabletIcon },
   
  ];

  const {show} = useToggleContext()

  return (
    <div className={`grid min-h-screen items-start gap-4 md:items-center md:gap-2 transition-all duration-300 ease-in-out m-auto pr-10 ${show ? 'pl-[270px]' : 'pl-[100px]'}`}>
    {/* // <div className={`grid grid-cols-1 gap-2 justify-start gap-4 md:items-center md:gap-2 transition-all duration-300 ease-in-out pr-10 ${show ? 'pl-[270px]' : 'pl-[100px]'}`}> */}
      {/* ... (your existing code) */}

      <div className="grid grid-cols-4 gap-4 justify-end">
        {cardData.map((data, index) => (
          <Cards
            key={index}
            title={data.title}
            value={data.value}
            trend={data.trend}
            icon={data.icon}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">

      <Card className="p-3">
            {/* <Typography variant="h6">Recent Bookings</Typography> */}
            <Typography variant="body2">
             <ChartTwo/>
            </Typography>

            {/* Recent Bookings Content */}
      </Card>
        
        <div className="grid gap-4 md:col-start-2 md:col-span-2">
          <Card>
            <div className="grid w-full gap-4 p-4 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <Typography variant="h6" className="font-semibold">
                  Select a Time Slot
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-500 dark:text-gray-400"
                >
                  Available time slots to book devices
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="h6" className="font-semibold">
                  Device Details
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-500 dark:text-gray-400"
                >
                  Additional details for the selected device
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <LaptopIcon className="h-6 w-6" />
                  <div className="grid gap-0.5">
                    <Typography variant="subtitle2" className="font-medium">
                      Laptop
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-xs text-gray-500 dark:text-gray-400"
                    >
                      Available
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <useMediaQuery className="h-6 w-6" />
                  <div className="grid gap-0.5">
                    <Typography variant="subtitle2" className="font-medium">
                      Printer
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-xs text-gray-500 dark:text-gray-400"
                    >
                      Available
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TabletIcon className="h-6 w-6" />
                  <div className="grid gap-0.5">
                    <Typography variant="subtitle2" className="font-medium">
                      Tablet
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-xs text-gray-500 dark:text-gray-400"
                    >
                      Available
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <AccessTimeIcon className="h-6 w-6" />
                  <div className="grid gap-0.5">
                    <Typography variant="subtitle2" className="font-medium">
                      10:00 AM - 11:00 AM
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-xs text-gray-500 dark:text-gray-400"
                    >
                      Select this time slot to book the device
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AccessTimeIcon className="h-6 w-6" />
                  <div className="grid gap-0.5">
                    <Typography variant="subtitle2" className="font-medium">
                      11:00 AM - 12:00 PM
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-xs text-gray-500 dark:text-gray-400"
                    >
                      Select this time slot to book the device
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AccessTimeIcon className="h-6 w-6" />
                  <div className="grid gap-0.5">
                    <Typography variant="subtitle2" className="font-medium">
                      12:00 PM - 01:00 PM
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-xs text-gray-500 dark:text-gray-400"
                    >
                      Select this time slot to book the device
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
  <div className="col-span-2">
    <Card className="p-3">
      <Typography variant="body2">
        <TableOne />
      </Typography>
    </Card>
  </div>
  <div className="col-span-1">
    <Card className="p-3">
      <Typography variant="body2">
        <ChartThree />
      </Typography>
    </Card>
  </div>
</div>

</div>
  );
};
export default DashboardItem;



