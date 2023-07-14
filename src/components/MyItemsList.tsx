import { useEffect, useState } from "react";
import type { Database } from "lib/database.types";
import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import MyItemCard from "./MyItemCard";

export default function MyItemsList() {
  const [items, setItems] = useState<
    Database["public"]["Tables"]["items"]["Row"][] | null
  >();
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  useEffect(() => {
    const id = user?.id;
    if (!id) return;
    async function getdata() {
      const { data } = await supabaseClient
        .from("items")
        .select("*")
        .eq("user_id", id);
      if (data && data !== null) {
        setItems(data);
        console.log(data);
      }
    }
    getdata().catch((err) => console.log(err));
  }, []);

  return (
    <div className="mx-5 grid py-4 md:mx-auto md:w-[80vw] md:grid-cols-2 lg:grid-cols-3">
      {!items || items.length === 0 ? (
        <div>Nincsenek tárgyaid</div>
      ) : (
        <div>
          {items.map((i) => (
            <MyItemCard item={i} key={i.id} />
          ))}
        </div>
      )}
    </div>
  );
}
