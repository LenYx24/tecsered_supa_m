import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import type { Database } from "lib/database.types";
import loginsvg from "../../public/Authentication-bro.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import useCheckCredentials from "~/hooks/useCheckCredentials";

const LoginPage = () => {
  const user = useUser();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const supabaseClient = useSupabaseClient<Database>();
  const {
    errortext,
    setErrortext,
    checkUniqueEmail,
    checkEmail,
    checkPassword,
  } = useCheckCredentials();
  const router = useRouter();
  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("items").select("*");
      console.log(data);
    }
    // Only run query once user is logged in.
    if (user) loadData().catch((err) => console.error(err));
  }, [user, supabaseClient]);
  const handleLogin = () => {
    const loginas = async () => {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        if (error.message === "Invalid login credentials") {
          setErrortext("Rossz bejelentkezési adatokat adtál meg!");
        } else {
          setErrortext(error.message);
        }
      } else {
        router.push("/").catch((x) => console.log(x));
      }
    };
    if (checkEmail(email) && password.length !== 0) {
      loginas().catch((err) => setErrortext(err as string));
    }
  };

  return (
    <div className="mx-auto items-center justify-center gap-4 p-5 md:flex md:w-[80vw]">
      <div className="form-control mx-auto md:w-[70%] lg:mx-0 lg:w-auto">
        <label className="input-group py-2">
          <span>Email</span>
          <input
            type="email"
            placeholder="Email cím"
            className="input-bordered input-primary input w-full"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
          onClick={handleLogin}
          className="btn-outline btn w-full border-none bg-unique text-white hover:bg-unique hover:opacity-80"
        >
          Bejelentkezés
        </button>
        <p className="italic">{errortext}</p>
      </div>

      <Image
        className="mx-auto md:mx-0"
        width={300}
        height={300}
        alt="login animáció"
        src={loginsvg as string}
      />
    </div>
  );
};

export default LoginPage;
