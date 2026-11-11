import { Navigate, Outlet } from "react-router";

import useAuthStore from "../stores/useAuthStore.js";

const RequireAuth = () => {
  const token = useAuthStore((state) => state.token);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
