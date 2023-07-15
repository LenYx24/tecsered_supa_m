import Navbar from "./Navbar";
import Footer from "./Footer";
import React from "react";

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] bg-slate-100" data-theme="cupcake">
        {children}
      </div>
      <Footer />
    </>
  );
}
