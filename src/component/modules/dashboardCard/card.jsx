import React from 'react';
import LaptopIcon from "@mui/icons-material/Laptop";

const Cards = ({ title, value, percentage, trend, icon: Icon }) => {
  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
      <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
      {Icon && <Icon style={{ fontSize: 24 }} />}
      </div>
      <div className="p-4 text-right">
        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{title}</p>
        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{value}</h4>
      </div>
      <div className="border-t border-blue-gray-50 p-4">
        <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
          <strong className={`text-${trend > 0 ? 'success' : 'red'}-500`}>{trend > 0 ? `+${trend}%` : `${trend}%`}</strong>&nbsp;than last week
        </p>
      </div>
    </div>
  );
};

export default Cards;
