import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "lib/database.types";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import status from "../../statustabs";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const supabase = useSupabaseClient<Database>();
  const [modaltext, setModaltext] = useState<string | null>("null");
  const [item, setItem] = useState<
    Database["public"]["Views"]["transactions_with_usernames"]["Row"] | null
  >(null);
  const [transactionitems, setTransactionitems] = useState<
    Database["public"]["Views"]["transitemdata"]["Row"][] | null
  >();
  const myref = useRef<HTMLDialogElement>(null);
  const user = useUser();
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("transactions_with_usernames")
        .select("*")
        .eq("id", router.query.id)
        .maybeSingle();
      if (error) console.log(error);
      else if (data) {
        setItem(data);
      }
      const { data: transitems } = await supabase
        .from("transitemdata")
        .select("*")
        .eq("trans_id", router.query.id);
      setTransactionitems(transitems);
    };
    load().catch((err) => console.error(err));
  }, [router.query.id, supabase]);
  function acceptTrade() {
    // elfogadja a transaction-t, vagyis a státusz megváltozik "accepted"-ra
    // létrejön egy új sor a chat táblában, ahol tárolva van a sor id, a két fél id-ja, és a trans_id
    if (item?.receiver !== user?.id) return; // ha a felhasználó nem kapta az ajánlatot akkor nyilván nem fogadhatja el
    async function kljj() {
      const data = await supabase
        .from("transactions")
        .update({ status: "accepted" })
        .eq("id", item?.id);
      console.log(data);
      if (data.error)
        setModaltext(
          "Nem sikerült elfogadnod a csereajánlatot! Próbáld meg később!"
        );
      else setModaltext("Sikeresen elfogadtad a cserét");
    }
    kljj().catch((x) => console.log(x));
  }
  function declineTrade() {
    if (item?.receiver !== user?.id && item?.initiator !== user?.id) return; // a felhasználónak muszáj vagy az initiatornak, vagy a receivernek lenni
    //bebaszna ha sikerülne mások cseréjit elutasítania, de azt csak megoldom
    async function kljj() {
      await supabase
        .from("transactions")
        .update({ status: "denied" })
        .eq("id", item?.id);
    }
    kljj().catch((x) => console.log(x));
  }
  return (
    <div className="bg-white px-2 py-4 shadow-xl md:px-16">
      <dialog id="my_modal_1" ref={myref} className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold">{modaltext}</h3>
          <div className="modal-action">
            <button className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2">
              ✕
            </button>
          </div>
        </form>
      </dialog>
      {item ? (
        <div className="md:mx-auto md:w-[50vw]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="border-l-8 border-unique pl-4 text-xl font-bold">
              Azonosító: {item.id}
            </h2>
            <h2 className="text-md my-4 italic">{item.created_at}</h2>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="border-l-8 border-unique pl-4 text-xl font-bold">
              Kezdményező: {item.initiator_username}
            </h2>
            <h2 className="border-r-8 border-unique pr-4 text-xl font-bold">
              Fogadó: {item.receiver_username}
            </h2>
          </div>

          <div className="mt-4 flex justify-end">
            <h2 className="badge badge-primary">
              {
                status.find((x) => {
                  return x.name === item?.status ? x.text : "";
                })?.text
              }
            </h2>
          </div>
        </div>
      ) : (
        <div>nincs</div>
      )}
      <div className="mt-4">
        <div className="min-h-[20vh] border-b border-black bg-main">
          <h2 className="border-l-8 border-unique px-4 pl-4 md:text-2xl">
            Kezdeményező tárgyai
          </h2>
          {transactionitems
            ?.filter((x) => x.user_id === item?.initiator)
            .map((item) => {
              return (
                <div className="m-2 flex gap-5 shadow-xl" key={item.id}>
                  <Image
                    width={120}
                    height={120}
                    src={`https://squaoauhjrlvmrvyrheb.supabase.co/storage/v1/object/public/items/${
                      item.img_name ? item.img_name : ""
                    }`}
                    alt="Saját tárgyak képe"
                  />
                  <h2>{item.title}</h2>
                </div>
              );
            })}
        </div>
        <div className="min-h-[20vh]  bg-main">
          <h2 className="border-l-8 border-unique px-4 pl-4 md:text-2xl">
            Fogadó tárgyai
          </h2>
          {transactionitems
            ?.filter((x) => x.user_id === item?.receiver)
            ?.map((item) => {
              return (
                <div className="m-2 flex gap-5 shadow-xl" key={item.id}>
                  <Image
                    width={120}
                    height={120}
                    src={`https://squaoauhjrlvmrvyrheb.supabase.co/storage/v1/object/public/items/${
                      item.img_name ? item.img_name : ""
                    }`}
                    alt="Fogadó tárgyainak képe"
                  />
                  <h2>{item.title}</h2>
                </div>
              );
            })}
        </div>
      </div>
      <div className="mx-auto mt-4 flex justify-center gap-4">
        {item?.status !== "accepted" ? (
          <button
            className="btn-primary btn"
            onClick={() => {
              acceptTrade();
              myref.current?.showModal();
            }}
          >
            Elfogadás
          </button>
        ) : null}

        <button className="btn-error btn" onClick={() => declineTrade()}>
          Elutasítás
        </button>
      </div>
    </div>
  );
}
