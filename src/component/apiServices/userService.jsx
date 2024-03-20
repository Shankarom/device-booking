import httpService from "./httpService";

export const UserService = {
        getUsers: (page, limit) =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await httpService.get(`users/?limit=${page}&page=${limit}`);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        }),
        getUserListBySearch: (value) =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await httpService.get(`users/?search=${value}`);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        }),
        getCompanyAssociatedUsers: (companyId) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await httpService.get(`company/users/${companyId.companyId}?limit=${companyId.limit}&page=${companyId.page}`);
          resolve(response);
          console.log("🚀 ~ newPromise ~ response:", response)
        } catch (error) {
          reject(error);
        }
      }),
      
    }