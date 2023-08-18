import { Database } from "lib/database.types";
import Image from "next/image";

function Offertable({
  myItems,
  theirItems,
  handlePutBackClick,
}: {
  myItems: Database["public"]["Tables"]["items"]["Row"][];
  theirItems: Database["public"]["Tables"]["items"]["Row"][];
  handlePutBackClick?: (
    item: Database["public"]["Tables"]["items"]["Row"]
  ) => void;
}) {
  return (
    <div>
      <div className="min-h-[20vh] border border-base-300 bg-base-200">
        <h2>Kezdeményező tárgyai</h2>
        {myItems?.map((item) => {
          return (
            <div className="m-2 flex gap-5 shadow-xl" key={item.id}>
              <Image
                width={120}
                height={120}
                src={`https://squaoauhjrlvmrvyrheb.supabase.co/storage/v1/object/public/items/${
                  item.img_name ? item.img_name : ""
                }`}
                alt="Shoes"
                className="hover:cursor-pointer"
                onClick={() =>
                  handlePutBackClick ? handlePutBackClick(item) : ""
                }
              />
              <h2>{item.title}</h2>
            </div>
          );
        })}
      </div>
      <div className="min-h-[20vh] border border-base-300 bg-base-200">
        <h2>Fogadó tárgyai</h2>
        {theirItems?.map((item) => {
          return (
            <div className="m-2 flex gap-5 shadow-xl" key={item.id}>
              <Image
                width={120}
                height={120}
                src={`https://squaoauhjrlvmrvyrheb.supabase.co/storage/v1/object/public/items/${
                  item.img_name ? item.img_name : ""
                }`}
                alt="Shoes"
                className="hover:cursor-pointer"
                onClick={() =>
                  handlePutBackClick ? handlePutBackClick(item) : ""
                }
              />
              <h2>{item.title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Offertable;
