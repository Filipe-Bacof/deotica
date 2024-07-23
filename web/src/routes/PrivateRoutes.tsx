import { Navigate, Outlet } from "react-router-dom";
import { getToken, isTokenValid } from "../utils/tokenMiddleware";

export function PrivateRoutes() {
  const token = getToken();
  const validToken = isTokenValid(token);

  return validToken ? <Outlet /> : <Navigate to="/" />;
}
