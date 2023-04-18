import React from "react";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import cartContext from "../context/cartContext";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

function Signup() {
  const [data, setdata] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("http://localhost:3000/api/signUp", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await res.json();
      // console.log(response);
      setCookie("user", response, { maxAge: 30 * 24 * 60 * 60 * 1000 });
      router.push("/");
      toast.success("Your Account has been successfullly created", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  };
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <div className="font-sans antialiased bg-green-200">
        <div className="w-full bg-grey-lightest pt-[4rem] bg-green-50">
          <div className="container mx-auto py-8">
            <form
              onSubmit={handleSubmit}
              className="w-5/6 lg:w-1/2 mx-auto bg-green-200 rounded shadow"
            >
              <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
                Register for a free account
              </div>
              <div className="py-4 px-8">
                <div className="flex mb-4">
                  <div className="w-1/2 mr-1">
                    <label
                      className="block text-grey-darker text-sm font-bold mb-2"
                      htmlFor="first_name"
                    >
                      First Name
                    </label>
                    <input
                      onChange={handleChange}
                      name="fName"
                      value={data.fName}
                      className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                      id="first_name"
                      type="text"
                      placeholder="Your first name"
                    />
                  </div>
                  <div className="w-1/2 ml-1">
                    <label
                      className="block text-grey-darker text-sm font-bold mb-2"
                      htmlFor="last_name"
                    >
                      Last Name
                    </label>
                    <input
                      onChange={handleChange}
                      name="lName"
                      value={data.lName}
                      className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                      id="last_name"
                      type="text"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    onChange={handleChange}
                    name="email"
                    value={data.email}
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="email"
                    type="email"
                    placeholder="Your email address"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    name="password"
                    value={data.password}
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="password"
                    type="password"
                    placeholder="Your secure password"
                  />
                  <p className="text-grey text-xs mt-1">
                    At least 6 characters
                  </p>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Sign Up
                    </span>
                  </button>
                </div>
              </div>
            </form>
            <p className="text-center my-4">
              <Link href={"/login"}>
                <a
                  href="#"
                  className="text-grey-dark text-sm no-underline hover:text-grey-darker"
                >
                  I already have an account
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
