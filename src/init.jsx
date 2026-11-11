import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import { HttpError } from "./api/client.js";
import useAuthStore from "./stores/useAuthStore.js";
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

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
};

export default init;
