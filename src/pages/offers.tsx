import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "lib/database.types";
import React, { useEffect, useState } from "react";

const Offers = () => {
  const [offrs, setOffrs] = useState<any>();
  const supabaseClient = useSupabaseClient<Database>();
  async function loadOffrs() {
    const { data, error } = await supabaseClient
      .from("transactions")
      .select("*");
    console.log(data);
    console.log(error);
  }
  useEffect(() => {
    loadOffrs();
  }, []);
  return <div>offers</div>;
};

export default Offers;
