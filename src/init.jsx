import { StrictMode } from "react";

import App from "./App.jsx";

const init = async (socket) => {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

export default init;
