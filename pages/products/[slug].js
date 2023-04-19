import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import cartContext from "../../context/cartContext";
import Product from "../../models/product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import connectMongo from "../../middleware/connectTomongo";

function Slug(props) {
  const refreshVariant = (newcolor, newsize) => {
    let url = `http://localhost:3000/products/${variant[newcolor][newsize].slug}`;
    window.location = url;
  };
  const { product, variant } = props;
  // console.log(product);
  // console.log(variant);
  const context = useContext(cartContext);
  const { addToCart } = context;
  // console.log(addToCart,clearCart,removeFromCart,cart,total,saveCart)

  const [color, setcolor] = useState(product.color);
  const [size, setsize] = useState(product.size);
  const [pin, setpin] = useState();
  const [service, setservice] = useState();
  const router = useRouter();
  const { slug } = router.query;

  const pincode = async (e) => {
    setpin(e.target.value);
  };

  const checkAvailablity = async () => {
    const pincode = await fetch("http://localhost:3000/api/pincodes");
    const pinJson = await pincode.json();
    // pin is comming as string and we have array of integers so we convert string into array
    if (pinJson.includes(parseInt(pin))) {
      setservice(true);
      toast.success("Our service is available", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      setservice(false);
      toast.error("Sorry we are not available in your area", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-12 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} ({product.color}/{product.size})
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variant).includes("white") &&
                    Object.keys(variant["white"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant("white", size);
                        }}
                        className={`border-2 ${
                          color === "white" ? "border-black" : "border-gray-300"
                        } rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variant).includes("black") &&
                    Object.keys(variant["black"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant("black", size);
                        }}
                        className={`border-2 ${
                          color === "black" ? "border-black" : "border-gray-300"
                        } ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variant).includes("green") &&
                    Object.keys(variant["green"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant("green", size);
                        }}
                        className={`border-2 ${
                          color === "green" ? "border-black" : "border-gray-300"
                        } ml-1 bg-green-400 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variant).includes("blue") &&
                    Object.keys(variant["blue"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant("blue", size);
                        }}
                        className={`border-2 ${
                          color === "blue" ? "border-black" : "border-gray-300"
                        } ml-1 bg-blue-400 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variant).includes("pink") &&
                    Object.keys(variant["pink"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant("pink", size);
                        }}
                        className={`border-2 ${
                          color === "pink" ? "border-black" : "border-gray-300"
                        } ml-1 bg-pink-400 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variant).includes("yellow") &&
                    Object.keys(variant["yellow"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant("yellow", size);
                        }}
                        className={`border-2 ${
                          color === "yellow"
                            ? "border-black"
                            : "border-gray-300"
                        } ml-1 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variant).includes("red") &&
                    Object.keys(variant["red"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant("red", size);
                        }}
                        className={`border-2 ${
                          color === "red" ? "border-black" : "border-gray-300"
                        } ml-1 bg-red-400 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      onChange={(e) => refreshVariant(color, e.target.value)}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-green-400 text-base pl-3 pr-10"
                    >
                      {Object.keys(variant[color]).includes("S") && (
                        <option value={"S"}>S</option>
                      )}
                      {Object.keys(variant[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                      {Object.keys(variant[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                      {Object.keys(variant[color]).includes("XL") && (
                        <option value={"XL"}>XL</option>
                      )}
                      {Object.keys(variant[color]).includes("XXL") && (
                        <option value={"XXL"}>XXL</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price}
                </span>
                <button className="flex ml-auto text-white bg-green-400 border-0 p-2 py-2 sm:px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color
                    );
                  }}
                  className="flex ml-auto text-white bg-green-400 border-0 p-2 py-2 sm:px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add To Cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0  border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="pincode flex justify-center items-center mt-6">
                <input
                  onChange={pincode}
                  type="text"
                  className="border-solid border-2 border-gray-600 p-2 rounded-lg"
                  placeholder="PINCODE"
                />
                <button
                  onClick={checkAvailablity}
                  className="flex ml-auto text-white bg-green-400 border-0 p-1 py-2 sm:px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Check Availablity
                </button>
                <ToastContainer
                  position="top-right"
                  autoClose={1000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </div>
              {!service && service != null && (
                <div className="text-red-600">
                  SORRY! OUR SERVICE WILL BE AVAILBE SOON
                </div>
              )}
              {service && service != null && (
                <div className="text-green-600">SERVICE IS AVAILABLE</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps(context) {
  connectMongo();
  let products = await Product.findOne({ slug: context.query.slug });

  let variants = await Product.find({
    title: products.title,
    category: products.category,
  });
  let colorSizeSlug = {}; //{red:{xl:{slug:'wear th dj'}}}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }
  // console.log(variants, products);
  return {
    props: {
      product: JSON.parse(JSON.stringify(products)),
      variant: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}
export default Slug;
