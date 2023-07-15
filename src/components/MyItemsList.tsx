import MyItemCard from "./MyItemCard";
import { Database } from "lib/database.types";
import { Dispatch, SetStateAction } from "react";

export default function MyItemsList(props: {
  itemsarr: Database["public"]["Tables"]["items"]["Row"][] | undefined;
  setItemsarr: Dispatch<
    SetStateAction<Database["public"]["Tables"]["items"]["Row"][] | undefined>
  >;
  loading: boolean;
}) {
  const { itemsarr, loading, setItemsarr } = props;
  return (
    <div className="mx-5 py-4 md:mx-auto md:w-[80vw]">
      {itemsarr === undefined || itemsarr?.length === 0 || loading ? (
        <div>Nincsenek tárgyaid</div>
      ) : (
        <div className="grid lg:grid-cols-2 2xl:grid-cols-3">
          {itemsarr?.map((i) => (
            <MyItemCard item={i} key={i.id} setItemsarr={setItemsarr} />
          ))}
        </div>
      )}
    </div>
  );
}
