import httpService from "./httpService";

export const AuthService = {
    login: (loginData) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await httpService.post("auth/login/email", loginData);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),
      
    }