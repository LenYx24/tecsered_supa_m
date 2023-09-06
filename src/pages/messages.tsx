import React, { useEffect, useState } from "react";
import imgsvg from "../../public/nomessage.svg";
import Image from "next/image";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "lib/database.types";
import Link from "next/link";

const Messages = () => {
  const supabase = useSupabaseClient<Database>();
  const [trans, setTrans] = useState<
    Database["public"]["Views"]["transactions_with_usernames"]["Row"][] | null
  >(null);

  const user = useUser();
  useEffect(() => {
    async function getData() {
      const iuser = (await supabase.auth.getUser()).data.user;
      if (!iuser) return;
      const { data, error } = await supabase
        .from("transactions_with_usernames")
        .select("*")
        .eq("status", "accepted")
        .or(`initiator.eq.${iuser.id},receiver.eq.${iuser.id}`);
      if (error) console.log(error);
      setTrans(data);
    }
    getData().catch((err) => console.log(err));
  }, []);
  function handleMessagesent() {
    console.log("empty function aahahah");
  }
  function handleChatchange() {
    console.log("empty function aahahah");
  }
  return (
    <div className="pt-2">
      {trans ? (
        <div className="mx-auto grid-cols-[1fr_1.5fr] gap-4 md:grid lg:w-[80vw]">
          <div className="hidden md:block">
            {trans.map((item) => (
              <div
                className="hover:pointer w-full rounded-md border-b border-black bg-white px-6 py-2 text-center hover:bg-main md:text-left"
                key={item.id}
                onClick={handleChatchange}
              >
                <Link
                  href={`offer/${item.id ? item.id : ""}`}
                  className="link underline"
                >
                  Ajánlat azonosító: {item.id}
                </Link>
                <div className="link avatar mx-6">
                  <div className="w-6 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  {user ? (
                    <h3 className="ml-4">
                      {item.initiator === user.id
                        ? item.receiver_username
                        : item.initiator_username}
                    </h3>
                  ) : (
                    <h3></h3>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="relative mx-8 min-h-[70vh] rounded-3xl bg-slate-200 md:mx-0 md:w-full">
            <div>
              <div className="chat chat-start">
                <div className="chat-bubble">
                  It&aposs over Anakin, <br />I have the high ground.
                </div>
              </div>
              <div className="chat chat-end">
                <div className="chat-bubble">You underestimate my power!</div>
              </div>
            </div>
            <div className="absolute bottom-0 flex w-full items-center">
              <input
                type="text"
                className="input m-4 w-full max-w-lg"
                placeholder="Írj egy üzenetet..."
              />
              <button
                className="mr-4 rounded-lg bg-unique p-3 text-white hover:bg-unique hover:opacity-80 md:px-4"
                onClick={handleMessagesent}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.3}
                  stroke="currentColor"
                  className="h-5 w-5 md:h-6 md:w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex flex-col items-center lg:w-[80vw]">
          <Image
            width={400}
            height={400}
            alt="nincsenek levelek kép"
            src={imgsvg as string}
          />
          <h2 className="text-center text-2xl font-bold">
            Úgy néz ki még nincsenek üzeneteid.
            <br /> Először kezdeményezz egy cserét valakivel, és ha elfogadta
            akkor lesz lehetőséged üzenni neki!
          </h2>
        </div>
      )}
    </div>
  );
};

export default Messages;
