import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Offermaker = () => {
  const router = useRouter();
  const [allItems, setAllItems] =
    useState<Database["public"]["Tables"]["items"]["Row"][]>();
  const [myItems, setMyItems] = useState<
    Database["public"]["Tables"]["items"]["Row"][]
  >([]);
  const [theirItems, setTheirItems] = useState<
    Database["public"]["Tables"]["items"]["Row"][]
  >([]);
  const supabaseClient = useSupabaseClient<Database>();
  function handleAllItemsClick(
    item: Database["public"]["Tables"]["items"]["Row"]
  ) {
    const newdata = allItems?.filter((x) => x.id !== item.id);
    setAllItems(newdata);
    if (item.user_id === user?.id) {
      setMyItems((prevstate) => [...prevstate, item]);
    } else {
      setTheirItems((prevstate) => [...prevstate, item]);
    }
  }
  function handlePutBackClick(
    item: Database["public"]["Tables"]["items"]["Row"]
  ) {
    if (allItems !== undefined) {
      const newitms = [...allItems, item];
      setAllItems(newitms);
    }
    if (item.user_id === user?.id) {
      const newdata = myItems.filter((x) => x.id !== item.id);
      setMyItems(newdata);
    } else {
      const newdata = theirItems.filter((x) => x.id !== item.id);
      setTheirItems(newdata);
    }
  }
  function handleTradeRequest() {
    // új rekord a transcation táblában, a status pedig request lesz
    // a transitems táblába pedig fel kellene vinni azokat az itemeket amelyek kapcsolódnak a transactionhöz
    // myitems és theiritems tömbök id-jeit insertelem, és a most létrehozott transaction id-val
    async function handle() {
      const initiator_id = user?.id;
      const receiver_id = router.query.userid;
      if (typeof initiator_id !== "string" || initiator_id === undefined)
        return;
      if (typeof receiver_id !== "string" || receiver_id === undefined) return;
      const req = await supabaseClient
        .from("transactions")
        .insert([
          { initiator: initiator_id, receiver: receiver_id, status: "request" },
        ]);
    }
    handle().catch((err) => console.error(err));
  }
  const user = useUser();

  useEffect(() => {
    async function getitems() {
      if (router.query.userid === undefined) return;
      if (user === null) return;
      const { data } = await supabaseClient
        .from("items")
        .select("*")
        .in("user_id", [user.id, router.query.userid]);
      if (data !== null) setAllItems(data);
      console.log(data);
    }
    getitems().catch((err) => console.error(err));
  }, [router.query.userid, supabaseClient, user]);
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
              <div className="m-2 flex gap-5 shadow-xl" key={item.id}>
                <Image
                  width={120}
                  height={120}
                  src={`https://squaoauhjrlvmrvyrheb.supabase.co/storage/v1/object/public/items/${
                    item.img_name ? item.img_name : ""
                  }`}
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
              <div className="m-2 flex gap-5 shadow-xl" key={item.id}>
                <Image
                  width={120}
                  height={120}
                  src={`https://squaoauhjrlvmrvyrheb.supabase.co/storage/v1/object/public/items/${
                    item.img_name ? item.img_name : ""
                  }`}
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
              <div className="m-2 flex gap-5 shadow-xl" key={item.id}>
                <Image
                  width={120}
                  height={120}
                  src={`https://squaoauhjrlvmrvyrheb.supabase.co/storage/v1/object/public/items/${
                    item.img_name ? item.img_name : ""
                  }`}
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

export default Offermaker;
