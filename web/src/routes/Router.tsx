import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import { PrivateRoutes } from "./PrivateRoutes";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<SignIn />} />

          {/* Todas as Rotas Privadas da Aplicação abaixo: */}
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route>
          {/* Qualquer Rota Aleatória manda pro Login Também */}
          <Route path="*" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
