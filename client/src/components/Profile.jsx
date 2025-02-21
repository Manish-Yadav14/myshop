import React, { useState } from "react";
import {
  BarChart,
  Wallet,
  ArrowRight,
  BellRing,
  Paperclip,
  Brush,
  Wrench,
} from "lucide-react";

import axios from "axios";
import { useSelector } from 'react-redux';

export default function SidebarOne() {
  const {isLoggedIn,user} = useSelector((state) => state.auth);

  const [productName,setProductName] = useState("");
  const [description,setDesciption] = useState("");
  const [category,setCategory] = useState("");
  const [price,setPrice] = useState("");
  const [image,setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e)=>{
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); 
    } 
  }

  const handleFormSubmit = async (e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image",image);
      const uploadresponse = await axios.post("http://localhost:3000/api/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",  // Indicate the content type as multipart
        },
      });

      const res = await axios.post("http://localhost:3000/api/add-product",{name:productName,description,price,category,images:[uploadresponse.data.imageUrl]});
      if(res.status==201) 
        console.log("Product added!!");
        alert("product added");
    } catch (error) {
      console.log(error);
    }
  }

  if(!isLoggedIn){
    return(
      <div>Please Login..</div>
    )
  }

  return (
    <>
    <div className="flex">

      <aside className="flex h-screen w-60 flex-col overflow-y-auto border-r bg-white px-5 py-8">
        <a href="#">
          <div className="m-auto w-24">
            <img
              className="rounded-full"
              alt="Tailwind CSS Navbar component"
              src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"
            />
          </div>
        </a>
        <div className="px-3 mt-2 m-auto text-xl font-semibold  text-gray-900">{user?.username || "Guest"}</div>
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                utilities
              </label>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <BarChart className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Dashboard</span>
              </a> 
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <Wallet className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Sales</span>
              </a> 
            </div>
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                content
              </label>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <BellRing className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Notifications</span>
              </a>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <Paperclip className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Checklists</span>
              </a>
            </div>
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                Customization
              </label>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <Brush className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Themes</span>
              </a>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <Wrench className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Settings</span>
              </a>
            </div>
          </nav>
        </div>
      </aside>

      <div className="flex flex-col m-auto mt-8 mb-12">
        <h1 className="text-center text-3xl font-bold leading-tight text-black">Add New Product</h1>
        <form action="#" method="POST" className="mt-8 ">
            <div className="space-y-5">
              <div>
                <label htmlFor="productName" className="text-base font-medium text-gray-900">
                  {' '}
                  Product Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    value ={productName}
                    onChange={(e)=>setProductName(e.target.value)}
                    className="flex h-10 w-[500px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Product Name"
                    id="productName"
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="description" className="text-base font-medium text-gray-900">
                  {' '}
                  Description {' '}
                </label>
                <div className="mt-2">
                  <input
                    value={description}
                    onChange={(e)=>setDesciption(e.target.value)}
                    className="flex h-10 w-[500px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter Brief Description here"
                    id="description"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="category" className="text-base font-medium text-gray-900">
                    {' '}
                    Category{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    className="flex h-10 w-[500px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter Category"
                    id="category"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="price" className="text-base font-medium text-gray-900">
                    {' '}
                    Price{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    value = {price}
                    onChange={(e)=>setPrice(e.target.value)}
                    className="flex h-10 w-[500px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter Price"
                    id="price"
                  ></input>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="image" className="text-base font-medium text-gray-900">
                    {' '}
                    Images{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={handleImageChange}
                    className="flex h-10 w-[500px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="file"
                    accept="image/*"
                    id="image"
                  ></input>
                  {imagePreview && <img src={imagePreview} alt="preview" width="500" />}
                </div>
              </div>
              <div>
                <button
                  onClick={handleFormSubmit}
                  type="submit"
                  className="inline-flex w-[500px] items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Add Product into Inventory <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
      </div>
    </div>
    </>
  );
}
