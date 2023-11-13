import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import SearchBar from "../components/SearchBar";
import Products from "../components/Products";
import CategoryList from "../components/CategoryList";
import image from "/homeimage.png";

const ref = collection(db, "products");

const Home = ({ users }) => {
  const [data] = useCollectionData(ref);
  const authState = useAuthState(auth);
  const isUser = authState[0]?.uid;

  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const categories = data?.map((item) => item?.category) || [];
      const uniqueCategoriesSet = new Set(categories);
      setUniqueCategories([...uniqueCategoriesSet]);
    };

    if (isUser !== null) {
      fetchData();
    }
  }, [data, isUser]);

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
            <SearchBar setSearchKeyword={setSearchKeyword} />
          </div>
          <img src={image} className="object-contain m-auto" />
        </div>
      ) : (
        <div className="border bg-gradient-to-r from-slate-200 to-slate-400 flex justify-between">
          <SearchBar setSearchKeyword={setSearchKeyword} />
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
      <Products
        users={users}
        selectedCategory={selectedCategory}
        searchKeyword={searchKeyword}
      />
    </>
  );
};

export default Home;
