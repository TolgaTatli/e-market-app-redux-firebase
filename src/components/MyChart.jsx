import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

const MyChart = ({ data }) => {
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const cartItems = useSelector((state) => state.counter);

  useEffect(() => {
    const fetchData = async () => {
      const categories = data?.map((item) => item?.category) || [];
      const uniqueCategoriesSet = new Set(categories);
      setUniqueCategories([...uniqueCategoriesSet]);
    };

    fetchData();
  }, [data]);

  const cartProducts = data?.filter(
    (product) => cartItems[product.name]?.value > 0
  );

  const chartData = {
    labels: uniqueCategories,
    datasets: [
      {
        label: "Toplam Tutar",
        data: uniqueCategories.map((category) => {
          const total = cartProducts.reduce((acc, cart) => {
            return cart.category === category ? acc + cart.price * cartItems[cart.name].value : acc;
          }, 0);
          return total;
        }),
        backgroundColor: 'rgba(154, 138, 138, 0.2)',
        borderColor: '#1b2121',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar data={chartData}/>
    </div>
  );
};

export default MyChart;
