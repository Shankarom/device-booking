import httpService from "./httpService";


export const BookingService = {
    getBookingDetails: (page, limit) =>
    new Promise (async (resolve, reject) =>{
        try{
            const response = await httpService.get(`booking/?limit=${limit}$page=${limit}`)
            resolve(response)
        }catch(error){
            reject(error)
        }
    }),
    searchBooking: (value) =>
    new Promise (async (resolve, reject) =>{
        try{
            const response = await httpService.get(`booking/?search=${value}`)
            resolve(response)
        }catch(error){
            reject(error)
        }
    })
}
