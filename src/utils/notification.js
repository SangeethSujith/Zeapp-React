import { toast } from "react-toastify";

const getConfig = (config = {}) => {
  const defaultToastConfig = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    pauseOnFocusLoss: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  };

  const mergedConfig = {
    ...defaultToastConfig,
    ...config,
    toastId: "TO_PREVENT_DUPLICATE_TOAST",
  };

  return mergedConfig;
};

export const notificationTypes = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

const showNotification = ({ type, config = {}, message = "" }) => {
  if (message) {
    toast(message, { ...getConfig(config), type });
  }
};

const notificationHelpers = {};

Object.entries(notificationTypes).forEach(([key, type]) => {
  notificationHelpers[key] = (message = "", config = {}) => {
    showNotification({ message, type, config });
  };
});

export default notificationHelpers;
