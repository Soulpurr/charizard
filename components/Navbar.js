import React from "react";
import { useState } from "react";
import { BsFillCartFill } from "react-icons/bs";
import { IoBagCheckOutline } from "react-icons/io5";
import {
  AiOutlineLogin,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useContext } from "react";
import cartContext from "../context/cartContext";

function Navbar() {
  const context = useContext(cartContext);
  const { addToCart, clearCart, removeFromCart, cart, total, saveCart } =
    context;
  const [navbar, setnavbar] = useState(false);
  const [off, setoff] = useState(false);
  const handleMenu = () => {
    setnavbar(true);
  };
  const close = () => {
    setnavbar(false);
  };

  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  return (
    <div className="flex flex-row justify-between  items-center shadow-xl">
      <div className={`${navbar ? "hidden" : "flex"} p-4 sm:hidden order-1`}>
        <img src="/ham.png" alt="" width={23} heigh={23} onClick={handleMenu} />
      </div>
      <div
        className={`${
          navbar ? "hidden" : ""
        } invert logo order-1 sm:order-3 cursor-pointer`}
      >
        <Image src={"/logo2.jpg"} width={200} height={70} />
      </div>
      <div
        className={` ${
          navbar ? "hidden" : ""
        } cart order-3 sm:order-3 m-2 flex flex-row space-x-4 `}
      >
        <BsFillCartFill
          className="h-5 w-5 sm:h-10 sm:w-10 cursor-pointer "
          onClick={toggleCart}
        />
        <Link href={'/login'}><AiOutlineLogin className="h-5 w-5 sm:h-10 sm:w-10 cursor-pointer " /></Link>
        <div
          className="h-full sidebar overflow-y-scroll z-30 w-[62vw] sm:w-auto absolute top-0 right-0  bg-green-100 p-10 transform transition-transform translate-x-full"
          ref={ref}
        >
          <h1 className="font-bold text-xl ">Shooping Cart</h1>
          <span className="absolute top-2 right-0" onClick={toggleCart}>
            <AiOutlineClose />
          </span>
          <ol className="list-decimal font-semibold text-xl">
            {Object.keys(cart).length===0 && <div className="my-4">No items in cart</div>}
            {Object.keys(cart).map((k) => {
              return (
                <li className="" key={k}>
                  <div className="flex my-3">
                    <div className="w-2/3">{cart[k].name} ({cart[k].variant}/{cart[k].size})</div>
                    <div className="w-1/3 flex justify-center items-center text-xl ">
                      <AiOutlineMinus className="mx-1" onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} /> {cart[k].qty}
                      <AiOutlinePlus className="mx-1"  onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <Link href={'/checkout'}>
          <button className="relative inline-flex items-center justify-center w-auto p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 w-[140px] flex justify-center items-center  bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <IoBagCheckOutline />
              checkout
            </span>
          </button>
          </Link>
          <button
            onClick={clearCart}
            className="relative inline-flex items-center justify-center w-auto p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 w-[140px] flex justify-center items-center  bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <IoBagCheckOutline />
              Clear
            </span>
          </button>
        </div>
      </div>
      <div className={`bg-black ${navbar ? "" : "hidden"} sm:block`}>
        <img
          src="/x.png"
          alt=""
          width={23}
          heigh={23}
          className="top-5 right-0 sm:hidden"
          onClick={close}
        ></img>
        {/* <h1 className="text-black top-0 left-0" onClick={close}>Close</h1> */}
        <div
          className={`flex flex-row justify-center space-x-20 absolute z-10  backdrop-blur w-[100%] h-[100%]  sm:order-2 items-center sm:sticky sm:top-0 sm:h-auto sm:bg-white sm:justify-between `}
        >
          {/* <div className="hidden sm:block sm:text-2xl">Heading</div> */}
          <div className="navbar">
            <ul className="ul flex flex-col space-y-8 sm:flex-row sm:space-y-0 sm:space-x-6">
              <li className="font-bold text-black cursor-pointer hover:text-green-400 hover:animate-ping sm:text-black sm:text-2xl">
                <Link href={"/"}>Home</Link>
              </li>
              <li className="font-bold text-black sm:hover:text-green-400 sm:hover:animate-ping sm:text-black sm:text-2xl cursor-pointer sm:font-semibold">
                <Link href={"/shirts"}>
                  <a>Shirts</a>
                </Link>
              </li>
              <li className="font-bold text-black sm:hover:text-green-400 sm:hover:animate-ping sm:text-black sm:text-2xl cursor-pointer sm:font-semibold">
                <Link href={"/laptops"}>
                  <a>Laptops</a>
                </Link>
              </li>
              <li className="font-bold text-black sm:hover:text-green-400 sm:hover:animate-ping sm:text-black sm:text-2xl cursor-pointer sm:font-semibold">
                <Link href={"/hoodies"}>
                  <a>Hoodies</a>
                </Link>
              </li>
              <li className="font-bold text-black sm:hover:text-green-400 sm:hover:animate-ping sm:text-black sm:text-2xl cursor-pointer sm:font-semibold">
                <Link href={"/smartphones"}>
                  <a> Smartphones</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="optional sm:hidden pr-10">
            <div className="box1">
              <ul className="flex flex-col">
                <li className="text-lg font-semibold text-yellow-400">
                  Account
                </li>
                <li className=" text-black">LogIn</li>
                <li className=" text-black">SignUp</li>
                <li className=" text-black">Your Orders</li>
              </ul>
            </div>
            <div className="box2 pt-8">
              <ul className="flex flex-col">
                <li className="text-lg font-semibold text-yellow-400">Sales</li>
                <li className="font-bold text-black">YOUTUBE</li>
                <li className="font-bold text-black">GOOGLE</li>
                <li className="font-bold text-black">WHATSAPP</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
