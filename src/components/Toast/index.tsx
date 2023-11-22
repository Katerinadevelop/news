import React, { FC } from "react";
import { InfoIcon } from "../../icons/InfoIcon";
import { SuccessIcon } from "../../icons/SuccessIcon";
import { WarningIcon } from "../../icons/WarningIcon";
import { ErrorIcon } from "../../icons/ErrorIcon";
import { INotification } from "../../types";
import "./styles.css";

interface ToastProps {
  notification: INotification;
  setNotification: (value: INotification) => void;
}

const Toast: FC<ToastProps> = ({ notification, setNotification }) => {
  const { type, subtitle, isShow } = notification;
  const title = type?.charAt(0).toUpperCase() + type?.slice(1).toLowerCase();

  const getIconPath = () => {
    switch (type) {
      case "info": {
        return <InfoIcon type={type}/>
      }
      case "success": {
        return <SuccessIcon type={type}/>
      }
      case "warning": {
        return <WarningIcon type={type}/>
      }
      default:
        return <ErrorIcon type={type}/>
    }
  }

  const handleCloseToast = () => {
    setNotification({isShow: false, type: "error", subtitle: ""});
  }

  return (
    <div data-notification className={`notification-container ${type}-border ${!isShow && "invisible"}`} role="alert">
      <div className="notification-content-wrapper">
        <svg className={`notification-${type}-icon`} width="14" height="14" viewBox="0 0 16 16"
             xmlns="http://www.w3.org/2000/svg">
          {getIconPath()}
        </svg>
        <div>
          <p className="notification-title">{title}</p>
          <p className="notification-subtitle">{subtitle}</p>
        </div>
      </div>
      <button data-notification-btn className="notification-close-button" type="button" onClick={handleCloseToast}>
        <svg className="notification-close-icon" aria-label="close" width="10" height="10"
             viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.32 5L10 8.68 8.68 10 5 6.32 1.32 10 0 8.68 3.68 5 0 1.32 1.32 0 5 3.68 8.68 0 10 1.32 6.32 5z"
                fill-rule="nonzero"
          />
        </svg>
      </button>
    </div>
  )
}

export default Toast;