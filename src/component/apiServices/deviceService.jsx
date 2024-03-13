import httpService from "./httpService";

export const DeviceService = {
    AddDevice: (data) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await httpService.post("device", data);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),
    getDevice: () =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await httpService.get("device");
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),

      updateDevice: (updatedFields, deviceId) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await httpService.patch(`device/${deviceId}`, updatedFields);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),
      deleteDevice: (deviceId) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await httpService.delete(`device/${deviceId}`);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),
    }