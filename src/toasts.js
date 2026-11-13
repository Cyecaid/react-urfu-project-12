import { hideNotification, showNotification } from "@mantine/notifications";

export const createToasts = (store) => {
  const showSuccess = (message) => showNotification({ color: "green", message }, store);

  const showError = (message) => showNotification({ id: `error:${message}`, color: "red", message }, store);

  const showConnectionLost = (message) => showNotification({
    id: "connection",
    color: "red",
    message,
    autoClose: false,
  }, store);

  const showConnectionRestored = (message) => {
    hideNotification("connection", store);
    showSuccess(message);
  };

  return { showSuccess, showError, showConnectionLost, showConnectionRestored };
};
