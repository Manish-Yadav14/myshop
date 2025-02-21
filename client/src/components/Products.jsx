import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../slices/cartSlice";

export default function Products() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const addToCart = async (product) => {
    try {
      const decoded = jwtDecode(localStorage.getItem("token"));
      const user = await axios.post("http://localhost:3000/auth/userInfo", {
        email: decoded.email,
      });

      //  Make an API call to add the product to the cart in the database
      const response = await axios.post(
        "http://localhost:3000/cart/add-to-cart",
        {
          userId: user.data.id,
          productId: product.id,
        }
      );
      console.log("db data", response.data);
      dispatch(addItemToCart(response.data));
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  
  const getProducts = async () => {
    const result = await axios.get("http://localhost:3000/api/all-products");
    setProducts(result.data);
    // console.log(result.data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
      {products.map((product) => (
        <section
          key={product.id}
          className="flex flex-col justify-between rounded-md border shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 min-h-[500px]"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-56 rounded-t-md md:h-72 lg:h-64"
          />
          <div className="p-4 flex flex-col justify-between flex-grow">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h1>
              <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900">
                {product.category.name}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-600 line-clamp-3">
              {product.description}
            </p>
            <div className="mt-5 flex items-center justify-start">
              <div className="text-xl font-bold text-black m-2">
                ₹{product.price}
              </div>
              <span className="text-md text-gray-400 line-through m-2">
                ₹{(product.price + product.price * 0.24).toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => addToCart(product)}
              type="button"
              className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Add to Cart
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}
