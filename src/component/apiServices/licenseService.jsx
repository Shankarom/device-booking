import httpService from "./httpService";

export const LicenseService = {
    addLicense: (data) =>
      new Promise(async (resolve, reject) => {
        try {
          console.log(data,'dataa')
          const response = await httpService.post("license", data);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),
    getLicense: () =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await httpService.get('license');
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),

      updateLicense: (updatedFields, licenseId) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await httpService.patch(`license/${licenseId}`, updatedFields);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),
      deleteLicense: (licenseId) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await httpService.delete(`license/${licenseId}`);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),
}