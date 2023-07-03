import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "lib/database.types";
import React, { useState } from "react";

const register = () => {
  const [firstname, setFirstname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const handleRegister = async () => {
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
  };
  if (!user)
    return (
      <div className="mx-auto w-[40vw] justify-center gap-4 p-5">
        <div className="form-control">
          <label className="input-group py-2">
            <span>Keresztnév</span>
            <input
              type="text"
              placeholder="Keresztnév"
              className="input-bordered input-primary input w-full max-w-xs"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label className="input-group py-2">
            <span>Email</span>
            <input
              type="email"
              placeholder="Email cím"
              className="input-bordered input-primary input w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input-group py-2">
            <span>Jelszó</span>
            <input
              type="password"
              placeholder="Jelszó"
              className="input-bordered input-primary input w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleRegister} className="btn-primary btn">
          Regisztráció
        </button>
      </div>
    );

  return (
    <>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default register;
