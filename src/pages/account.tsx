import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React from "react";

const Account = () => {
  const user = useUser();
  console.log(user?.user_metadata);
  if (!user)
    return (
      <div className="pt-4 text-center text-2xl">
        <h2>
          Ahhoz hogy ehhez az oldalhoz hozzáférj{" "}
          <Link className="text-maindark hover:underline" href="/login">
            jelentkezz be.
          </Link>
        </h2>
        <h2>
          Vagy ha nincs még fiókod, akkor{" "}
          <Link className="text-maindark hover:underline" href="/register">
            regiszrálj
          </Link>
        </h2>
      </div>
    );
  return (
    <div className="mx-auto pt-8 lg:w-[50vw]">
      <h2 className="border-b border-t p-2 text-center text-2xl">
        Üdvözöljük!
        <br />
        Itt találhatja meg a fiókjával kapcsolatos adatokat
      </h2>
      <div className="mx-auto mt-2 rounded-full border p-4 text-center shadow-xl">
        <div className=" text-main">
          <div className="online avatar">
            <div className="flex w-24 items-center justify-center rounded-full opacity-50">
              <svg
                width="96px"
                height="96px"
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>profile [#1335]</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Dribbble-Light-Preview"
                    transform="translate(-420.000000, -2159.000000)"
                    fill="#000000"
                  >
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M374,2009 C371.794,2009 370,2007.206 370,2005 C370,2002.794 371.794,2001 374,2001 C376.206,2001 378,2002.794 378,2005 C378,2007.206 376.206,2009 374,2009 M377.758,2009.673 C379.124,2008.574 380,2006.89 380,2005 C380,2001.686 377.314,1999 374,1999 C370.686,1999 368,2001.686 368,2005 C368,2006.89 368.876,2008.574 370.242,2009.673 C366.583,2011.048 364,2014.445 364,2019 L366,2019 C366,2014 369.589,2011 374,2011 C378.411,2011 382,2014 382,2019 L384,2019 C384,2014.445 381.417,2011.048 377.758,2009.673"
                        id="profile-[#1335]"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <svg
            width="48px"
            height="48px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
              fill="#3C5F1B"
            />
          </svg>
        </div>

        <div className=" text-maindark">{user.email}</div>
        <div className="">@{user.user_metadata.username}</div>
      </div>
    </div>
  );
};

export default Account;
