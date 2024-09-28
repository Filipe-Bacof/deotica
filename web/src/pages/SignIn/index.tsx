import { useState } from "react";
import PasswordHidden from "../../assets/password-hidden.svg";
import PasswordVisible from "../../assets/password-visible.svg";
import type { SignIn as Login } from "../../interfaces/auth.interface";
import { toast } from "react-toastify";
import { useAuthStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";

export default function SignIn() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRevealed, setPasswordRevealed] = useState(false);
  const { handleAddUser } = useAuthStore((state) => state);
  const navigate = useNavigate();

  async function sendDataToDB(data: Login) {
    console.log(data);
    login(data)
      .then((data) => {
        console.log(data);
        localStorage.setItem("@deoticaToken", data.token);
        handleAddUser(data.user);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        const err = error.response.data.name || error.response.data;
        toast.error(`Ocorreu um erro: ${err}`);
      });
  }

  return (
    <div className="flex h-screen flex-col items-center justify-evenly bg-blueDeotica md:flex-row">
      <div className="flex flex-col items-center px-10">
        {/* <img
          className="mt-10 h-[6.625rem] w-[30.6875rem] md:mt-0 "
          src={logoDeotica}
          alt="logoDeotica"
          width={30.6875}
          height={10}
        /> */}
        <h1 className="font-deotica text-8xl font-extrabold uppercase">
          Deotica
        </h1>
        <p className="py-2 text-center font-deotica text-3xl font-normal text-white">
          um novo olhar em sua vida
        </p>
      </div>
      <div className="flex w-full max-w-[80%] flex-col items-center gap-4 md:max-w-[30%]">
        <h2 className="font-inter text-3xl font-semibold">Faça o seu login</h2>
        <div className="flex w-full flex-col items-center md:items-start">
          <span>E-mail</span>
          <input
            type="text"
            className="h-12 w-full rounded-md px-4 py-2 text-xl"
            value={user}
            placeholder="Digite o seu e-mail"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col items-center md:items-start">
          <span>Senha</span>
          <div className="relative h-12 w-full">
            <input
              className="absolute h-full w-full flex-shrink-0 rounded px-4 py-2 text-xl"
              type={passwordRevealed ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a sua senha"
            />
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              className="absolute right-0 cursor-pointer p-4"
              onClick={() => setPasswordRevealed((state) => !state)}
            >
              {passwordRevealed ? (
                <img src={PasswordVisible} alt="Senha Exibida" />
              ) : (
                <img src={PasswordHidden} alt="Senha Oculta" />
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            sendDataToDB({ email: user, senha: password });
          }}
          className="mt-6 h-12 w-full rounded-md bg-white hover:scale-[1.02] active:scale-100"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
