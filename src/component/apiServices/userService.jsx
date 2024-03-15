import httpService from "./httpService";

export const UserService = {
        getUsers: () =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await httpService.get("users");
            resolve(response);
          } catch (error) {
            reject(error);
          }
        }),
        getCompanyAssociatedUsers: (companyId) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await httpService.get(`company/users/${companyId.companyId}`);
          resolve(response);
          console.log("🚀 ~ newPromise ~ response:", response)
        } catch (error) {
          reject(error);
        }
      }),
      
    }