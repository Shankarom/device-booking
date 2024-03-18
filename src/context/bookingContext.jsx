import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BookingService } from "../component/apiServices/bookingService";
const BookingContext = createContext()

export const BookingProvider = ({children}) =>{
    const [loading, setLoading] = useState(false)
    const [pageDetails, setPageDetails] = useState([]);
    const [bookingList, setBookingList] = useState([]);

    const navigate = useNavigate()

    const getBookingDetails =  async () =>{
        setLoading(false)
        try{
            const bookingDetails =  await BookingService.getBookingDetails()
            console.log("🚀 ~ getBookingDetails ~ bookingDetails:", bookingDetails)
            if(bookingDetails.data.success == true){
             setBookingList(bookingDetails.data.result.results);
             setPageDetails(bookingDetails?.data?.result?.pageDetails)
        }
       }
       catch (error) {
        console.log("Error fetching devices:", error);
        toast.error("An error occurred while fetching devices");
      }
    }
    const searchBooking = async (value) =>{
        try{
            const bookingDetails =  await BookingService.searchBooking(value)
            if(bookingDetails.data.success == true){
             setBookingList(bookingDetails.data.result.results);
             setPageDetails(bookingDetails?.data?.result?.pageDetails)
        }
       }
       catch (error) {
        console.log("Error fetching devices:", error);
        toast.error("An error occurred while fetching devices");
      }
    }
    return (
        <BookingContext.Provider
        value={{
            loading,
            bookingList,
            getBookingDetails,
            setPageDetails,
            searchBooking
        }}
        >
            {children}
        </BookingContext.Provider>
    )
}

export const useBookingContext = () =>{
    const context = useContext(BookingContext)
    if(!context){
        throw new Error("useDeviceContext must be used within a DeviceProvider");
    }
    return context  
}