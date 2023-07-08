import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import type { Database } from "lib/database.types";

const LoginPage = () => {
  const user = useUser();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const supabaseClient = useSupabaseClient<Database>();

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
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) console.log(error);
      console.log(data);
    };
    loginas().catch((err) => console.error(err));
  };
  if (!user)
    return (
      <div className="mx-auto w-[40vw] justify-center gap-4 p-5">
        <div className="form-control">
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
        <button onClick={handleLogin} className="btn-primary btn">
          Bejelentkezés
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

export default LoginPage;
