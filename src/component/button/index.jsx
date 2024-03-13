// import React from "react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Button = ({
    label= 'Button',
    type= "Button",
    className= "",
    disabled= false,
    onClick
}) =>{
    const [search, setSearch] = useState("");

    const handleChange = (event) => {
        setSearch(event.target.value);
    };
    return(
        <div className="flex justify-between items-center space-x-2 pr-3">
         <button onClick={onClick} type={type} className={`text-white bg-black-700 hover:bg-black focus:ring-4 focus:outline-none
        focus:ring-black font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ${className}`} 
        disabled={disabled}>{label}</button>
        {/* <div className="relative">
        <input
          type="text"
          className="border rounded pl-10 pr-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Search..."
          value={search}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
        </div>
        <button
        type="submit"
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Search
      </button>
      </div>
         */}
        </div>
       
    )
}
export default Button