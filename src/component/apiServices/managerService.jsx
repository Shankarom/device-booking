import httpService from "./httpService";

export const ManagerService = {
    getManager: () =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await httpService.get("manager");
          console.log("🚀 ~ newPromise ~ response:", response)
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),
      AddManager: (data) =>
      new Promise(async (resolve, reject) => {
        try {
          console.log("🚀 ~ data:", data)
          const response = await httpService.post("manager", data);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),

      updateManager: (updatedFields, managerId) =>
      new Promise(async (resolve, reject) =>{
        try {
          const response = await httpService.patch(`manager/${managerId}`, updatedFields);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),

      deleteManager:(managerId) =>
        new Promise(async (resolve, reject) =>{
          try{
            const response = await httpService.delete(`manager/${managerId}`)
            resolve(response)
          }catch (error) {
          reject(error);
        }
      }),
      searchManager:(value) =>
      new Promise (async (resolve, reject) =>{
        try{
          const response = await httpService.get(`manager/?search=${value}`)
          resolve(response);
        } catch (error) {
          reject(error);
        }
      })
      
    }