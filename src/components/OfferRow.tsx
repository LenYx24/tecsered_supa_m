import { Database } from "lib/database.types";
import dayjs from "mydayjs";
import Link from "next/link";

export default function OfferRow({
  x,
}: {
  x: Database["public"]["Views"]["transactions_with_usernames"]["Row"];
}) {
  const temp = `offer/${x.id ? x.id : ""}`;
  return (
    <div
      key={x.id}
      className="w-full justify-around rounded-md border-b border-black bg-white px-6 py-2 text-center md:flex md:text-left"
    >
      <h3>
        <Link className="link underline hover:text-maindark" href={temp}>
          Azonosító: {x.id}
        </Link>
      </h3>
      <h3>dátum: {dayjs(x.created_at).fromNow()}</h3>
      <h3>Kezdeményező: {x.initiator_username}</h3>
      <h3>Fogadó: {x.receiver_username}</h3>
      <h3>Állapot: {x.status}</h3>
    </div>
  );
}
