import Card from "~/components/Card";
import useItems from "~/hooks/useItems";

export default function Items() {
  const { itemsarr, loading } = useItems();
  return (
    <div className="mx-auto px-4 pt-5 md:w-[80%]">
      <h1 className="border-b border-t text-center text-[2rem] ">Tárgyak</h1>
      <div className="hidden justify-between pb-5 md:flex">
        <div className="breadcrumbs w-[20vw] text-sm">
          <ul>
            <li>
              <a>Kategóriák</a>
            </li>
            <li>
              <a>Összes</a>
            </li>
          </ul>
        </div>
        <div className="flex align-middle">
          <button className="mt-2 h-[34px] w-[34px] border hover:bg-slate-200">
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6.5C3 8.05556 3.5 9.41667 4 9.61111C4.5 9.80556 8 10 12 10C16 10 19.5 9.80555 20 9.61111C20.5 9.41667 21 8.05556 21 6.5C21 4.94444 20.5 3.58333 20 3.38889C19.5 3.19444 16 3 12 3C8 3 4.5 3.19444 4 3.38889C3.5 3.58333 3 4.94444 3 6.5Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 17.5C3 19.0556 3.5 20.4167 4 20.6111C4.5 20.8056 8 21 12 21C16 21 19.5 20.8056 20 20.6111C20.5 20.4167 21 19.0556 21 17.5C21 15.9444 20.5 14.5833 20 14.3889C19.5 14.1944 16 14 12 14C8 14 4.5 14.1944 4 14.3889C3.5 14.5833 3 15.9444 3 17.5Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="mr-8 mt-2 h-[34px] w-[34px] border hover:bg-slate-200">
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.75 3C3.88235 3 3 3.88235 3 6.75C3 9.61765 3.88235 10.5 6.75 10.5C9.61765 10.5 10.5 9.61765 10.5 6.75C10.5 3.88235 9.61765 3 6.75 3Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.75 13.5C3.88235 13.5 3 14.3824 3 17.25C3 20.1176 3.88235 21 6.75 21C9.61765 21 10.5 20.1176 10.5 17.25C10.5 14.3824 9.61765 13.5 6.75 13.5Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.25 13.5C14.3824 13.5 13.5 14.3824 13.5 17.25C13.5 20.1176 14.3824 21 17.25 21C20.1176 21 21 20.1176 21 17.25C21 14.3824 20.1176 13.5 17.25 13.5Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.25 3C14.3824 3 13.5 3.88235 13.5 6.75C13.5 9.61765 14.3824 10.5 17.25 10.5C20.1176 10.5 21 9.61765 21 6.75C21 3.88235 20.1176 3 17.25 3Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <select className="select-bordered select" defaultValue={"0"}>
            <option value="0">Alapértelmezett</option>
            <option>Értékesebb elöl</option>
            <option>Értéktelenebb elöl</option>
          </select>
        </div>
      </div>
      <div>
        {itemsarr === undefined || itemsarr?.length === 0 || loading ? (
          <span className="loading loading-spinner loading-md mx-auto">
            Nincsenek tárgyak
          </span>
        ) : (
          <div className="grid lg:grid-cols-2 2xl:grid-cols-3">
            {itemsarr?.map((item) => {
              return <Card item={item} key={item.id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
