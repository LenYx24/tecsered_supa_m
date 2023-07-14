import React from "react";
import Image from "next/image";
import type { Database } from "lib/database.types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const MyItemCard = (props: {
  item: Database["public"]["Tables"]["items"]["Row"];
}) => {
  const { title, desc, img_name, id } = props.item;
  const supabase = useSupabaseClient();
  const router = useRouter();
  function handleDelete() {
    const handle = async () => {
      const { data, error } = await supabase
        .from("items")
        .delete()
        .eq("id", id);
      console.log(id);
      console.log(data);
      console.log(error);
    };
    handle()
      .then((x) => router.reload())
      .catch((err) => console.log(err));
  }
  return (
    <div className="card w-full rounded-none bg-base-100 shadow-xl md:w-96">
      <figure>
        <Image
          width={200}
          height={200}
          src={`https://squaoauhjrlvmrvyrheb.supabase.co/storage/v1/object/public/items/${
            img_name ? img_name : ""
          }`}
          alt="Shoes"
        />
      </figure>
      <div className="card-body relative">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
        <div className="card-actions justify-end">
          <button className="btn bg-maindark text-white">
            Csere kérések megtekintése
          </button>
        </div>
      </div>
      <label
        className="absolute right-0 m-1 rounded-full bg-red-700 px-3 py-1 text-white hover:bg-red-500 hover:opacity-80"
        htmlFor="my_modal"
      >
        x
      </label>
      <input type="checkbox" id="my_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Tárgy törlése</h3>
          <p className="py-4">
            Biztos vagy benne hogy törlöd ezt a tárgyat a gyüjteményedből?
          </p>
          <div className="modal-action">
            <label htmlFor="my_modal" className="btn" onClick={handleDelete}>
              Igen
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyItemCard;
