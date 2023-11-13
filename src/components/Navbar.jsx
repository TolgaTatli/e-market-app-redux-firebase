import React, { useEffect } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { auth, db } from "../firebase";
import { LuWallet } from "react-icons/lu";
import { PiBasket } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/counterSlice";
import { data } from "autoprefixer";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const ref = collection(db, "products");

const Navbar = ({ users }) => {
  const dispatch = useDispatch();
  const [data] = useCollectionData(ref);
  const totalBalance = useSelector((state) => state.wallet.formattedBalance);
  const totalBalanceNum = useSelector((state) => state.wallet.totalBalanceNum);
  const totalCount = useSelector((state) => state.counter.totalValue);
  const cartItems = useSelector((state) => state.counter);
  let localTotalCount = localStorage.getItem("totalValue");

  localTotalCount = localTotalCount ? parseInt(localTotalCount, 10) : 0;
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
  const restBalance = totalBalanceNum - calculateTotal(cartItems, data);

  useEffect(() => {
    // Redux store'daki değeri güncelle
    dispatch(addToCart({ productId: "ProductId" }));
  }, [dispatch]);
  return (
    <div className="flex border border-gray-200 bg-gray-100 p-4 ">
      <div className="flex gap-12 flex-1 items-center mx-6">
        <FaShoppingBasket size={"60px"} />
        <p
          onClick={() => {
            window.location = "/";
          }}
          className="text-5xl font-bold cursor-pointer"
        >
          E-Market
        </p>
      </div>

      {/* login durumuna göre değişecek olan kısım burası */}

      {users ? (
        // yani giriş yapmış ise!
        <div className="flex">
          <div
            onClick={() => {
              window.location = "/";
              auth.signOut();
            }}
            className="flex gap-3 items-center mx-5 cursor-pointer "
          >
            <div className="border rounded-full bg-gray-300 flex items-center w-12 h-12 justify-center">
              <FaRegCircleUser size={"40px"} />
            </div>

            <p className="font-semibold text-lg">Çıkış Yap</p>
          </div>
          <div
            onClick={() => {
              window.location = "/wallet";
            }}
            className="flex gap-3 items-center mx-5 cursor-pointer "
          >
            <div className="border rounded-full bg-gray-300 flex items-center w-12 h-12 justify-center">
              <LuWallet size={"40px"} />
            </div>
            <p className="font-semibold text-lg">Cüzdanım</p>
            <p className="bg-slate-300 max-w-[100px] h-[37px] flex items-center justify-center font-semibold rounded-lg">
              {restBalance.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })}
            </p>
          </div>
          <div
            onClick={() => {
              window.location = "/cart";
            }}
            className="flex gap-3 items-center mx-5 cursor-pointer "
          >
            <div className="border rounded-full bg-gray-300 flex items-center w-12 h-12 justify-center">
              <PiBasket size={"40px"} />
              <div className="absolute top-4 right-[110px] rounded-full  flex items-center justify-center w-7 h-7 bg-gray-200">
                <span className="font-bold text-lg text-slate-500">
                  {localTotalCount}
                </span>
              </div>
            </div>
            <p className="font-semibold text-lg">Sepetim</p>
          </div>
        </div>
      ) : (
        // yani çıkış yapmış ise

        <div
          onClick={() => {
            window.location = "/auth";
            auth.signOut();
          }}
          className="flex gap-4 items-center mx-6 cursor-pointer"
        >
          <div className="border rounded-full bg-gray-300 flex items-center w-12 h-12 justify-center">
            <FaRegCircleUser size={"40px"} />
          </div>
          <p className="font-semibold text-lg">Giriş Yap</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
