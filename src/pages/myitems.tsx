import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import React, { useState } from "react";
import Myitemslist from "~/components/MyItemsList";

function Myitems() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const supabaseClient = useSupabaseClient<Database>();
  const ref = React.useRef<HTMLInputElement>(null);
  supabaseClient.auth
    .getSession()
    .then((x) => console.log(x))
    .catch((err) => console.error(err));
  function submit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const imgname = `${name}.png`;
    const submitas = async () => {
      const uid = (await supabaseClient.auth.getUser()).data.user?.id;
      if (uid === undefined) {
        alert("Jelentkezz be öcsi");
        return;
      }
      await supabaseClient.from("items").insert([
        {
          title: name,
          desc: desc,
          user_id: uid,
          value: Number(price),
          img_name: imgname,
        },
      ]);
      if (
        ref.current === null ||
        ref.current.files === null ||
        ref.current.files[0] === undefined
      ) {
        alert("Jelöld ki a képet pls");
        return;
      }
      const { data, error } = await supabaseClient.storage
        .from("items")
        .upload(imgname, ref.current.files[0], {
          cacheControl: "3600",
          upsert: false,
        });

      console.log(data);
      console.log(error);
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
      <Myitemslist />
    </div>
  );
}

export default Myitems;
