import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/counterSlice";
import { LuWallet } from "react-icons/lu";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { getInitialStateFromLocalStorage } from "../localstorage";

const ref = collection(db, "products");

const MyWallet = () => {
  const calculateTotal = (cartItems, products) => {
    let total = 0;
    for (const productName in cartItems) {
      const product = products?.find((p) => p.name === productName);
      if (product) {
        total += cartItems[productName].value * product.price;
      }
    }
    return total;
  };
  const totalBalance = useSelector((state) => state.wallet.formattedBalance);
  const [data] = useCollectionData(ref);
  const cartItems = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const totalBalanceNum = useSelector((state) => state.wallet.totalBalanceNum);
  const checkBalance = totalBalanceNum - calculateTotal(cartItems, data);

  const restBalance = (
    totalBalanceNum - calculateTotal(cartItems, data)
  ).toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });

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
      <div className="px-[5%] py-6 bg-gradient-to-r from-slate-200 to-slate-500 flex items-center gap-6">
        <div className="flex items-center gap-6 max-w-[200px] border h-[70px] px-2 bg-gray-300 rounded-2xl ">
          <LuWallet size={"45px"} />
          <p className="font-semibold text-2xl">Cüzdanım</p>
        </div>
        <p className="bg-gradient-to-r from-slate-300 to-slate-400 w-[130px] h-[55px] text-xl flex items-center justify-center font-semibold rounded-lg border-2 border-blue-950">
          {restBalance}
        </p>
      </div>

      {/* Sepet içeriği */}
      {cartProducts && cartProducts.length > 0 ? (
        <div className="flex flex-col">
          <div className="flex flex-col items-start gap-4 py-12">
            <div className="flex justify-around items-center w-full px-12 ">
              <p className="text-3xl font-bold">Sepetinizdeki Ürünler</p>
              <p className="text-3xl font-bold">Bakiye Bilgileri</p>
            </div>
            <div className="flex flex-wrap justify-between gap-12 px-12">
              {cartProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6  border-2 w-[1000px] rounded-lg border-slate-300 m-auto"
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
              <div className="w-[620px]">
                <div className="border-2 m-4 p-3 rounded-lg border-slate-300 ">
                  <div className="flex items-center justify-evenly py-2">
                    <p className="text-xl font-bold">Toplam Bakiyeniz :</p>
                    <p className="bg-gradient-to-r from-slate-300 to-slate-400 w-[110px] h-[45px] text-xl flex items-center justify-center font-semibold rounded-lg border-2 border-blue-950">
                      {totalBalance}
                    </p>
                  </div>
                  <div className="flex items-center justify-evenly py-2">
                    <p className="text-xl font-bold">
                      Toplam Sepet Tutarınız :
                    </p>
                    <p className="bg-gradient-to-r from-slate-300 to-slate-400 w-[110px] h-[45px] text-xl flex items-center justify-center font-semibold rounded-lg border-2 border-blue-950">
                      {calculateTotal(cartItems, data).toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center justify-evenly py-2">
                    <p className="text-xl font-bold">Kalan Bakiyeniz : </p>
                    <p className="bg-gradient-to-r from-slate-300 to-slate-400 w-[110px] h-[45px] text-xl flex items-center justify-center font-semibold rounded-lg border-2 border-blue-950">
                      {checkBalance >= 0 ? restBalance : "Yetersiz"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ChartjS */}
          <div className="p-4">
            <p className="text-3xl font-bold">Harcamalarınızın Dağılımı</p>
            <div className="flex py-12 gap-4 items-center">
              <p className="text-xl font-bold">Toplam Sepet Tutarınız :</p>
              <p className="bg-gradient-to-r from-slate-300 to-slate-400 w-[110px] h-[45px] text-xl flex items-center justify-center font-semibold rounded-lg border-2 border-blue-950">
                {calculateTotal(cartItems, data).toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                })}
              </p>
            </div>
          </div>
          <div>
            Chart JS
          </div>
          <div>
            <button className=" w-[250px] h-[62px] text-2xl font-semibold text-white bg-gray-500 rounded-2xl">
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

export default MyWallet;
