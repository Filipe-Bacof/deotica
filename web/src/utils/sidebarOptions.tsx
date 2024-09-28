import IconBoxSeamFill from "../icons/IconBoxSeamFill";
import IconClipboardCheckFill from "../icons/IconClipboardCheckFill";
import IconHome from "../icons/IconHome";
import IconMoneyBill1Wave from "../icons/IconMoneyBill1Wave";
import IconPeopleFill from "../icons/IconPeopleFill";
import IconSale from "../icons/IconSale";
import type { MenuItem } from "../interfaces/sidebar.interface";

export const sidebarOptions: MenuItem[] = [
  {
    id: 0,
    href: "/home",
    icon: <IconHome />,
    alt: "HomeIcon",
    title: "Início",
    permission: [],
  },
  {
    id: 1,
    href: "/clientes",
    icon: <IconPeopleFill />,
    alt: "ClientsIcon",
    title: "Clientes",
    permission: ["CADASTRO_CLIENTE"],
  },
  {
    id: 2,
    href: "/produtos",
    icon: <IconBoxSeamFill />,
    alt: "ProductsIcon",
    title: "Produtos",
    permission: ["CADASTRO_PRODUTO"],
  },
  {
    id: 3,
    href: "/forma-de-pagamento",
    icon: <IconMoneyBill1Wave />,
    alt: "FormaDePagamentoIcon",
    title: "Formas de Pagamento",
    permission: [],
  },
  {
    id: 4,
    href: "/vendas",
    icon: <IconSale />,
    alt: "SaleIcon",
    title: "Vendas",
    permission: [],
  },
  {
    id: 5,
    href: "/os",
    icon: <IconClipboardCheckFill />,
    alt: "ServiceOrderIcon",
    title: "Ordens de Serviço",
    permission: [],
  },
];
