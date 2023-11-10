import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { FaShoppingBasket } from "react-icons/fa";

const Auth = () => {
  const authComponentStyle = {
    backgroundImage: `url("../auth.jpg")`,
  };

  const [authData, setAuthData] = useState({ email: "", password: "" });

  const onChangeFunction = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };
  const authFunction = async () => {
    try {
      const data = await signInWithEmailAndPassword(
        auth,
        authData.email,
        authData.password
      );
      const user = data.user;
      if (user) {
        window.location = "/";
      } 
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        style={authComponentStyle}
        className="p-2  h-[80vh] flex items-center justify-center"
      >
        <div className="m-auto p-32 border border-slate-100 bg-gradient-to-r from-slate-50 to-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 h-[480px] w-[780px]">
          <h2 className="text-xl">E-Mailiniz</h2>
          <input
            name="email"
            value={authData.email}
            onChange={onChangeFunction}
            type="email"
            placeholder="email"
            className="outline-none bg-slate-200 w-full rounded-xl p-2"
          />

          <h2 className="text-xl">Şifreniz</h2>
          <input
            name="password"
            value={authData.password}
            onChange={onChangeFunction}
            type="password"
            placeholder="password"
            className="outline-none bg-slate-200 w-full rounded-xl p-2"
          />

          <button
            onClick={authFunction}
            className="border border-slate-300 font-bold rounded-full bg-gradient-to-r from-blue-100 to-blue-300 w-full p-3 my-4"
          >
            Giriş Yap
          </button>
        </div>
      </div>
      <footer>
        <div className="flex items-center gap-4 p-2 my-2">
          <FaShoppingBasket size={"30px"} color="gray" />
          <h4 className="font-semibold">E-Market</h4>
        </div>
        <p className="text-md font-medium m-2 w-[170vh]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, eum at
          nostrum voluptatem sapiente, tenetur hic iste expedita suscipit minima
          omnis praesentium corrupti dolorem. Soluta commodi a ducimus labore
          nostrum! In accusamus, fugit, iusto et saepe ratione facere unde
          labore temporibus tenetur animi consequatur. Quasi quae autem voluptas
          omnis, illo cumque, consequatur facere veniam laboriosam modi iusto!
          Corporis, molestiae facilis! Unde error recusandae blanditiis numquam
          voluptatibus debitis magni assumenda officia distinctio et minus
          architecto voluptatem illo, quaerat maiores, delectus veniam
          reiciendis. Quia ab et aliquid nam, est qui voluptatibus blanditiis?
        </p>
      </footer>
    </>
  );
};
export default Auth;
