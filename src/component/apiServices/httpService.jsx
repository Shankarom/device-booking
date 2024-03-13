import axios from "axios";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const httpService = () => {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
  });

  // Add a request interceptor to add the JWT token to the Authorization header
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          handleUnauthorized();
        } else if (status === 500) {
          handleServerError(data.message);
        } else if (status === 400) {
          handleBadRequest(data.message);
        } else if (status === 422) {
          handleUnprocessableEntityError(data.message);
        } else if (status === 403) {
          handleForbiddenError(data.message);
        } else if (status === 405) {
          handleMethodNotAllowed();
        } else if (status === 404) {
          handleNotFound(data.message);
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      return Promise.reject(error);
    }
  );
  // 401 status code error handling:
  const handleUnauthorized = () => {
    toast.error("Unauthorized access. Please log in again.");
    clearLocalStorage();
    window.location.href = "/login";
  };
  // 401 status code error handling:
  const handleNotFound = (message) => {
    toast.error(message || "404 not found");
  };
  // 500 status code error handling:
  const handleServerError = (message) => {
    toast.error(`${message || "Internal Server Error"}`);
  };
  // 400 status code error handling:
  const handleBadRequest = (message) => {
    toast.error(`${message || "Invalid request parameters"}`);
  };
  // 422 status code error handling:
  const handleUnprocessableEntityError = (message) => {
    toast.error(`${message || "An unexpected error occurred"}`);
  };
  // 403 status code error handling:
  const handleForbiddenError = (message) => {
    toast.error(`${message || "An unexpected error occurred"}`);
  };
  // 405 status code error handling:
  const handleMethodNotAllowed = () => {
    toast.error("Method not allowed for this endpoint");
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem(userDetails);
    localStorage.removeItem(role);
    // localStorage.removeItem(permission);
  };

  return instance;
};

export default httpService();
