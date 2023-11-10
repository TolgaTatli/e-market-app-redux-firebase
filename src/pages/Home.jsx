import React from "react";
import { auth } from "../firebase";
import { useEffect } from "react";
import image from "/homeimage.png";
import SearchBar from "../components/SearchBar";
import Products from "../components/Products";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  return (
    // if no login
    <>
      <div className="border bg-gradient-to-r from-slate-200 to-slate-400 flex">
        <div className="flex items-center flex-col justify-center">
          <p className="text-3xl font-bold px-16 ">
            En uygun fiyatlara ulaşmak için giriş yapın!
          </p>
          <SearchBar />
        </div>
        <img src={image} className="object-contain m-auto" />
      </div>
      <Products />
    </>
  );
};

export default Home;
