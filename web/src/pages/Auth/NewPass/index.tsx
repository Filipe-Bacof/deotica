import { toast } from "react-toastify";
import PageStructure from "../components/PageStructure";
import PasswordHidden from "../../../assets/password-hidden.svg";
import PasswordVisible from "../../../assets/password-visible.svg";
import { generateNewPassword } from "../../../api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { NewPass } from "../../../interfaces/auth.interface";

export default function NewPassword() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [token, setToken] = useState("");
  const [passwordRevealed, setPasswordRevealed] = useState(false);
  const navigate = useNavigate();

  async function generateNewPass(data: NewPass) {
    console.log(data);
    generateNewPassword(data)
      .then(() => {
        toast.success("Senha redefinida com sucesso, efetue o seu login!");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        const err = error.response.data.name || error.response.data;
        toast.error(`Ocorreu um erro: ${err}`);
      });
  }

  return (
    <PageStructure>
      <h2 className="font-inter text-3xl font-semibold">
        Cadastre sua nova senha
      </h2>
      <div className="flex w-full flex-col items-center md:items-start">
        <span>E-mail</span>
        <input
          type="text"
          className="h-12 w-full rounded-md px-4 py-2 text-xl"
          value={email}
          placeholder="Digite o seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-col items-center md:items-start">
        <span>Senha</span>
        <div className="relative h-12 w-full">
          <input
            className="absolute h-full w-full flex-shrink-0 rounded px-4 py-2 text-xl"
            type={passwordRevealed ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a sua nova senha"
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
      <div className="flex w-full flex-col items-center md:items-start">
        <span>Token</span>
        <input
          type="text"
          className="h-12 w-full rounded-md px-4 py-2 text-xl"
          value={token}
          placeholder="Digite o token recebido no e-mail"
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <button
        type="button"
        onClick={() => {
          generateNewPass({ email, senha, token });
        }}
        className="mt-6 h-12 w-full rounded-md bg-white hover:scale-[1.02] active:scale-100"
      >
        Salvar
      </button>
    </PageStructure>
  );
}
