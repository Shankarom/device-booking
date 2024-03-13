import httpService from "./httpService";
export const DashboardService = {
    GetDashboardData: () =>
    new Promise(async (resolve, reject) => {
        try{
            const response = await httpService.get('dashboard/details');
            console.log("🚀 ~ newPromise ~ response:", response)
            resolve(response)
        }catch (error) {
            reject(error);
          }
    })
}