import React, { useEffect, useRef } from "react";
import "./modal.css";

const Modal = ({
  title,
  descriptionText,
  button,
  closeIcon,
  updateDeviceModal,
  updateManagerModal,
  updateCompanyModal,
  openLogoutModal,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeIcon();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeIcon();
      }
    };

    const body = document.querySelector("body");
    body.classList.add("modal-open");

    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      body.classList.remove("modal-open");
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [modalRef, closeIcon]);

  return (
    <>
      <div className="parentDiv newCustomPopup">
        <div
          ref={modalRef}
          className={`inner_box ${
            openLogoutModal
            ? ""
            : updateDeviceModal
            ? "!h-auto"
            : updateManagerModal
            ? "!h-[550px] !min-h-[550px] lg:!h-[470px] lg:!min-h-[470px] xl:!h-[470px] xl:!min-h-[470px]"
            : updateCompanyModal
            ? "!h-[500px] overflow-auto lg:!overflow-hidden min-h-max md:!h-[750px] md:!min-h-[750px] lg:!h-[500px] lg:!min-h-[500px] lg:!max-h-[500px] 2xl:!h-[500px] 2xl:!min-h-[530px] 2xl:!max-h-[530px] w-full max-w-max md:w-[560px] md:min-w-[560px] md:max-w-[560px] 2xl:w-[638px] 2xl:min-w-[638px] 2xl:max-w-[638px]"
            : ""
          }`}
        >
          <h4
            className={`title text-center !text-[#242426] text-base 2xl:!text-[24px] 2xl:!leading-9 font-semibold mb-0`}
          >
            {title}
          </h4>
          <div className={`description`}>{descriptionText}</div>
          <div className={`buttonbox`}>{button}</div>
          {/* <div
            className={`crossIcon hidden lg:block`}
            onClick={() => closeIcon()}
          ></div> */}
        </div>
      </div>
    </>
  );
};

export default Modal;
