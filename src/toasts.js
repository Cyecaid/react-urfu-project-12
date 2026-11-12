import { notifications } from "@mantine/notifications";

export const showSuccess = (message) => notifications.show({ color: "green", message });

export const showError = (message) => notifications.show({ id: `error:${message}`, color: "red", message });

export const showConnectionLost = (message) => notifications.show({
  id: "connection",
  color: "red",
  message,
  autoClose: false,
});

export const showConnectionRestored = (message) => {
  notifications.hide("connection");
  showSuccess(message);
};
