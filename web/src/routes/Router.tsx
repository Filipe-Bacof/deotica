import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import { PrivateRoutes } from "./PrivateRoutes";
import SignIn from "../pages/Auth/SignIn";
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
import Sales from "../pages/Sales";
import CreateSale from "../pages/Sales/Create";
import ViewSale from "../pages/Sales/View";
import ServiceOrder from "../pages/ServiceOrder";
import ViewServiceOrder from "../pages/ServiceOrder/View";
import Mail from "../pages/Mail";
import NFE from "../pages/Sales/NFE";
import ForgotPassword from "../pages/Auth/Forgot";
import NewPassword from "../pages/Auth/NewPass";

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
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

            <Route path="/vendas" element={<Sales />} />
            <Route path="/vendas/novo" element={<CreateSale />} />
            <Route path="/vendas/view/:id" element={<ViewSale />} />

            <Route path="/os" element={<ServiceOrder />} />
            <Route path="/os/view/:id" element={<ViewServiceOrder />} />

            <Route path="/email" element={<Mail />} />
          </Route>
          {/* Todas as Rotas Públicas da Aplicação abaixo: */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/newpass" element={<NewPassword />} />
          <Route path="/nfe/:id" element={<NFE />} />
          {/* Qualquer Rota Aleatória manda pro Login Também */}
          <Route path="*" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
