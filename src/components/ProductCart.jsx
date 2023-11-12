import React from "react";
import { useState } from "react";
import { TbShoppingCartPlus } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/features/counterSlice";
import {BiPlus} from "react-icons/bi"

const ProductCart = ({ product }) => {
  const count = useSelector((state) => state.counter[product.name]?.value);
  console.log(product.name,count);
  const dispatch = useDispatch();

  return (
    <div className="flex w-[450px] p-4 m-1 border rounded-md h-[450px] items-center justify-center flex-col shadow-md ">
      <img
        className="w-[320px] h-[220px] object-contain"
        src={product?.image}
        alt=""
      />
      <div className="text-center p-3 my-3 font-bold text-lg cursor-pointer">
        {product?.name}
      </div>
      <div className="relative top-4">
        <div className="font-bold relative right-36  text-lg text-green-500">
          {" "}
          {product?.price} <span>TL</span>{" "}
        </div>
        <div className="font-semibold text-xs relative right-36 text-green-800">
          {" "}
          Stokta {product?.count} adet
        </div>
        <button
          onClick={() => dispatch(addToCart({productId :product.name }))}
          className="relative left-[140px] bottom-8 border bg-slate-400 rounded-full w-12 h-12 hover:animate-pulse"
        >
          <TbShoppingCartPlus size={"30px"} className="relative left-2 top-1" />
          <div className="relative bottom-9 left-7 text-md font-bold border rounded-full w-6 h-6 text-center bg-gray-50">
            <span className="text-slate-500">{count == undefined ? <BiPlus size={'22px'} /> : count}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
