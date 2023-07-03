import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tecseréd</title>
        <meta name="description" content="Egy online csere platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[url('../../public/bg.jpg')] bg-cover bg-no-repeat text-white">
        <div className="hero-content text-center">
          <div className="rounded-3xl bg-gradient-to-b from-slate-800 to-transparent p-8">
            <h1 className="text-[7rem]">TeCseréd</h1>
            <p className="py-6">
              Üdvözöllek halandó! Ha netán fennmaradt pár tárgyad amit el
              szeretnél cserélni, akkor itt a helyed!
            </p>
            <button className="btn-outline btn bg-blue-300 text-black">
              Cserére fel!
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
