import { StrictMode } from "react";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createNotificationsStore } from "@mantine/notifications";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import {
  addChannelToCache,
  addMessageToCache,
  removeChannelFromCache,
  renameChannelInCache,
} from "./api/chat.js";
import { createRequest, HttpError } from "./api/client.js";
import { AppContext } from "./context.js";
import resources from "./locales/index.js";
import { createAuthStore } from "./stores/useAuthStore.js";
import { createConnectionStore } from "./stores/useConnectionStore.js";
import { createUiStore } from "./stores/useUiStore.js";
import { createToasts } from "./toasts.js";

const init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    lng: "ru",
    fallbackLng: "ru",
    interpolation: { escapeValue: false },
  });

  const stores = {
    auth: createAuthStore(),
    ui: createUiStore(),
    connection: createConnectionStore(),
  };
  const notificationsStore = createNotificationsStore();
  const toasts = createToasts(notificationsStore);
  const request = createRequest(stores.auth);

  const handleError = (serverErrorKey) => (error) => {
    if (error instanceof HttpError && error.status === 401) {
      return;
    }
    toasts.showError(i18n.t(error instanceof HttpError ? serverErrorKey : "toasts.networkError"));
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

  stores.auth.subscribe((state, prevState) => {
    if (prevState.token && !state.token) {
      queryClient.clear();
      stores.ui.setState({ currentChannelId: null, modal: null });
    }
  });

  let wasDisconnected = false;

  socket.on("newMessage", (message) => addMessageToCache(queryClient, message));
  socket.on("newChannel", (channel) => addChannelToCache(queryClient, channel));
  socket.on("renameChannel", (channel) => renameChannelInCache(queryClient, channel));
  socket.on("removeChannel", (channel) => {
    stores.ui.getState().leaveChannel(channel.id);
    removeChannelFromCache(queryClient, channel);
  });

  socket.on("disconnect", () => {
    wasDisconnected = true;
    stores.connection.getState().setConnected(false);
    toasts.showConnectionLost(i18n.t("toasts.connectionLost"));
  });

  socket.on("connect", () => {
    stores.connection.getState().setConnected(true);
    if (wasDisconnected) {
      wasDisconnected = false;
      toasts.showConnectionRestored(i18n.t("toasts.connectionRestored"));
      queryClient.invalidateQueries();
    }
  });

  const context = {
    stores,
    request,
    toasts,
    notificationsStore,
  };

  return (
    <StrictMode>
      <AppContext.Provider value={context}>
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </I18nextProvider>
      </AppContext.Provider>
    </StrictMode>
  );
};

export default init;
