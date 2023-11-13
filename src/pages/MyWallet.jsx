import React from "react";
import { LuWallet } from "react-icons/lu";

const MyWallet = () => {
  return (
    <div>
      <div className="px-[5%] py-6 bg-gradient-to-r from-slate-200 to-slate-500">
        <div className="flex items-center gap-6 max-w-[200px] border h-[70px] px-2 bg-gray-300 rounded-2xl ">
          <LuWallet size={"45px"} />
          <p className="font-semibold text-2xl">Cüzdanım</p>
        </div>
      </div>
    </div>
  );
};

export default MyWallet;

{
  /* <div className="flex items-center justify-end p-4 border-t">
            <p className="font-semibold ">
              Toplam: {calculateTotal(cartItems, data)} TL
            </p>
          </div> */
}

// Toplam fiyatı hesaplama
const calculateTotal = (cartItems, products) => {
  let total = 0;
  for (const productName in cartItems) {
    const product = products.find((p) => p.name === productName);
    if (product) {
      total += cartItems[productName].value * product.price;
    }
  }
  return total;
};
