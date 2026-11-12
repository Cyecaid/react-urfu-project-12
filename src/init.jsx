import { StrictMode } from "react";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import {
  addChannelToCache,
  addMessageToCache,
  removeChannelFromCache,
  renameChannelInCache,
} from "./api/chat.js";
import { HttpError } from "./api/client.js";
import resources from "./locales/index.js";
import useAuthStore from "./stores/useAuthStore.js";
import useConnectionStore from "./stores/useConnectionStore.js";
import useUiStore from "./stores/useUiStore.js";
import { showConnectionLost, showConnectionRestored, showError } from "./toasts.js";

const init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    lng: "ru",
    fallbackLng: "ru",
    interpolation: { escapeValue: false },
  });

  const handleError = (serverErrorKey) => (error) => {
    if (error instanceof HttpError && error.status === 401) {
      return;
    }
    showError(i18n.t(error instanceof HttpError ? serverErrorKey : "toasts.networkError"));
  };

  const queryClient = new QueryClient({
    queryCache: new QueryCache({ onError: handleError("toasts.loadError") }),
    mutationCache: new MutationCache({ onError: handleError("toasts.requestError") }),
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => !(error instanceof HttpError && error.status === 401) && failureCount < 3,
      },
    },
  });

  useAuthStore.subscribe((state, prevState) => {
    if (prevState.token && !state.token) {
      queryClient.clear();
      useUiStore.setState({ currentChannelId: null, modal: null });
    }
  });

  const { setConnected } = useConnectionStore.getState();
  let wasDisconnected = false;

  socket.on("newMessage", (message) => addMessageToCache(queryClient, message));
  socket.on("newChannel", (channel) => addChannelToCache(queryClient, channel));
  socket.on("renameChannel", (channel) => renameChannelInCache(queryClient, channel));
  socket.on("removeChannel", (channel) => {
    useUiStore.getState().leaveChannel(channel.id);
    removeChannelFromCache(queryClient, channel);
  });

  socket.on("disconnect", () => {
    wasDisconnected = true;
    setConnected(false);
    showConnectionLost(i18n.t("toasts.connectionLost"));
  });

  socket.on("connect", () => {
    setConnected(true);
    if (wasDisconnected) {
      wasDisconnected = false;
      showConnectionRestored(i18n.t("toasts.connectionRestored"));
      queryClient.invalidateQueries();
    }
  });

  return (
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </I18nextProvider>
    </StrictMode>
  );
};

export default init;
