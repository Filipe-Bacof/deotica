import type { ReactNode } from "react";

type PageStructureProps = {
  children: ReactNode;
};

export default function PageStructure({ children }: PageStructureProps) {
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
        <h1 className="font-deotica text-6xl font-extrabold uppercase md:text-8xl">
          Deotica
        </h1>
        <p className="py-2 text-center font-deotica text-xl font-normal text-white md:text-3xl">
          um novo olhar em sua vida
        </p>
      </div>
      <div className="flex w-full max-w-[80%] flex-col items-center gap-4 md:max-w-[30%]">
        {children}
      </div>
    </div>
  );
}
