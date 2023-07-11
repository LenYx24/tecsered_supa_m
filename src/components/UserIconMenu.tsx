import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserIconMenu = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const [avatarurl, setAvatarurl] = useState<string>("nincs");
  const user = useUser();
  const handlelogout = () => {
    if (user) {
      supabaseClient.auth.signOut().catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    async function getavatarurl() {
      if (!user) return;
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id);
      if (data !== null) {
        setAvatarurl(data[0]?.avatar_url ? data[0].avatar_url : "nincs");
      }
      console.log(error);
    }
    getavatarurl().catch((err) => console.error(err));
  }, []);
  const router = useRouter();
  return (
    <div className="dropdown-end dropdown" data-theme="cupcake">
      {avatarurl !== "nincs" ? (
        <Image
          tabIndex={0}
          src={avatarurl}
          width={20}
          height={20}
          alt=""
          className="btn m-1"
        />
      ) : (
        <svg
          tabIndex={0}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`h-8 w-8 cursor-pointer ${
            router.pathname === "/" ? "bg-main" : "bg-slate-50"
          } hover:text-maindark`}
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
        {user && (
          <li>
            <button
              className="bg-unique text-white hover:bg-unique hover:text-white hover:opacity-80"
              onClick={handlelogout}
            >
              Kijelentkezés
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserIconMenu;
