import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Card = ({ item }: any) => {
  const { title, desc, img_name, profiles } = item;
  const href = "/offermaker";
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push({
      pathname: href,
      query: { itemid: item.id, userid: item.user_id },
    });
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image
          width={200}
          height={200}
          src={`https://squaoauhjrlvmrvyrheb.supabase.co/storage/v1/object/public/items/${img_name}`}
          alt="Shoes"
        />
      </figure>
      <div className="card-body relative">
        <h2 className="card-title">{title}</h2>
        <p className="text-right italic">{profiles.first_name}</p>
        <p>{desc}</p>
        <div className="card-actions justify-end">
          <a href={href} className="btn-primary btn" onClick={handleClick}>
            Ajánlat
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
