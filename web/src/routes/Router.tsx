import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import Landing from "../pages/Landing";
import { PrivateRoutes } from "./PrivateRoutes";
import Home from "../pages/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* Todas as Rotas Privadas da Aplicação abaixo: */}
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route>
          {/* Qualquer Rota Aleatória manda pro Login Também */}
          {/* <Route path="*" element={<SignIn />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
