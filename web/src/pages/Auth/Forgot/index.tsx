import { toast } from "react-toastify";
import PageStructure from "../components/PageStructure";
import { forgotPassword } from "../../../api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Forgot } from "../../../interfaces/auth.interface";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function requestNewPass(data: Forgot) {
    console.log(data);
    forgotPassword(data)
      .then(() => {
        toast.success(`Token para redefinir senha enviado para ${email}`);
        navigate("/newpass");
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
        Solicitar uma nova senha
      </h2>
      <div className="flex w-full flex-col items-center md:items-start">
        <span>Digite o seu e-mail</span>
        <input
          type="text"
          className="h-12 w-full rounded-md px-4 py-2 text-xl"
          value={email}
          placeholder="Digite o seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="button"
        onClick={() => {
          requestNewPass({ email });
        }}
        className="mt-6 h-12 w-full rounded-md bg-white hover:scale-[1.02] active:scale-100"
      >
        Solicitar nova senha
      </button>
    </PageStructure>
  );
}
