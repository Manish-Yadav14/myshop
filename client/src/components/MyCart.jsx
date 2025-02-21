import React, { useState,useEffect } from "react";
import {Trash} from 'lucide-react'
import axios from 'axios';
import { clearCart } from "../slices/cartSlice";
import {jwtDecode} from 'jwt-decode'
import { useDispatch } from "react-redux";
import {loadStripe} from '@stripe/stripe-js'


function MyCart() {
  const [cart,setCart] = useState([]);
  const dispatch = useDispatch();
  const [totalPrice,setTotalPrice] = useState("");

  const getCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if(!token) return;
      const decoded = jwtDecode(token);
      const user = await axios.post('http://localhost:3000/auth/userInfo',{email:decoded.email});      
      const result = await axios.post('http://localhost:3000/cart/get-cart',{userId:user.data.id});
      setCart(result.data);
      setTotalPrice(calculateTotalPrice(result.data));
    } catch (error) {
      console.error('Error fetching cart', error);
    }
  };

  const calculateTotalPrice = (cart)=>{
    if(!Array.isArray(cart)) return 0;
    let total = 0;
    cart.forEach(item => {
      const quantity = item.quantity;
      const price = item.product.price;
      const amt = price * quantity;
      total+=amt;
    });
    return total;
  }

  useEffect(()=>{
    getCart();
  },[])

  const emptyCart = ()=>{
    useDispatch(clearCart());
  }

  const makePayment = async()=>{
    const stripePromise = loadStripe(import.meta.env.VITE_REACT_STRIPE_PUBLISHABLE_KEY);

    const response = await axios.post('http://localhost:3000/create-checkout-session',{items:cart});

    console.log(response);
    const {id} = response.data;
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({sessionId:id})
  }


  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-20">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <div className="flex">
          <h1 className="flex-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <button onClick={emptyCart} type="button" className="flex items-center space-x-1 px-4 py-1 pl-0">
              <Trash size={30} className="text-red-500" />
              <span className="text-md font-medium text-red-500">Empty Cart</span>
          </button>
        </div>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul role="list" className="divide-y divide-gray-200">
              {Array.isArray(cart) && cart.length>0 && cart.map((e) => (
                <div key={e.product.id} className="">
                  <li className="flex py-6 sm:py-6 ">
                    <div className="flex-shrink-0">
                      <img
                        src={e.product.images[0]}
                        alt={e.product.name}
                        className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-md">
                              <a href="#" className="font-semibold text-black">
                                {e.product.name}
                              </a>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-md">
                          </div>
                          <div className="mt-1 flex items-end">
                            <p className="text-sm font-medium text-gray-500 line-through">
                              ₹{(e.product.price + e.product.price * 0.24).toFixed(2)}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              &nbsp;&nbsp;₹{e.product.price}
                            </p>
                            &nbsp;&nbsp;
                            <p className="text-sm font-medium text-green-500">24% discount</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div className="mb-2 flex">
                    <div className="min-w-24 flex">
                      <button type="button" className="h-7 w-7">
                        -
                      </button>
                      <div
                        className="mx-1 h-7 w-9 text-black rounded-md border text-center">{e.quantity} </div>
                      <button type="button" className="flex h-7 w-7 items-center justify-center">
                        +
                      </button>
                    </div>
                    <div className="ml-6 flex text-sm">
                      <button type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                        <Trash size={12} className="text-red-500" />
                        <span className="text-xs font-medium text-red-500">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </section>
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
          >
            <h2
              id="summary-heading"
              className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
            >
              Price Details
            </h2>
            <div>
              <dl className=" space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">Price </dt>
                  <dd className="text-sm font-medium text-gray-900">₹ {Number(totalPrice).toLocaleString()}</dd>
                </div>
                {/* <div className="flex items-center justify-between pt-4">
                  <dt className="flex items-center text-sm text-gray-800">
                    <span>Discount</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">- ₹ 3,431</dd>
                </div> */}
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-800">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">Free</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                  <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                  <dd className="text-base font-medium text-gray-900">₹ {Number(totalPrice).toLocaleString()}</dd>
                </div>
              </dl>
              {/* <div className="px-2 pb-4 font-medium text-green-700">
                You will save ₹ 3,431 on this order
              </div> */}
              <button
              onClick={makePayment}
              type="button"
              className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Checkout
            </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  )

}


export default MyCart;
