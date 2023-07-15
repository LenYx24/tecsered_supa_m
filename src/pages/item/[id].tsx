import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Map from "~/components";

export default function Page() {
  const router = useRouter();
  const supabase = useSupabaseClient<Database>();
  const [item, setItem] = useState<
    Database["public"]["Views"]["itemswithusername"]["Row"] | null
  >(null);
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("itemswithusername")
        .select("*")
        .eq("id", router.query.id)
        .maybeSingle();
      if (error) console.log(error);
      else if (data) {
        setItem(data);
      }
    };
    load().catch((err) => console.error(err));
  }, [router.query.id, supabase]);

  const href = "/offermaker";
  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    router
      .push({
        pathname: href,
        query: { itemid: item?.id, userid: item?.user_id },
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="">
      {item ? (
        <div className="bg-white px-2 py-4 shadow-xl md:px-16">
          <figure className="flex justify-center border-b-2 border-main pt-2">
            <Image
              width={400}
              height={400}
              src={`https://squaoauhjrlvmrvyrheb.supabase.co/storage/v1/object/public/items/${
                item.img_name ? item.img_name : ""
              }`}
              alt="kép"
            />
          </figure>
          <div className="m-2 md:mx-16">
            <div className="flex items-center justify-between">
              <h2 className="border-l-8 border-unique pl-4 text-xl font-bold">
                {item.title}
              </h2>
              <p className="text-md my-4 italic">
                Felhasználó neve: {item.username}
              </p>
            </div>

            <h2 className="mt-4 border-l-8 border-unique pl-4 text-xl">
              Leírás
            </h2>
            <p className="text-md mx-6">{item.desc}</p>
            <div className="flex items-center justify-around tracking-wider">
              <h2>
                <span>Ár: </span>
                <span className="text-2xl font-extrabold text-unique ">
                  {item.value}
                </span>
                <span> Ft</span>
              </h2>

              <Link
                href={href}
                className="btn border-none bg-unique text-white hover:bg-unique hover:opacity-80"
                onClick={handleClick}
              >
                Ajánlat
              </Link>
            </div>
          </div>
          <hr />
          <Map />
          <p className="mt-4 text-xs italic">Tárgy azonosító: {item.id}</p>
        </div>
      ) : (
        <div>Betöltés</div>
      )}
    </div>
  );
}
