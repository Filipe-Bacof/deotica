import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import { PrivateRoutes } from "./PrivateRoutes";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import Clients from "../pages/Clients";
import CreateClient from "../pages/Clients/Create";
import EditClient from "../pages/Clients/Edit";
import ViewClient from "../pages/Clients/View";
import Products from "../pages/Products";
import CreateProduct from "../pages/Products/Create";
import EditProduct from "../pages/Products/Edit";
import ViewProduct from "../pages/Products/View";
import PaymentMethods from "../pages/Payment";
import CreatePaymentMethod from "../pages/Payment/Create";
import EditPaymentMethod from "../pages/Payment/Edit";
import ViewPaymentMethod from "../pages/Payment/View";
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
            <Route path="/produtos/novo" element={<CreateProduct />} />
            <Route path="/produtos/edit/:id" element={<EditProduct />} />
            <Route path="/produtos/view/:id" element={<ViewProduct />} />

            <Route path="/forma-de-pagamento" element={<PaymentMethods />} />
            <Route
              path="/forma-de-pagamento/novo"
              element={<CreatePaymentMethod />}
            />
            <Route
              path="/forma-de-pagamento/edit/:id"
              element={<EditPaymentMethod />}
            />
            <Route
              path="/forma-de-pagamento/view/:id"
              element={<ViewPaymentMethod />}
            />

            <Route path="/email" element={<Mail />} />
          </Route>
          {/* Qualquer Rota Aleatória manda pro Login Também */}
          <Route path="*" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
