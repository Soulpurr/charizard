import React from "react";
import { useContext } from "react";
import cartContext from "../context/cartContext";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";

function Checkout() {
  const context = useContext(cartContext);
  const { addToCart, removeFromCart, cart, total, saveCart } = context;

  console.log(cart);
  const [cdetails, setcdetails] = useState({
    fname: "",
    lname: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [disabled, setdisabled] = useState(true);
  const handleChange = (e) => {
    setcdetails({ ...cdetails, [e.target.name]: e.target.value });
    cdetails.fname.length > 3 &&
    cdetails.lname.length > 3 &&
    cdetails.email.length > 3 &&
    cdetails.address.length > 3 &&
    cdetails.city.length > 3 &&
    cdetails.pincode.length > 3
      ? setdisabled(false)
      : setdisabled(true);
    console.log(cdetails);
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const makePayment = async (e) => {
    e.preventDefault();
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    // let data = await fetch("/api/razorpay", { method: "POST" });
    let details = parseInt(total);

    let data = await fetch("/api/razorpay", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oid,
        details,
        name: cdetails.fname,
        address: cdetails.address,
        email: cdetails.email,
        cart: cart,
      }),
    });

    let response = await data.json();
    const { id } = response;
    let oid = id;

    var options = {
      key: process.env.KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: total, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: cdetails.fname + cdetails.lname,
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: cdetails.fname + cdetails.lname,
        email: cdetails.email,
        contact: "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <div className="mt-20">
        <h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
          CHECKOUT
        </h1>
      </div>
      <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h2 className="mb-4 font-bold md:text-xl text-heading ">
              Shipping Address
            </h2>
            <form
              className="justify-center w-full mx-auto"
              method="post"
              action
            >
              <div className="">
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      htmlFor="firstName"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      First Name
                    </label>
                    <input
                      value={cdetails.fname}
                      onChange={handleChange}
                      name="fname"
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      htmlFor="firstName"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Last Name
                    </label>
                    <input
                      value={cdetails.lname}
                      onChange={handleChange}
                      name="lname"
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="Email"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Email
                    </label>
                    <input
                      value={cdetails.email}
                      onChange={handleChange}
                      name="email"
                      type="text"
                      placeholder="Email"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="Address"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Address
                    </label>
                    <textarea
                      value={cdetails.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      name="address"
                      cols="20"
                      rows="4"
                      placeholder="Address"
                    ></textarea>
                  </div>
                </div>
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      htmlFor="city"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      City
                    </label>
                    <input
                      value={cdetails.city}
                      onChange={handleChange}
                      name="city"
                      type="text"
                      placeholder="City"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      htmlFor="postcode"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Pincode
                    </label>
                    <input
                      value={cdetails.pincode}
                      onChange={handleChange}
                      name="pincode"
                      type="text"
                      placeholder="Post Code"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <label className="flex items-center text-sm group text-heading">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                    />
                    <span className="ml-2">
                      Save this information for next time
                    </span>
                  </label>
                </div>
                <div className="relative pt-3 xl:pt-6">
                  <label
                    htmlFor="note"
                    className="block mb-3 text-sm font-semibold text-gray-500"
                  >
                    {" "}
                    Notes (Optional)
                  </label>
                  <textarea
                    name="note"
                    className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                    rows="4"
                    placeholder="Notes for delivery"
                  ></textarea>
                </div>
                <div className="mt-4">
                  <button
                    disabled={disabled}
                    className="disabled:bg-blue-300 w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
                    onClick={makePayment}
                  >
                    PAY {total}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="mt-8">
                <div className="">
                  <ol className="list-decimal font-semibold text-xl">
                    {Object.keys(cart).length === 0 && (
                      <div className="font-semibold text-2xl my-4">
                        No items in cart
                      </div>
                    )}
                    {Object.keys(cart).map((k) => {
                      return (
                        <li className="" key={k}>
                          <div className="flex my-3">
                            <div className="w-2/3">{cart[k].name}</div>
                            <div className="w-1/3 flex justify-center items-center text-xl ">
                              <AiOutlineMinus
                                className="mx-1"
                                onClick={() => {
                                  removeFromCart(
                                    k,
                                    1,
                                    cart[k].price,
                                    cart[k].name,
                                    cart[k].size,
                                    cart[k].variant
                                  );
                                }}
                              />{" "}
                              {cart[k].qty}
                              <AiOutlinePlus
                                className="mx-1"
                                onClick={() => {
                                  addToCart(
                                    k,
                                    1,
                                    cart[k].price,
                                    cart[k].name,
                                    cart[k].size,
                                    cart[k].variant
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
              <div className="flex p-4 mt-4">
                <h2 className="text-xl font-bold">ITEMS 2</h2>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Subtotal<span className="ml-2">{total}</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Shipping Tax<span className="ml-2">10</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Total<span className="ml-2">{total + 10}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
