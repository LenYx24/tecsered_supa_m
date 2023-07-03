import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "lib/database.types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const UserIconMenu = () => {
  const [profilePic, setProfilePic] = useState<string | null>("");
  const supabaseClient = useSupabaseClient<Database>();

  const user = useUser();
  const handlelogout = () => {
    if (user) {
      supabaseClient.auth.signOut();
    }
  };
  return (
    <div className="dropdown-end dropdown">
      {profilePic ? (
        <Image tabIndex={0} src={profilePic} alt="" className="btn m-1" />
      ) : (
        <svg
          tabIndex={0}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8 cursor-pointer hover:text-slate-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      )}

      <ul className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
        <li>
          <Link href="/account">Fiók</Link>
        </li>
        <li>
          <button className="btn-error btn" onClick={handlelogout}>
            Kijelentkezés
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserIconMenu;
