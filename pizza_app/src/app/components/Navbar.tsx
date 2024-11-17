"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session }: any = useSession();
  console.log(session);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-2xl ps-10 pe-20">
      <nav className="flex flex-row justify-between items-center text-tomatoRed">
        <Link href={"/"}>
          <img src="/PizzaHubLogo.png" alt="Logo" width={80} />
        </Link>
        <ul className="flex flex-row gap-10 font-bold text-goldenYellow uppercase">
          <li>
            <Link href={"/about"}>About us</Link>
          </li>
          <li>
            <Link href={"/menu"}>Menu</Link>
          </li>
          {!session ? (
            <>
              <li>
                <Link href={"/login"}>Login</Link>
              </li>
              <li>
                <Link href={"/register"}>Register</Link>
              </li>
            </>
          ) : (
            <>
              {" "}
              {session.user?.username || session.user?.email}
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="bg-blue-600"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
