import { useState } from "react";

export default function SignIn() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex h-screen flex-col items-center justify-evenly bg-blueDeotica md:flex-row">
      <div className="flex flex-col items-end px-10">
        {/* <img
          className="mt-10 h-[6.625rem] w-[30.6875rem] md:mt-0 "
          src={logoDeotica}
          alt="logoDeotica"
          width={30.6875}
          height={10}
        /> */}
        <h1>Deotica</h1>
        <p className="py-2 text-center font-montserrat text-2xl font-semibold text-white">
          um novo olhar em sua vida
        </p>
      </div>
      <div>
        <input
          type="text"
          className=""
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          className=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  );
}
