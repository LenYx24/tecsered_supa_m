import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "lib/database.types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const offermaker = () => {
  const router = useRouter();
  const [allItems, setAllItems] = useState<any>([]);
  const [myItems, setMyItems] = useState<any>([]);
  const [theirItems, setTheirItems] = useState<any>([]);
  const supabaseClient = useSupabaseClient<Database>();
  function handleAllItemsClick(item: any) {
    const newdata = allItems.filter((x: any) => x.id !== item.id);
    setAllItems(newdata);
    if (item.user_id === user?.id) {
      setMyItems((prevstate: any) => [...prevstate, item]);
    } else {
      setTheirItems((prevstate: any) => [...prevstate, item]);
    }
  }
  function handlePutBackClick(item) {
    setAllItems((prevstate: any) => [...prevstate, item]);
    if (item.user_id === user?.id) {
      const newdata = myItems.filter((x: any) => x.id !== item.id);
      setMyItems(newdata);
    } else {
      const newdata = theirItems.filter((x: any) => x.id !== item.id);
      setTheirItems(newdata);
    }
  }
  async function handleTradeRequest() {
    // új rekord a transcation táblában, a status pedig request lesz
    // a transitems táblába pedig fel kellene vinni azokat az itemeket amelyek kapcsolódnak a transactionhöz
    // myitems és theiritems tömbök id-jeit insertelem, és a most létrehozott transaction id-val
    const initiator_id = user?.id;
    const receiver_id = router.query.userid;
    if (typeof initiator_id !== "string" || initiator_id === undefined) return;
    if (typeof receiver_id !== "string" || receiver_id === undefined) return;
    const req = await supabaseClient
      .from("transactions")
      .insert([
        { initiator: initiator_id, receiver: receiver_id, status: "request" },
      ]);
  }
  const user = useUser();
  async function getitems() {
    if (router.query.userid === undefined) return;
    if (user === null) return;
    const { data } = await supabaseClient
      .from("items")
      .select("*")
      .in("user_id", [user.id, router.query.userid]);
    setAllItems(data);
    console.log(data);
  }
  useEffect(() => {
    getitems();
  }, []);
  return (
    <div className="mx-auto grid w-[90%] lg:grid-cols-2">
      <div className="mx-5 bg-base-200 ">
        {/* <input
          placeholder="keresés"
          className="input-bordered input-primary input w-full max-w-xs"
        /> */}
        <div>
          {allItems?.map((item) => {
            return (
              <div className="m-2 flex gap-5 shadow-xl">
                <Image
                  width={120}
                  height={120}
                  src={`https://squaoauhjrlvmrvyrheb.supabase.co/storage/v1/object/public/items/${item.img_name}`}
                  alt="Shoes"
                  className="hover:cursor-pointer"
                  onClick={() => handleAllItemsClick(item)}
                />
                <h2
                  className={
                    user?.id === item.user_id ? "text-blue-500" : "text-red-500"
                  }
                >
                  {item.title}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="min-h-[20vh] border border-base-300 bg-base-200">
          <h2>Cserélni kívánt tárgyaid</h2>
          {myItems?.map((item) => {
            return (
              <div className="m-2 flex gap-5 shadow-xl">
                <Image
                  width={120}
                  height={120}
                  src={`https://squaoauhjrlvmrvyrheb.supabase.co/storage/v1/object/public/items/${item.img_name}`}
                  alt="Shoes"
                  className="hover:cursor-pointer"
                  onClick={() => handlePutBackClick(item)}
                />
                <h2 className="">{item.title}</h2>
              </div>
            );
          })}
        </div>
        <div className="min-h-[20vh] border border-base-300 bg-base-200">
          <h2>Másik fél tárgyai</h2>
          {theirItems?.map((item) => {
            return (
              <div className="m-2 flex gap-5 shadow-xl">
                <Image
                  width={120}
                  height={120}
                  src={`https://squaoauhjrlvmrvyrheb.supabase.co/storage/v1/object/public/items/${item.img_name}`}
                  alt="Shoes"
                  className="hover:cursor-pointer"
                  onClick={() => handlePutBackClick(item)}
                />
                <h2 className="">{item.title}</h2>
              </div>
            );
          })}
        </div>
        <div className="mx-auto">
          <button className="btn-primary btn" onClick={handleTradeRequest}>
            Csereajánlat küldése
          </button>
        </div>
      </div>
    </div>
  );
};

export default offermaker;
