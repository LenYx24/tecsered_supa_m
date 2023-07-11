import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import React, { useState } from "react";
import registersvg from "../../public/register.svg";
import Image from "next/image";

const Register = () => {
  const [firstname, setFirstname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const handleRegister = () => {
    async function handle() {
      const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: firstname,
            avatar_url: "nincs",
          },
        },
      });
      if (error) console.log(error);
      else alert("Sikeres regisztáció!");
      console.log(data);
    }
    handle().catch((err) => console.error(err));
  };
  return (
    <div className="mx-auto items-center justify-center gap-4 p-5 lg:flex lg:w-[80vw]">
      <div className="form-control mx-auto md:w-[70%] lg:mx-0 lg:w-auto">
        <label className="input-group py-2">
          <span>Keresztnév</span>
          <input
            type="text"
            placeholder="Keresztnév"
            className="input-bordered input-primary input w-full"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>
        <label className="input-group py-2">
          <span>Email</span>
          <input
            type="email"
            placeholder="Email cím"
            className="input-bordered input-primary input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input-group py-2">
          <span>Jelszó</span>
          <input
            type="password"
            placeholder="Jelszó"
            className="input-bordered input-primary input w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          onClick={handleRegister}
          className="btn-outline btn w-full border-none bg-unique text-white hover:bg-unique hover:opacity-80"
        >
          Regisztráció
        </button>
      </div>

      <Image
        className="mx-auto lg:mx-0"
        width={400}
        height={400}
        alt="login animáció"
        src={registersvg as string}
      />
    </div>
  );
};

export default Register;
