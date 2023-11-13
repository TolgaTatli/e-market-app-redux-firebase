import React, { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import ProductCart from "./ProductCart";

const ref = collection(db, "products");

const Products = ({ users, selectedCategory }) => {
  const [data] = useCollectionData(ref);

  useEffect(() => {
  }, [selectedCategory]);

  const filteredProducts = data?.filter(
    (product) =>
      selectedCategory === null || product.category === selectedCategory
  );

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
