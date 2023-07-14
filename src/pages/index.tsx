import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import herosvg from "../../public/hero.svg";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tecseréd</title>
        <meta name="description" content="Egy online csere platform" />
      </Head>
      <main className="bg-hero-pattern flex min-h-[95vh] cursor-default flex-col items-center justify-center bg-main font-bold text-unique lg:flex-row">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-[4rem] transition-all hover:scale-110 hover:drop-shadow-2xl md:text-[5rem] lg:text-[7rem]">
              TeCseréd
            </h1>
            <p className="py-6 text-slate-600">
              Vannak{" "}
              <span className="decoration underline decoration-maindark decoration-wavy">
                nem használt
              </span>{" "}
              tárgyaid amikre már semmi szükséged?
              <br /> Cseréld el ezeket valami másra, ami talán{" "}
              <span className="underline decoration-unique decoration-4">
                hasznos
              </span>{" "}
              lesz neked!
            </p>
            <button className="hover: bg-unique px-5 py-3 text-white transition-all hover:scale-110">
              Cserére fel!
            </button>
          </div>
        </div>
        <div>
          <Image
            width={580}
            src={herosvg as string}
            alt="zöld figurák társalognak"
            priority
          />
        </div>
      </main>
      <section className="flex flex-col items-center justify-center bg-main font-bold text-unique lg:flex-row"></section>
    </>
  );
};

export default Home;
