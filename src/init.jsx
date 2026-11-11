import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import {
  addChannelToCache,
  addMessageToCache,
  removeChannelFromCache,
  renameChannelInCache,
} from "./api/chat.js";
import { HttpError } from "./api/client.js";
import useAuthStore from "./stores/useAuthStore.js";
import useConnectionStore from "./stores/useConnectionStore.js";
import useUiStore from "./stores/useUiStore.js";

const init = async (socket) => {
  const queryClient = new QueryClient({
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
  });

  socket.on("connect", () => {
    setConnected(true);
    if (wasDisconnected) {
      wasDisconnected = false;
      queryClient.invalidateQueries();
    }
  });

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
};

export default init;
