"use client";

import Image from "next/image";
import Logo from "../../../public/Logo.svg";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  const redirectToHome = () => {
    router.push("/");
  };

  return (
    <header className="flex items-center bg-white mx-auto max-w-[1920px] justify-center lg:justify-between py-4 lg:p-4">
      <div
        className="flex gap-2 items-center text-gray-800 font-bold text-2xl ml-6 cursor-pointer"
        onClick={redirectToHome}
      >
        <Image alt="logo" src={Logo} width={55} height={55} />
        <h1>Países do mundo</h1>
      </div>
    </header>
  );
};
