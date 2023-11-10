import React from "react";

const ProductCart = ({ product }) => {
  return (
    <div className="flex w-[450px] p-4 m-1 border rounded-md h-[450px] items-center justify-center flex-col shadow-md ">
      <img
        className="w-[350px] h-[240px] object-contain"
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
        <div className="relative left-36 bottom-8">
          icn
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
