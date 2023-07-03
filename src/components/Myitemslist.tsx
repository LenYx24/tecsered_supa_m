import { useEffect, useState } from "react";
import { Database } from "lib/database.types";
import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import MyItemCard from "./MyItemCard";

export default function Myitemslist() {
  const [data, setData] = useState<
    Database["public"]["Tables"]["items"]["Row"][] | null
  >();
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  useEffect(() => {
    const id = user?.id;
    if (!id) return;
    supabaseClient
      .from("items")
      .select("*")
      .eq("user_id", id)
      .then((dat) => {
        if (dat.data && dat.data !== null) {
          setData(dat.data);
          console.log(dat.data);
        }
      });
  }, []);

  if (!data || data.length === 0) return <div>Nincsenek tárgyaid</div>;
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3">
      {data.map((i) => (
        <MyItemCard item={i} key={i.id} />
      ))}
    </div>
  );
}
