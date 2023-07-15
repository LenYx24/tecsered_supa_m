import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import React, { useRef, useState } from "react";
import registersvg from "../../public/register.svg";
import Image from "next/image";
import useCheckCredentials from "~/hooks/useCheckCredentials";
import Link from "next/link";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const chref = useRef<HTMLInputElement>(null);
  const [infotext, setInfotext] = useState<string>("");
  const {
    errortext,
    setErrortext,
    checkUniqueEmail,
    checkEmail,
    checkPassword,
    checkUniqueUsername,
    checkUsername,
    checkTermsandcond,
  } = useCheckCredentials();

  const supabaseClient = useSupabaseClient<Database>();
  const handleRegister = () => {
    async function handle() {
      if (
        checkEmail(email) &&
        checkPassword(password) &&
        (await checkUniqueUsername(username).then((x) => x)) &&
        checkUsername(username) &&
        checkTermsandcond(
          chref.current?.checked ? chref.current?.checked : false
        )
      ) {
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
        } else {
          setInfotext(
            "Sikeres regisztráció! Elküldtünk a megerősítő emailt a fiókjára"
          );
        }
      }
    }
    handle().catch((err) => console.error(err));
  };
  return (
    <div className="mx-auto items-center justify-center gap-4 p-5 lg:flex lg:w-[80vw]">
      <div className="form-control mx-auto md:w-[70%] lg:mx-0 lg:w-auto">
        <label className="input-group py-1">
          <span>Felhasználónév</span>
          <input
            type="text"
            placeholder="Név..."
            className="input-bordered input-primary input w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <p className="mx-4 mb-1 text-xs italic">
          megjegyzés: min. 4 karakter hosszú
        </p>
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
        <p className="mx-4 mb-4 text-xs italic">
          megjegyzés: min. 8 karakter hosszú <br /> tartalmaznia kell egy
          nagybetűt és egy számot
        </p>
        <label className="label cursor-pointer">
          <span className="label-text">
            Elfogadod a{" "}
            <Link href="/termsofuse">felhasználási feltételeket?</Link>
          </span>
          <input type="checkbox" ref={chref} className="checkbox" />
        </label>
        <button
          onClick={handleRegister}
          className="btn-outline btn w-full border-none bg-unique text-white hover:bg-unique hover:opacity-80"
        >
          Regisztráció
        </button>
        <p className=" mx-4 my-2 text-xs">
          Már van felhasználód?{" "}
          <Link className="link" href="/login">
            Jelentkezz be!
          </Link>
        </p>
        {errortext && (
          <div className="fixed bottom-4 left-0 right-0 m-auto flex h-16 items-center rounded bg-unique p-4 md:w-[50%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              onClick={() => setErrortext("")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errortext}</span>
          </div>
        )}
        {infotext && (
          <div className="fixed bottom-20 left-0 right-0 m-auto flex h-16 items-center rounded bg-main p-4 md:w-[50%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              onClick={() => setInfotext("")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{infotext}</span>
          </div>
        )}
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
