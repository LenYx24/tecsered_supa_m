import Link from "next/link";
import React from "react";
import UserIconMenu from "./UserIconMenu";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 px-32">
      <div className="navbar-start">
        <a className="btn-ghost btn text-xl normal-case">TeCseréd</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Főoldal</Link>
          </li>
          <li>
            <Link href="/items">Tárgyak</Link>
          </li>
          <li>
            <Link href="/myitems">Tárgyaim</Link>
          </li>
          <li>
            <Link href="/offers">Ajánlatok</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <UserIconMenu />
      </div>
    </div>
  );
};

export default Navbar;
