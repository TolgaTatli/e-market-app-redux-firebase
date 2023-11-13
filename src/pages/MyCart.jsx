import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/counterSlice";
import { PiBasket } from "react-icons/pi";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const ref = collection(db, "products");

const MyCart = () => {
  const [data] = useCollectionData(ref);
  const cartItems = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  // Sepetteki ürünleri filtrele
  const cartProducts = data?.filter(
    (product) => cartItems[product.name]?.value > 0
  );

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId }));
  };

  return (
    <div>
      <div className="px-[5%] py-6 bg-gradient-to-r from-slate-200 to-slate-500">
        <div className="flex items-center gap-6 max-w-[200px] border h-[70px] px-2 bg-gray-300 rounded-2xl ">
          <PiBasket size={"45px"} />
          <p className="font-semibold text-2xl">Sepetim</p>
        </div>
      </div>

      {/* Sepet içeriği */}
      {cartProducts && cartProducts.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center flex-col my-7">
          {cartProducts.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-6 m-2 border-2 w-[1800px] rounded-lg border-slate-300"
            >
              <div className="flex items-center p-2 gap-6 justify-center">
                <img
                  src={product?.image}
                  className="object-contain w-36 h-36"
                />
                <div>
                  <p className="font-semibold text-xl">{product.name}</p>
                  <p className="text-xs py-1 text-red-700">
                    Stokta {product?.count} adet
                  </p>
                </div>
              </div>

              <div className="flex gap-9 items-center justify-center">
                <div className="flex gap-2 items-center justify-center border rounded-full bg-blue-100">
                  <AiOutlineMinusCircle
                    size={"50px"}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => handleRemoveFromCart(product.name)}
                  />

                  <p className="font-bold text-2xl">
                    {cartItems[product.name].value}
                  </p>
                  <AiOutlinePlusCircle
                    color="green"
                    className="cursor-pointer"
                    size={"50px"}
                    onClick={() => handleAddToCart(product.name)}
                  />
                </div>

                <p className="text-3xl font-bold text-blue-800 ">
                  {product.price} TL
                </p>
              </div>
            </div>
          ))}
          <div className="flex w-[1920px] justify-end py-14 px-14">
            <button
              onClick={()=> {
                window.location = "/wallet"
              }}
              className=" w-[450px] h-[82px] text-3xl font-bold text-white bg-gray-500 rounded-2xl"
            >
              Sepeti Onayla
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-4">Sepetinizde ürün bulunmamaktadır.</div>
      )}
    </div>
  );
};

export default MyCart;
