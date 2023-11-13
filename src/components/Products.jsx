import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import ProductCart from "./ProductCart";

const ref = collection(db, "products");

const Products = ({ users, selectedCategory, searchKeyword }) => {
  const [data] = useCollectionData(ref);

  const filteredProducts = data?.filter((product) => {
    const categoryFilter =
      !selectedCategory || product.category === selectedCategory;
    const searchFilter =
      !searchKeyword ||
      product.name.toLowerCase().includes(searchKeyword.toLowerCase());
    return categoryFilter && searchFilter;
  });

  return (
    <div
      className={`flex flex-wrap gap-1 py-4 ${
        filteredProducts?.length < 4 ? "justify-normal mx-7" : "justify-center"
      }`}
    >
      {filteredProducts?.map((product, id) => (
        <ProductCart users={users} key={id} product={product} />
      ))}
    </div>
  );
};

export default Products;
