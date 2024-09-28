import {
  BoxIcon,
  Clipboard,
  DollarSign,
  Home,
  ShoppingCart,
  Users,
} from "lucide-react";
import type { MenuItem } from "../interfaces/sidebar.interface";

const classes = "size-4 text-zinc-100";

export const sidebarOptions: MenuItem[] = [
  {
    id: 0,
    href: "/home",
    icon: <Home className={classes} />,
    alt: "HomeIcon",
    title: "Início",
    permission: [],
  },
  {
    id: 1,
    href: "/clientes",
    icon: <Users className={classes} />,
    alt: "ClientsIcon",
    title: "Clientes",
    permission: ["CADASTRO_CLIENTE"],
  },
  {
    id: 2,
    href: "/produtos",
    icon: <BoxIcon className={classes} />,
    alt: "ProductsIcon",
    title: "Produtos",
    permission: ["CADASTRO_PRODUTO"],
  },
  {
    id: 3,
    href: "/forma-de-pagamento",
    icon: <DollarSign className={classes} />,
    alt: "FormaDePagamentoIcon",
    title: "Formas de Pagamento",
    permission: [],
  },
  {
    id: 4,
    href: "/vendas",
    icon: <ShoppingCart className={classes} />,
    alt: "SaleIcon",
    title: "Vendas",
    permission: [],
  },
  {
    id: 5,
    href: "/os",
    icon: <Clipboard className={classes} />,
    alt: "ServiceOrderIcon",
    title: "Ordens de Serviço",
    permission: [],
  },
];
