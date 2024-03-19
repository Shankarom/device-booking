import httpService from "./httpService";

export const CompanyService = {
    AddCompany: (data) =>
    new Promise(async (resolve, reject) => {
        try{
            const response = await httpService.post("company", data);
            resolve(response)
        }catch (error) {
            reject(error);
          }
    }),
    GetCompany: (page, limit) =>
    new Promise(async (resolve, reject) => {
        try{
            const response = await httpService.get(`company/?limit=${page}&page=${limit}`);
            resolve(response)
        }catch (error) {
            reject(error);
          }
    }),
    updateCompany: (updatedFields, companyId) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await httpService.patch(`company/${companyId}`, updatedFields);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),
    deleteCompany:(companyId) =>
    new Promise (async (resolve, reject) =>{
        try{
            const response = await httpService.patch(`company/delete/${companyId}`)
            resolve(response)
         }
        catch(error){
            reject(error)
        }
    }),
    companySearching:(value) =>
    new Promise(async (resolve, reject) =>{
      try{
        const response = await httpService.get(`company/?search=${value}`);
        console.log("🚀 ~ newPromise ~ response:", response)
        resolve(response)
    }catch (error) {
        reject(error);
      }
    }) 
    }