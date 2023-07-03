import {
  SupabaseClient,
  createPagesServerClient,
} from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "lib/database.types";
import { InferGetServerSidePropsType } from "next";
import React, { useEffect, useState } from "react";
import Card from "~/components/Card";

export default function items({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const supabaseClient = useSupabaseClient<Database>();
  const [loading, setLoading] = useState<boolean>(true);
  const [itemsarr, setItemsarr] = useState<any>();
  const user = useUser();
  async function g() {
    console.log(user);
    let { data: newdat } = await supabaseClient
      .from("items")
      .select("*, profiles(first_name)");
    setItemsarr(newdat);
    setLoading(false);
  }
  useEffect(() => {
    g();
  }, []);
  if (itemsarr === undefined || itemsarr?.length === 0 || loading)
    return <div>Nincsenek tárgyak</div>;
  return (
    <div className="mx-auto grid w-[80%] lg:grid-cols-2 2xl:grid-cols-3">
      {itemsarr?.map((item) => {
        return <Card item={item} key={item.id} />;
      })}
    </div>
  );
}
export async function getServerSideProps(ctx: any) {
  const supabase = createPagesServerClient<Database>(ctx);
  let { data } = await supabase.from("items").select("*, profiles(first_name)");
  console.log(data);
  return {
    props: {
      itemsarr: data,
    },
  };
}
