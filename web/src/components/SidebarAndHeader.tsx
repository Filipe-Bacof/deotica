import type { ReactNode } from "react";
import type { MenuItem } from "../interfaces/sidebar.interface";
import type { User } from "../interfaces/user.interface";
import { Link, useNavigate } from "react-router-dom";
import { Permission } from "./Permission";
import { useAuthStore } from "../stores/userStore";
import { sidebarOptions } from "../utils/sidebarOptions";
import { LogOut } from "lucide-react";

type SidebarAndHeaderProps = {
  children: ReactNode;
  selected: string;
  scroll?: boolean;
};

export default function SidebarAndHeader({
  children,
  selected,
  scroll = false,
}: SidebarAndHeaderProps) {
  const user = useAuthStore((state: { user: User | null }) => state.user);
  const navigate = useNavigate();

  function today() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, "0");
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");

    return `${dia}/${mes}`;
  }

  function saudacao() {
    const dataAtual = new Date();
    const hora = dataAtual.getHours();

    if (hora >= 6 && hora < 12) {
      return "Bom dia";
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (hora >= 12 && hora < 18) {
      return "Boa tarde";
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      return "Boa noite";
    }
  }

  // const redirectToExternalURL = (externalURL: string) => {window.location.href = externalURL};

  function ButtonNavigation(item: MenuItem) {
    return (
      <Link
        className={`flex h-fit w-fit items-center gap-2 rounded-md border border-white/30 px-3 md:h-10 md:w-56 md:border-none ${
          item.title === selected && "bg-white/20"
        }`}
        key={item.id}
        to={item.href}
      >
        {item.icon}
        <span className="w-fit text-nowrap">{item.title}</span>
      </Link>
    );
  }

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <nav className="flex-col items-center bg-blueDeotica pt-8 text-white md:flex md:h-screen md:px-5">
        <p className="text-center font-deotica text-3xl font-extrabold uppercase">
          Deotica
        </p>
        <div className="mx-3 my-3 flex w-full flex-row flex-wrap justify-center gap-1 md:my-8 md:flex-col md:justify-between md:gap-2">
          {sidebarOptions.map((item: MenuItem) => {
            return item.permission && item.permission?.length > 0 ? (
              <Permission key={item.id} permissions={item.permission}>
                {ButtonNavigation(item)}
              </Permission>
            ) : (
              ButtonNavigation(item)
            );
          })}
          <div className="flex flex-col">
            <button
              type="button"
              className="flex h-fit w-fit items-center gap-2 rounded-md border border-white/30 px-3 md:h-10 md:w-56 md:border-none"
              onClick={() => {
                localStorage.removeItem("@deoticaToken");
                localStorage.removeItem("@deoticaUser");
                // redirectToExternalURL("https://www.deoticalanding.com.br");
                navigate("/login");
              }}
            >
              <LogOut className="size-4 text-zinc-100" />
              <span className="w-fit">Sair</span>
            </button>
          </div>
        </div>
      </nav>
      <section className="flex h-screen flex-grow flex-col">
        <header className="hidden h-14 w-full flex-row items-center justify-between border-b-2 border-gray-500/30 bg-[#F2F2F3] px-8 py-8 md:flex">
          <div className="flex flex-row items-center justify-center gap-3">
            <p className="text-2xl font-bold text-black">
              {saudacao()}, {user ? user.nome.split(" ")[0] : "Usuário"}
            </p>
            <h2>{user ? user.perfil.nome : "Perfil"}</h2>
            <p className="hidden text-sm text-[#606174] md:block">
              hoje é dia {today()}
            </p>
          </div>
        </header>
        <main
          className={`flex-grow bg-[#F2F2F3] ${scroll ? "md:overflow-y-scroll" : "md:overflow-hidden"}`}
        >
          {children}
        </main>
      </section>
    </div>
  );
}
