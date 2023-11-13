import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import SearchBar from "../components/SearchBar";
import Products from "../components/Products";
import CategoryList from "../components/CategoryList";

const ref = collection(db, "products");

const Home = ({ users }) => {
  const [data] = useCollectionData(ref);
  const authState = useAuthState(auth);
  const isUser = authState[0]?.uid;

  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const categories = data?.map((item) => item?.category) || [];
    const uniqueCategoriesSet = new Set(categories);
    setUniqueCategories([...uniqueCategoriesSet]);
  }, [data]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      {isUser == null ? (
        <div className="border bg-gradient-to-r from-slate-200 to-slate-400 flex">
          <div className="flex items-center flex-col justify-center">
            <p className="text-3xl font-bold px-16 ">
              En uygun fiyatlara ulaşmak için giriş yapın!
            </p>
            <SearchBar />
          </div>
        </div>
      ) : (
        <div className="border bg-gradient-to-r from-slate-200 to-slate-400 flex justify-evenly">
          <SearchBar />
          {uniqueCategories.map((category, id) => (
            <div className="flex justify-center items-center" key={id}>
              <CategoryList
                category={category}
                onCategoryClick={handleCategoryClick}
                isSelected={selectedCategory === category}
              />
            </div>
          ))}
        </div>
      )}
      <Products users={users} selectedCategory={selectedCategory} />
    </>
  );
};

export default Home;
