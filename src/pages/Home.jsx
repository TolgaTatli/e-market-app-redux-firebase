import React from "react";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import image from "/homeimage.png";
import SearchBar from "../components/SearchBar";
import Products from "../components/Products";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CategoryList from "../components/CategoryList";

const ref = collection(db, "products");

const Home = ({users}) => {
  const [data] = useCollectionData(ref);
  const authstate = useAuthState(auth);
  const isUser = authstate[0]?.uid;

  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    // başta undefind dönmesini kontrol et!!
    const categories = data?.map((item) => item?.category) || [];

    const uniqueCategoriesSet = new Set(categories);

    setUniqueCategories([...uniqueCategoriesSet]);
  }, [data]);

  return (
    <>
      {isUser == null ? (
        //giriş yapmışsa
        <div className="border bg-gradient-to-r from-slate-200 to-slate-400 flex">
          <div className="flex items-center flex-col justify-center">
            <p className="text-3xl font-bold px-16 ">
              En uygun fiyatlara ulaşmak için giriş yapın!
            </p>
            <SearchBar />
          </div>
          <img src={image} className="object-contain m-auto" />
        </div>
      ) : (
        // giriş yapmamışsa
        <div className="border bg-gradient-to-r from-slate-200 to-slate-400 flex justify-evenly">
          <SearchBar />
          {uniqueCategories.map((category, id) => (
            <div className="flex justify-center items-center" key={id}>
              <CategoryList category={category} />
            </div>
          ))}
        </div>
      )}
      <Products users={users} />
    </>
  );
};

export default Home;
