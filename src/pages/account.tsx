import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React from "react";

const account = () => {
  const user = useUser();
  if (!user)
    return (
      <div>
        <Link href="/login">Bejelentkezés</Link>
        <Link href="/register">Regisztráció</Link>
      </div>
    );
  return (
    <div>
      <h2>{user.email}</h2>
    </div>
  );
};

export default account;
