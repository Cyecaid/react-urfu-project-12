import * as Sentry from "@sentry/react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";

import init from "./init.jsx";

const dsn = import.meta.env.VITE_BUGSINK_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    sendDefaultPii: false,
  });
}

const logError = (error, errorInfo) => console.error(error, errorInfo?.componentStack);

const app = async () => {
  const root = ReactDOM.createRoot(document.querySelector("#root"), {
    onUncaughtError: Sentry.reactErrorHandler(logError),
    onCaughtError: Sentry.reactErrorHandler(logError),
    onRecoverableError: Sentry.reactErrorHandler(logError),
  });
  const socket = io();
  root.render(await init(socket));
};

app();
