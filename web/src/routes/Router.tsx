import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import { PrivateRoutes } from "./PrivateRoutes";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Clients from "../pages/Clients";
import CreateClient from "../pages/Clients/Create";
import EditClient from "../pages/Clients/Edit";
import ViewClient from "../pages/Clients/View";
import Products from "../pages/Products";
import Mail from "../pages/Mail";

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<SignIn />} />

          {/* Todas as Rotas Privadas da Aplicação abaixo: */}
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/clientes" element={<Clients />} />
            <Route path="/clientes/novo" element={<CreateClient />} />
            <Route path="/clientes/edit/:id" element={<EditClient />} />
            <Route path="/clientes/view/:id" element={<ViewClient />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/email" element={<Mail />} />
          </Route>
          {/* Qualquer Rota Aleatória manda pro Login Também */}
          <Route path="*" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
