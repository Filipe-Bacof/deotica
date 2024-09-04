import { useState } from "react";

export default function SignIn() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

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
        <p className="font-deotica py-2 text-center text-3xl font-normal text-white">
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
          <input
            type="password"
            className="h-12 w-full rounded-md px-4 py-2 text-xl"
            value={password}
            placeholder="Digite a sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="mt-6 h-12 w-full rounded-md bg-white hover:scale-[1.02] active:scale-100">
          Entrar
        </button>
      </div>
    </div>
  );
}
