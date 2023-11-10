import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { auth } from "../firebase";

const Navbar = ({ users }) => {
  return (
    <div className="flex border border-gray-200 bg-gray-100 p-4">
      <div className="flex gap-12 flex-1 items-center mx-6">
        <FaShoppingBasket size={"60px"} />
        <p className="text-5xl font-bold">E-Market</p>
      </div>

      {/* login durumuna göre değişecek olan kısım burası */}

      {users ? (
        <div
          onClick={() => {
            window.location = "/";
            auth.signOut()
          }}
          className="flex gap-4 items-center mx-6 cursor-pointer "
        >
          <FaRegCircleUser size={"40px"} />
          <p className="font-semibold text-lg">Çıkış Yap</p>
        </div>
      ) : (
        <div className="flex gap-4 items-center mx-6  ">
          <FaRegCircleUser size={"40px"} />
          <p className="font-semibold text-lg">Giriş Yap</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
