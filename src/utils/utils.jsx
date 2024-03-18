export const PHONE_REGEX = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
export const customStyles = {
    rows: {
      style: {
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f5f5fa !important", // Change the background color on hover
        },
      },
    },
  };

  export const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };