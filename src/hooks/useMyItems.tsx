import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import { useEffect, useState } from "react";

const useMyItems = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const [loading, setLoading] = useState<boolean>(true);
  const [itemsarr, setItemsarr] =
    useState<Database["public"]["Tables"]["items"]["Row"][]>();
  const user = useUser();
  useEffect(() => {
    async function getdata() {
      const id = user?.id;
      console.log(user);
      const { data: newdat } = await supabaseClient
        .from("items")
        .select("*")
        .eq("user_id", id);
      if (newdat === null) return;
      setItemsarr(newdat);
      setLoading(false);
    }
    getdata().catch((err) => console.log(err));
  }, []);
  return { loading, itemsarr, setItemsarr };
};

export default useMyItems;
