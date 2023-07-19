import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import React, { useEffect, useState } from "react";

const Offers = () => {
  const [offerslist, setOfferslist] =
    useState<Database["public"]["Tables"]["transactions"]["Row"][]>();
  const [receivedoffrs, setReceivedOffrs] =
    useState<Database["public"]["Tables"]["transactions"]["Row"][]>();
  const [activetabindex, setActivetabindex] = useState<number>(0);
  const supabaseClient = useSupabaseClient<Database>();
  const user = useSupabaseClient().auth.getUser();
  useEffect(() => {
    async function loadOffrs() {
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("initiator", (await user).data?.user?.id);
      console.log(data);
      console.log(error);
      if (data === null) return;
      setOfferslist(data);
      const { data: rec, error: recerr } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("receiver", (await user).data?.user?.id);
      if (rec === null) return;
      setReceivedOffrs(rec);
    }
    loadOffrs().catch((err) => console.error(err));
  }, []);
  const tabs = [
    {
      name: "all",
      text: "Összes",
    },
    {
      name: "request",
      text: "Elküldött",
    },
    {
      name: "request",
      text: "Kapott",
    },
    {
      name: "accepted",
      text: "Elfogadott",
    },
  ];
  function getTimeInText(stringdate: string | null): string {
    if (!stringdate) {
      return "nincs idő";
    }
    const date = new Date(stringdate);

    return "idő";
  }
  return (
    <div className="mx-auto w-[80%]">
      <div className="tabs flex justify-center">
        {tabs.map((x, id) => (
          <h2
            key={id}
            className={`tab-bordered tab ${
              activetabindex === id && "tab-active"
            }`}
            onClick={() => setActivetabindex(id)}
          >
            {x.text}
          </h2>
        ))}
      </div>
      {offerslist && (
        <div className="mx-auto">
          {offerslist.map((x) => (
            <div className="w-full rounded-md bg-base-200 px-6 py-2">
              {getTimeInText(x.created_at)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Offers;
