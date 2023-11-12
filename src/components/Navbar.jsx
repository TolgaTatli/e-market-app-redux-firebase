import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { auth } from "../firebase";
import { LuWallet } from "react-icons/lu";
import { PiBasket } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import counterSlice from "../redux/features/counterSlice";

const Navbar = ({ users }) => {
  const totalCount = useSelector((state) => state.counter.totalValue);
  return (
    <div className="flex border border-gray-200 bg-gray-100 p-4 ">
      <div className="flex gap-12 flex-1 items-center mx-6">
        <FaShoppingBasket size={"60px"} />
        <p
          onClick={() => {
            window.location = "/";
          }}
          className="text-5xl font-bold"
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
          <div className="flex gap-3 items-center mx-5 cursor-pointer ">
            <div className="border rounded-full bg-gray-300 flex items-center w-12 h-12 justify-center">
              <LuWallet size={"40px"} />
            </div>
            <p className="font-semibold text-lg">Cüzdanım</p>
          </div>
          <div className="flex gap-3 items-center mx-5 cursor-pointer ">
            <div className="border rounded-full bg-gray-300 flex items-center w-12 h-12 justify-center">
              <PiBasket size={"40px"} />
              <div className="absolute top-4 right-[110px] rounded-full  flex items-center justify-center w-7 h-7 bg-gray-200">
                <span className="font-bold text-lg text-green-800">
                  {totalCount}
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
