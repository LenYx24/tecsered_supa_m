import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { Database } from "lib/database.types";
import Link from "next/link";

const Card = ({
  item,
}: {
  item: Database["public"]["Views"]["itemswithusername"]["Row"];
}) => {
  const { id, title, img_name, username, user_id } = item;

  const href = "/offermaker";
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    router
      .push({
        pathname: href,
        query: { itemid: id, userid: user_id },
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="my-4 border-2 border-main shadow-xl md:w-96">
      <figure className="mt-2 flex justify-center border-b-2 border-main">
        <Image
          width={200}
          height={200}
          src={`https://squaoauhjrlvmrvyrheb.supabase.co/storage/v1/object/public/items/${
            img_name ? img_name : ""
          }`}
          alt="kép"
        />
      </figure>
      <div className="m-2">
        <h2 className="font-bold">
          <Link
            href={`item/${id ? id : "0"}`}
            className="cursor-pointer underline"
          >
            {title}
          </Link>
        </h2>
        <p className="text-right italic">{username}</p>
        <div className="card-actions justify-end">
          <Link
            href={href}
            className="btn border-none bg-unique text-white hover:bg-unique hover:opacity-80"
            onClick={handleClick}
          >
            Ajánlat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
