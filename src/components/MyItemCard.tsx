import React from "react";
import Image from "next/image";
import type { Database } from "lib/database.types";

const MyItemCard = (props: {
  item: Database["public"]["Tables"]["items"]["Row"];
}) => {
  const { title, desc, img_name } = props.item;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
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
          <button className="btn-primary btn">
            Csere kérések megtekintése
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyItemCard;
