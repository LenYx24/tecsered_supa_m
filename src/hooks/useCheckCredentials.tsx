import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { UserIdentity } from "@supabase/supabase-js";
import type { Database } from "lib/database.types";
import { useState } from "react";

const useCheckCredentials = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const [errortext, setErrortext] = useState<string>("");

  function checkEmail(email: string): boolean {
    const regexemail = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
    if (!regexemail.test(email)) {
      setErrortext("Rosszul adtad meg az email címet!");
      return false;
    }
    return true;
  }
  function checkUniqueEmail(identities: UserIdentity[] | undefined): boolean {
    if (identities && identities.length === 0) {
      setErrortext("Már van egy ugyanilyen email címmel rendelkező fiók");
      return false;
    }
    return true;
  }
  function checkUsername(username: string): boolean {
    if (username.length <= 4) {
      setErrortext(
        "Legalább 4 betű hosszúnak kell lennie a felhasználónévnek!"
      );
      return false;
    } else if (username.length > 255) {
      setErrortext("Túll hosszú a felhasználóneved");
      return false;
    }
    return true;
  }
  async function checkUniqueUsername(username: string) {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("username")
      .eq("username", username);
    if (error) {
      setErrortext(error.message);
    }
    if (data && data.length !== 0) {
      setErrortext("Már van ilyen nevű felhasználó");
      return false;
    }
    return true;
  }
  function checkPassword(password: string): boolean {
    if (password.length < 8) {
      setErrortext(
        "Túl rövid jelszót adtál meg (minimum 8 karakter hosszúnak kell lennie)!"
      );
      return false;
    }
    if (password.length > 255) {
      setErrortext("Túl hosszú jelszót adtál meg!");
      return false;
    }
    const regexnum = /[0-9]/;
    if (!regexnum.test(password)) {
      setErrortext("Tartalmaznia kell a jelszónak legalább egy számot");
      return false;
    }
    const regexuppercase = /[A-Z]/;
    if (!regexuppercase.test(password)) {
      setErrortext(
        "Tartalmaznia kell a jelszónak legalább egy nagybetűs karaktert"
      );
      return false;
    }
    return true;
  }
  function checkTermsandcond(checked: boolean): boolean {
    if (!checked) {
      setErrortext(
        "Ahhoz hogy regisztrálj el kell fogadnod a felhasználási feltételeket!"
      );
      return false;
    }
    return true;
  }
  return {
    errortext,
    setErrortext,
    checkEmail,
    checkPassword,
    checkUniqueUsername,
    checkUniqueEmail,
    checkUsername,
    checkTermsandcond,
  };
};

export default useCheckCredentials;
