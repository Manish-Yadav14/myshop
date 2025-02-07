import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import {useDispatch,useSelector} from 'react-redux'
import {addItemToCart} from '../slices/cartSlice'

export default function Products() {
  const [products,setProducts] = useState([]);
  const dispatch = useDispatch();

  const addToCart = async (product)=>{
    try {
      const decoded = jwtDecode(localStorage.getItem('token'));
      const user = await axios.post('http://localhost:3000/auth/userInfo',{email:decoded.email})
    
      //  Make an API call to add the product to the cart in the database
      const response = await axios.post('http://localhost:3000/cart/add-to-cart', {
        userId: user.data.id,
        product: product,
      });
      console.log("db data",response.data.items);
      dispatch(addItemToCart(response.data.items))
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }

  console.log('slice',useSelector((state)=>state.cart));

  
  const getProducts = async ()=>{
    const result = await axios.get('http://localhost:3000/api/all-products');
    setProducts(result.data);
    // console.log(result.data);
  }
  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
      {products.map((product)=>(
        <section key={product.id} className="rounded-md border">
          <img
            src="https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwxMTM4MTU1NXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Laptop"
            className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
          />
          <div className="p-4">
            <div className='flex flex-row justify-between'>
                <h1 className="flex items-center text-lg font-semibold">{product.name}</h1>
                <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900">
                    {product.category}
                </span>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              {product.description}
            </p>
            <div className="mt-5 flex items-center ">
              <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                ₹{product.price}
              </div>
              <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
               ₹{product.price + (product.price)*0.24}
              </span>
            </div>
            <button
              onClick={()=>addToCart(product)}
              type="button"
              className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add to Cart
            </button>
          </div>
        </section>
      ))}
        
    </div>
  )
}
