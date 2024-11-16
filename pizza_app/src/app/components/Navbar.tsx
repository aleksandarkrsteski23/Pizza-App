import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-2xl ps-10 pe-20">
      <nav className="flex flex-row justify-between items-center text-tomatoRed">
        <Link href={"/"}>
          <img src="/PizzaHubLogo.png" alt="Logo" width={80} />
        </Link>
        <ul className="flex flex-row gap-5 font-bold text-goldenYellow">
          <li>
            <Link href={"/about"}>About us</Link>
          </li>
          <li>
            <Link href={"/menu"}>Menu</Link>
          </li>
          <li>
            <Link href={"/login"}>Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
