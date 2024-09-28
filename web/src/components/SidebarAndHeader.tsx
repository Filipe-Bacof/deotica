import type { ReactNode } from "react";
import type { MenuItem } from "../interfaces/sidebar.interface";
import type { User } from "../interfaces/user.interface";
import { Link } from "react-router-dom";
import { Permission } from "./Permission";
import { useAuthStore } from "../stores/userStore";
import { sidebarOptions } from "../utils/sidebarOptions";
import IconLogout from "../icons/IconLogout";

type SidebarAndHeaderProps = {
  children: ReactNode;
  selected: string;
};

export default function SidebarAndHeader({
  children,
  selected,
}: SidebarAndHeaderProps) {
  const user = useAuthStore((state: { user: User | null }) => state.user);
  const { handleRemoveUser } = useAuthStore((state) => state);

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

  const redirectToExternalURL = (externalURL: string) => {
    window.location.href = externalURL;
  };

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <nav className="flex-col items-center bg-blueDeotica pt-8 text-white md:flex md:h-screen md:px-5">
        <p className="text-center font-deotica text-3xl font-extrabold uppercase">
          Deotica
        </p>
        <div className="mx-3 my-3 flex w-full flex-row justify-between gap-2 md:my-8 md:flex-col">
          {sidebarOptions.map((item: MenuItem) => {
            if (item.permission && item.permission?.length > 0) {
              return (
                <Permission key={item.id} permissions={item.permission}>
                  <Link
                    className={`flex h-10 w-10 items-center gap-2 rounded-md px-3 md:w-56 ${
                      item.title === selected && "bg-white/20"
                    }`}
                    key={item.id}
                    to={item.href}
                  >
                    {item.icon}
                    <span className="hidden w-fit md:flex">{item.title}</span>
                  </Link>
                </Permission>
              );
              // biome-ignore lint/style/noUselessElse: <explanation>
            } else {
              return (
                <Link
                  className={`flex h-10 w-10 items-center gap-2 rounded-md px-3 md:w-56 ${
                    item.title === selected && "bg-white/20"
                  }`}
                  key={item.id}
                  to={item.href}
                >
                  {item.icon}
                  <span className="hidden w-fit md:flex">{item.title}</span>
                </Link>
              );
            }
          })}
          <div className="flex flex-col">
            <button
              type="button"
              className="flex h-10 w-10 items-center gap-2 rounded-md px-3 md:w-56"
              onClick={() => {
                localStorage.removeItem("@deoticaToken");
                localStorage.removeItem("@deoticaUser");
                handleRemoveUser();
                redirectToExternalURL("https://www.deoticalanding.com.br");
              }}
            >
              <IconLogout />
              <span className="hidden w-fit md:flex">Sair</span>
            </button>
          </div>
        </div>
      </nav>
      <section className="flex h-screen flex-grow flex-col">
        <header className="flex h-14 w-full flex-row items-center justify-between border-b-2 border-gray-500/30 bg-[#F2F2F3] px-8 py-8">
          <div className="flex flex-row items-center justify-center gap-3">
            <p className="text-verde-vidaia text-2xl font-bold">
              {saudacao()}, {user ? user.nome.split(" ")[0] : "Usuário"}
            </p>
            <h2>{user ? user.perfil.nome : "Perfil"}</h2>
            <p className="hidden text-sm text-[#606174] md:block">
              hoje é dia {today()}
            </p>
          </div>
        </header>
        <main className="m flex-grow overflow-y-scroll bg-[#F2F2F3]">
          {children}
        </main>
      </section>
    </div>
  );
}
