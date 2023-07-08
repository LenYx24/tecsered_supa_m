import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import React, { useEffect, useState } from "react";

const Offers = () => {
  const [offrs, setOffrs] =
    useState<Database["public"]["Tables"]["transactions"]["Row"][]>();
  const supabaseClient = useSupabaseClient<Database>();

  useEffect(() => {
    async function loadOffrs() {
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*");
      console.log(data);
      console.log(error);
    }
    loadOffrs().catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <h1>Ajánlatok</h1>
      {offrs?.map((x) => (
        <div key={x.id}>{x.initiator}</div>
      ))}
    </div>
  );
};

export default Offers;
