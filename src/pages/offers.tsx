import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "lib/database.types";
import React, { useEffect, useState } from "react";

const Offers = () => {
  const [offrs, setOffrs] =
    useState<Database["public"]["Tables"]["transactions"]["Row"][]>();
  const [receivedoffrs, setReceivedOffrs] =
    useState<Database["public"]["Tables"]["transactions"]["Row"][]>();
  const supabaseClient = useSupabaseClient<Database>();
  const user = useSupabaseClient().auth.getUser();
  useEffect(() => {
    async function loadOffrs() {
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("initiator", (await user).data?.user?.id);
      console.log(data);
      console.log(error);
      if (data === null) return;
      setOffrs(data);
      const { data: rec, error: recerr } = await supabaseClient
        .from("transactions")
        .select("*")
        .eq("receiver", (await user).data?.user?.id);
      console.log(rec);
      console.log(recerr);
      if (rec === null) return;
      setReceivedOffrs(rec);
    }
    loadOffrs().catch((err) => console.error(err));
  }, []);
  return (
    <div className="mx-auto w-[80%]">
      <h2>Elküldött Ajánlatok</h2>
      <div className="mx-auto">
        <table className="table overflow-scroll">
          <thead>
            <tr>
              <th>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox rounded-none"
                  />
                </label>
              </th>
              <th>id</th>
              <th>időpont</th>
              <th>kezdeményező</th>
              <th>fogadó</th>
              <th>státusz</th>
            </tr>
          </thead>
          <tbody>
            {offrs?.map((x) => (
              <tr key={x.id}>
                <th>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox-primary checkbox rounded-none"
                    />
                  </label>
                </th>

                <th>{x.id}</th>
                <td>{x.created_at}</td>
                <td>{x.initiator}</td>
                <td>{x.receiver}</td>
                <td>{x.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Kapott Ajánlatok</h2>
      <div className="mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox rounded-none"
                  />
                </label>
              </th>
              <th>id</th>
              <th>időpont</th>
              <th>kezdeményező</th>
              <th>fogadó</th>
              <th>státusz</th>
              <th>Akció</th>
            </tr>
          </thead>
          <tbody>
            {receivedoffrs?.map((x) => (
              <tr key={x.id}>
                <th>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox-primary checkbox rounded-none"
                    />
                  </label>
                </th>
                <th>{x.id}</th>
                <td>{x.created_at}</td>
                <td>{x.initiator}</td>
                <td>{x.receiver}</td>
                <td>{x.status}</td>
                <td>
                  <button className="btn bg-maindark text-white hover:bg-maindark hover:opacity-80">
                    Tovább
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Offers;
