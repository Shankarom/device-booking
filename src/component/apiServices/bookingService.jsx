import httpService from "./httpService";


export const BookingService = {
    getBookingDetails: (page, limit) =>
    new Promise (async (resolve, reject) =>{
        try{
            const response = await httpService.get(`booking/?limit=${limit}$page=${limit}`)
            resolve(response)
            console.log("🚀 ~ newPromise ~ response:", response)
        }catch(error){
            reject(error)
        }
    })
}
