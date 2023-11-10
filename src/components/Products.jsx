import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import ProductCart from "./ProductCart";

const ref = collection(db,"products");

const Products = () => {
  const  [data,isLoading]  = useCollectionData(ref);
  return (
    <div className="flex flex-wrap items-center justify-center gap-1 py-4">
      {data?.map((product,id)=>(
        <ProductCart  key={id} product={product} />
      ))}
    </div>
  )
 
};

export default Products;
