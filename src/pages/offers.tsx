import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import React, { useEffect, useState } from "react";
import dayjs from "mydayjs";

const Offers = () => {
  const [offerslist, setOfferslist] = useState<Database["public"]["Tables"]["transactions"]["Row"][]>();
  const [activetabindex, setActivetabindex] = useState<number>(0);
  const supabaseClient = useSupabaseClient<Database>();
  const user = useSupabaseClient().auth.getUser();
  useEffect(() => {
    loadOffers().catch((err) => console.error(err));
  }, []);
  function handleTabClick(id:number){
    async function callLoadOffers(){
      await loadOffers()
    }
    setActivetabindex(id); 
    setOfferslist(undefined)
    callLoadOffers().catch(err=>console.log(err))
  }
  async function loadOffers(){
    let fdata: Database["public"]["Tables"]["transactions"]["Row"][] | null = null;
    if(tabs[activetabindex]?.name === "request"){
      const { data, error } = await supabaseClient
        .from("transactions")
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
      const testreq = await supabaseClient.from("transactions").select("*, transaction_item(*)")
      console.log(testreq)
        fdata = data;
    } else if(tabs[activetabindex]?.name === "received"){
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("receiver", (await user).data?.user?.id);
        fdata = data;
    }
    else if(tabs[activetabindex]?.name === "accepted"){
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("initiator", (await user).data?.user?.id).eq("status","accepted")
        const { data: data2, error:error2 } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("receiver", (await user).data?.user?.id).eq("status","accepted")
        if(data !== null && data2 !== null){
          fdata = [...data, ...data2]
        }
    }
    else if(tabs[activetabindex]?.name === "denied"){
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("initiator", (await user).data?.user?.id).eq("status","denied")
        const { data: data2, error:error2 } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("receiver", (await user).data?.user?.id).eq("status","denied")
        if(data !== null && data2 !== null){
          fdata = [...data, ...data2]
        }
    }
    if(fdata !== null){
      setOfferslist(fdata)
      console.log(fdata)
    }
    else {
      console.log("nincs data")
    }
  }
  const tabs = [
    {
      name: "request",
      text: "Elküldött",
    },
    {
      name: "received",
      text: "Kapott",
    },
    {
      name: "accepted",
      text: "Elfogadott",
    },
    {
      name: "denied",
      text: "Elutasított",
    },
  ];
  return (
    <div className="mx-auto w-[80%]">
      <div className="tabs flex justify-center">
        {tabs.map((x, id) => (
          <h2
            key={id}
            className={`tab-bordered tab ${
              activetabindex === id ? "tab-active" :""
            }`}
            onClick={()=>handleTabClick(id)}
          >
            {x.text}
          </h2>
        ))}
      </div>
      {offerslist ? (
        <div className="mx-auto">
          {offerslist?.map((x) => (
            <div key={x.id} className="w-full flex justify-around rounded-md bg-base-200 px-6 py-2">
              {dayjs(x.created_at).fromNow()}
              <h3>{x.initiator}</h3>
              <h3>{x.receiver}</h3>
              <h3>{x.id}</h3>
            </div>
          ))}
        </div>
      ) : <div>Nincs ajánlat</div>}
    </div>
  );
};

export default Offers;
