import React, { useContext, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import cartContext from "../../context/cartContext";
import CartItemDisplay from "./cartItemDisplay";
import { loadStripe } from "@stripe/stripe-js";
import { getCookie } from "cookies-next";

const stripePromise = loadStripe(
  "pk_test_51K6w9HSCCzF8ZYwfSRDDD4DVbzHcAztUecen2zi9N7O4LakCHxHC05rZ6jIgc08QTij6LfzX0Q7RHP57GOjLIPTn00QeaGZ3Ib"
);
function CheckoutForm() {
  const context = useContext(cartContext);
  const { cart, total } = context;

  // console.log(cart);
  const [cdetails, setcdetails] = useState({
    fname: "",
    lname: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    product: {},
    amount: 0,
    orderId: "1212",
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
    // console.log(cdetails);
  };
  console.log(process.env.STRIPE_SECRET_KEY);
  const handlePayment = async (e) => {
    e.preventDefault();
    // console.log(getCookie("user"));
    //Createing order
    setcdetails({ ...cdetails, product: cart, amount: total });
    let order = await fetch("/api/orders", {
      method: "POST",
      headers: {
        auth: JSON.parse(getCookie("user")).token,
      },
      body: JSON.stringify(cdetails),
    });

    let qty = 0;
    Object.keys(cart).map((item) => {
      qty = qty + cart[item].qty;
    });
    let data = {
      total: total,
      qty: qty,
    };
    try {
      e.preventDefault();
      const stripe = await stripePromise;
      let res = await fetch("/api/stripe", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const stripePay = await res.json();
      // console.log(stripePay);
      const result = await stripe.redirectToCheckout({
        sessionId: stripePay.session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
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
              <form className="justify-center w-full mx-auto">
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
                      onClick={handlePayment}
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
                    <CartItemDisplay />
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
    </div>
  );
}

export default CheckoutForm;
