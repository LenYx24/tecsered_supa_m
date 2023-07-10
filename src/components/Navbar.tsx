import Link from "next/link";
import React from "react";
import UserIconMenu from "./UserIconMenu";
import { useRouter } from "next/router";

const Navbar = () => {
  const navitems = [
    { href: "/", title: "Főoldal" },
    { href: "/items", title: "Tárgyak" },
    { href: "/myitems", title: "Tárgyaim" },
    { href: "/offers", title: "Ajánlatok" },
    { href: "/messages", title: "Üzenetek" },
  ];
  const router = useRouter();
  const bgcolor = router.pathname === "/" ? "bg-main" : "bg-white";
  return (
    <div
      className={`navbar h-[5vh] text-slate-800 md:px-32 ${bgcolor} ${
        router.pathname !== "/" && "border-b"
      } border-slate-200`}
    >
      <div className="navbar-start">
        <Link
          href="/"
          className="bg-maindark px-5 py-2 text-2xl font-bold italic tracking-widest text-white hover:cursor-pointer"
        >
          TeCseréd
        </Link>
      </div>
      <ul className="navbar-center hidden pl-5 lg:flex">
        {navitems.map((x, i) => (
          <li key={i} className="px-4 hover:underline ">
            <Link href={x.href}>{x.title}</Link>
          </li>
        ))}
      </ul>
      <div className="navbar-end hidden lg:flex">
        <UserIconMenu />
      </div>
      <div className={`navbar-end lg:hidden ${bgcolor}`} data-theme="cupcake">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu-sm dropdown-content menu rounded-box z-[1] mt-3 w-52 bg-slate-200 p-2 shadow"
          >
            {navitems.map((x, i) => (
              <li key={i}>
                <Link href={x.href} className=" active:bg-unique">
                  {x.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/account">Fiók</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
