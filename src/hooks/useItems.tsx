import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import { useEffect, useState } from "react";

const useItems = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const [loading, setLoading] = useState<boolean>(true);
  const [itemsarr, setItemsarr] =
    useState<Database["public"]["Views"]["itemswithusername"]["Row"][]>();
  const user = useUser();

  useEffect(() => {
    async function getdata() {
      console.log(user);
      const { data: newdat } = await supabaseClient
        .from("itemswithusername")
        .select("*");
      if (newdat === null) return;
      setItemsarr(newdat);
      setLoading(false);
    }
    getdata().catch((err) => console.log(err));
  }, []);
  return { loading, itemsarr };
};

export default useItems;
