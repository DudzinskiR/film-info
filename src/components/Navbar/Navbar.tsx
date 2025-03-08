"use client";

import { useScroll } from "@/hook/useScroll/useScroll";
import Link from "next/link";
import { twJoin } from "tailwind-merge";

const Navbar = () => {
  const isScrolled = useScroll();

  return (
    <div
      className={twJoin(
        "bg-background-secondary/90 w-full flex justify-center fixed z-100 duration-300 px-10 backdrop-blur-sm",
        isScrolled ? "h-[50px]" : "h-[70px]"
      )}
    >
      <div className="page-content flex justify-between items-center h-full">
        <Link
          className="text-lg md:text-2xl font-anton min-w-24 hover:text-gray-300"
          href={"/"}
        >
          FILM INFO
        </Link>
        <div className="flex flex-row gap-10 mr-16 md:text-base text-xs">
          <Link href={"/movie"} className="hover:underline text-center">
            EKSPLORUJ
          </Link>
          <Link href={"/search"} className="hover:underline">
            SZUKAJ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
