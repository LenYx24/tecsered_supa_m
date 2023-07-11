import React from "react";
import imgsvg from "../../public/nomessage.svg";
import Image from "next/image";

const Messages = () => {
  return (
    <div className="mx-auto flex flex-col items-center lg:w-[50vw]">
      <Image
        width={400}
        height={400}
        alt="nincsenek levelek kép"
        src={imgsvg as string}
      />
      <h2 className="text-center text-2xl font-bold">
        Úgy néz ki még nincsenek üzeneteid.
        <br /> Először kezdeményezz egy cserét valakivel, és ha elfogadta akkor
        lesz lehetőséged üzenni neki!
      </h2>
    </div>
  );
};

export default Messages;
