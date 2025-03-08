"use client";

import { useScroll } from "@/hook/useScroll/useScroll";
import Link from "next/link";
import { twJoin } from "tailwind-merge";

const Navbar = () => {
  const isScrolled = useScroll();

  return (
    <div
      className={twJoin(
        "bg-slate-900/90 w-full flex justify-center items-center fixed z-100 duration-300 px-10 backdrop-blur-sm",
        isScrolled ? "h-[50px]" : "h-[70px]"
      )}
    >
      <Link className="page-content text-2xl" href={"/"}>
        FILM INFO
      </Link>
      <div className="flex flex-row gap-10 mr-16">
        <Link href={"/movie"} className="hover:underline">
          EKSPLORUJ
        </Link>
        <Link href={"/search"} className="hover:underline">
          SZUKAJ
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
