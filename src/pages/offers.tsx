import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import React, { useEffect, useState } from "react";
import OfferRow from "~/components/OfferRow";
import tabs from "../statustabs";

const Offers = () => {
  const [offerslist, setOfferslist] =
    useState<
      Database["public"]["Views"]["transactions_with_usernames"]["Row"][]
    >();
  const [activetabindex, setActivetabindex] = useState<number>(0);
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  useEffect(() => {
    loadOffers(activetabindex).catch((err) => console.error(err));
  }, [user]);
  function handleTabClick(id: number) {
    async function callLoadOffers() {
      await loadOffers(id);
    }
    setOfferslist(undefined);
    setActivetabindex(id);
    callLoadOffers().catch((err) => console.log(err));
  }
  let fdata:
    | Database["public"]["Views"]["transactions_with_usernames"]["Row"][]
    | null = null;
  async function loadOffers(id: number) {
    if (tabs[id]?.name === "request") {
      const { data, error } = await supabaseClient
        .from("transactions_with_usernames")
        .select("*")
        .eq("initiator", (await user).data?.user?.id);
        if(data === null)return;
        data.map(async(transaction)=>{
          const {data:item_id_req_data} = await supabaseClient.from("transaction_item").select("item_id").eq("trans_id",transaction.id)
          if(item_id_req_data === null)return;
          item_id_req_data.map(async(item_id)=>{
            const {data:items_req_data} = await supabaseClient.from("items").select("*").eq("id",item_id.item_id)
          })
        })
      const testreq = await supabaseClient.from("transactions").select("*, transaction_item(*, items(*))")
      console.log(testreq)
        fdata = data;
    } else if(tabs[activetabindex]?.name === "received"){
      const { data, error } = await supabaseClient
        .from("transactions_with_usernames")
        .select("*")
        .eq("receiver", user?.id)
        .eq("status", "request");
      fdata = data;
      if (error) console.log(error);
    } else if (tabs[id]?.name === "accepted") {
      const { data, error } = await supabaseClient
        .from("transactions_with_usernames")
        .select("*")
        .eq("initiator", user?.id)
        .eq("status", "accepted");
      const { data: data2, error: error2 } = await supabaseClient
        .from("transactions_with_usernames")
        .select("*")
        .eq("receiver", user?.id)
        .eq("status", "accepted");
      console.log(data);
      console.log(data2);
      if (data !== null && data2 !== null) {
        fdata = [...data, ...data2];
      }
      if (error) console.log(error);
    } else if (tabs[id]?.name === "denied") {
      const { data, error } = await supabaseClient
        .from("transactions_with_usernames")
        .select("*")
        .eq("initiator", user?.id)
        .eq("status", "denied");
      const { data: data2, error: error2 } = await supabaseClient
        .from("transactions_with_usernames")
        .select("*")
        .eq("receiver", user?.id)
        .eq("status", "denied");
      if (data !== null && data2 !== null) {
        fdata = [...data, ...data2];
      }
    }
    if (fdata !== null) {
      setOfferslist(fdata);
    }
  }
  return (
    <div className="mx-auto w-[80%]">
      <div className="tabs flex justify-center">
        {tabs.map((x, id) => (
          <h2
            key={id}
            className={`tab-bordered tab ${
              id === activetabindex ? "tab-active" : ""
            }`}
            onClick={() => handleTabClick(id)}
          >
            {x.text}
          </h2>
        ))}
      </div>
      {offerslist ? (
        <div className="mx-auto">
          {offerslist?.map((x) => (
            <OfferRow key={x.id} x={x} />
          ))}
        </div>
      ) : (
        <div>Nincs ajánlat</div>
      )}
    </div>
  );
};

export default Offers;
