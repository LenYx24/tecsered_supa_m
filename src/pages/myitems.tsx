import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import React, { useState } from "react";
import Myitemslist from "~/components/MyItemsList";
import useMyItems from "~/hooks/useMyItems";

function Myitems() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const supabaseClient = useSupabaseClient<Database>();
  const ref = React.useRef<HTMLInputElement>(null);
  const { itemsarr, setItemsarr, loading } = useMyItems();
  const user = useUser();
  function submit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const submitas = async () => {
      const uid = (await supabaseClient.auth.getUser()).data.user?.id;
      if (uid === undefined) {
        alert("Jelentkezzen be");
        return;
      }
      if (!ref || !ref.current || !ref.current.files || !ref.current.files[0]) {
        return;
      }
      console.log(ref.current.files[0].name);
      const newitem = {
        title: name,
        desc: desc,
        user_id: uid,
        value: Number(price),
        img_name: ref.current.files[0]?.name,
      };
      await supabaseClient.from("items").insert([newitem]);
      if (
        ref.current === null ||
        ref.current.files === null ||
        ref.current.files[0] === undefined
      ) {
        alert("Jelöld ki a képet");
        return;
      }
      const { error } = await supabaseClient.storage
        .from("items")
        .upload(ref.current.files[0].name, ref.current.files[0], {
          cacheControl: "3600",
          upsert: false,
        });
      if (!error) {
        const id = user?.id;

        const { data: newdat } = await supabaseClient
          .from("items")
          .select("*")
          .eq("user_id", id);
        if (newdat === null) return;
        setItemsarr(newdat);
        setName("")
        setDesc("")
        setPrice("")
        setImage("")
        console.log(newdat);
      }
    };
    submitas().catch((err) => console.log(err));
  }
  return (
    <div>
      <div className="mx-auto mb-4 flex justify-center md:w-[40vw]">
        <div className="form-control">
          <label className="input-group py-2">
            <span>Név</span>
            <input
              type="text"
              placeholder="Név"
              className="input-bordered input-primary input w-full max-w-xs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="input-group py-2">
            <span>Leírás</span>
            <textarea
              className="input-bordered input-primary input h-24 w-full max-w-xs"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </label>
          <label className="input-group py-2">
            <span>Érték</span>
            <input
              type="number"
              placeholder="Érték"
              className="input-bordered input-primary input w-full max-w-xs"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label className="input-group py-2">
            <span>Kép</span>
            <input
              ref={ref}
              type="file"
              className="file-input w-full max-w-xs"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          <button
            onClick={(e) => submit(e)}
            className="btn bg-unique text-white hover:bg-uniquedark "
          >
            Feltölt
          </button>
        </div>
      </div>
      <Myitemslist
        itemsarr={itemsarr}
        setItemsarr={setItemsarr}
        loading={loading}
      />
    </div>
  );
}

export default Myitems;
