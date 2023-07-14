import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import React, { useState } from "react";
import registersvg from "../../public/register.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import useCheckCredentials from "~/hooks/useCheckCredentials";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const {
    errortext,
    setErrortext,
    checkUniqueEmail,
    checkEmail,
    checkPassword,
    checkUniqueUsername,
  } = useCheckCredentials();

  const supabaseClient = useSupabaseClient<Database>();
  const router = useRouter();
  const handleRegister = async () => {
    async function handle() {
      const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            avatar_url: "",
          },
        },
      });
      if (error) {
        setErrortext(error.message);
      } else if (!checkUniqueEmail(data.user?.identities)) {
        return;
      }
    }
    if (
      checkEmail(email) &&
      checkPassword(password) &&
      (await checkUniqueUsername(username).then((x) => x))
    ) {
      handle().catch((err) => console.error(err));
    }
  };
  return (
    <div className="mx-auto items-center justify-center gap-4 p-5 lg:flex lg:w-[80vw]">
      <div className="form-control mx-auto md:w-[70%] lg:mx-0 lg:w-auto">
        <label className="input-group py-2">
          <span>Felhasználónév</span>
          <input
            type="text"
            placeholder="Keresztnév"
            className="input-bordered input-primary input w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          onClick={() => handleRegister}
          className="btn-outline btn w-full border-none bg-unique text-white hover:bg-unique hover:opacity-80"
        >
          Regisztráció
        </button>
        <p>{errortext}</p>
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
