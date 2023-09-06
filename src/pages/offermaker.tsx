import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Offertable from "~/components/Offertable";

const Offermaker = () => {
  const router = useRouter();
  const [activetabindex, setActivetabindex] = useState<number>(0);
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
      const { data, error } = await supabaseClient
        .from("transactions")
        .insert([
          { initiator: initiator_id, receiver: receiver_id, status: "request" },
        ])
        .select("id");
      if (error) {
        console.log(error);
        return;
      }
      if (data[0] === undefined) return;
      const id: number = data[0].id;
      type objtype = {
        trans_id: number;
        item_id: number;
      }[];
      const obj: objtype = myItems.map((i) => ({
        item_id: i.id,
        trans_id: id,
      }));
      const obj2: objtype = theirItems.map((i) => ({
        item_id: i.id,
        trans_id: id,
      }));
      console.log(obj.concat(obj2));
      const req = await supabaseClient
        .from("transaction_item")
        .insert(obj.concat(obj2));
      console.log(req.data);
      console.error(req.error);
    }
    handle().catch((err) => console.error(err));
  }
  const user = useUser();
  async function getitems() {
    if (router.query.userid === undefined) return;
    if (user === null) return;
    const { data } = await supabaseClient
      .from("items")
      .select("*")
      .in("user_id", [router.query.userid, user.id]);
    if (data !== null) setAllItems(data);
    console.log(data);
  }
  useEffect(() => {
    getitems().catch((err) => console.error(err));
  }, [router.query.userid, supabaseClient, user]);
  const tabs = ["Kezdeményező", "Fogadó"] as const;
  function handleTabClick(id: number) {
    setActivetabindex(id);
  }
  return (
    <div className="mx-auto grid w-[90%] lg:grid-cols-2">
      <div className="mx-5 bg-base-200 ">
        {tabs.map((x, id) => (
          <h2
            key={id}
            className={`tab-bordered tab ${
              id === activetabindex ? "tab-active" : ""
            }`}
            onClick={() => handleTabClick(id)}
          >
            {x}
          </h2>
        ))}
        {/* <input
          placeholder="keresés"
          className="input-bordered input-primary input w-full max-w-xs"
        /> */}
        <div>
          {allItems
            ?.filter((x) => {
              if (activetabindex === 0) return x.user_id === user?.id;
              else return x.user_id !== user?.id;
            })
            .map((item) => {
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
                      user?.id === item.user_id
                        ? "text-blue-500"
                        : "text-red-500"
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
        <Offertable
          myItems={myItems}
          theirItems={theirItems}
          handlePutBackClick={handlePutBackClick}
        ></Offertable>
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
