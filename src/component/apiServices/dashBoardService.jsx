import httpService from "./httpService";

export const DashboardService = {
    DashboardDevice: () =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await httpService.get("dashboard/details");
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),
      
    }