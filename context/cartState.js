import React from "react";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { useEffect } from "react";
import cartContext from "./cartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
function CartState(props) {
  const [cart, setcart] = useState({});
  const [total, settotal] = useState(0);
  const [user, setuser] = useState({ value: null });
  const [key, setkey] = useState(0);

  const router = useRouter();
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    //    itemcode is like a key like 1 has 1st cart item in which contains name price ..... of a particular item
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }

    setcart(newCart);
    saveCart(newCart);
    toast.info("🦄Added to cart successfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  const saveCart = (cart) => {
    setCookie("cart", JSON.stringify(cart));
    localStorage.setItem("cart", JSON.stringify(cart));

    let subt = 0;
    let keys = Object.keys(cart);

    for (let i = 0; i < keys.length; i++) {
      subt += cart[keys[i]].price * cart[keys[i]].qty;
    }
    settotal(subt);
  };
  const clearCart = () => {
    // setstate doesnt immediately updates the sate
    setcart({});
    deleteCookie("cart", { req, res });
    saveCart({});
    toast.info("Cart cleared successfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    //    itemcide is like a key like 1 has 1st cart item in which contains name price ..... of a particular item
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
      // newCart[itemCode].price = cart[itemCode].price - price;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }

    setcart(newCart);
    saveCart(newCart);
    toast.info("Removed successfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  // userState
  const existUser = () => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        let data = await fetch("http://localhost:3000/api/myOrders", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: localStorage.getItem("token") }),
        });
      }
    };

    useEffect(() => {
      if (localStorage.getItem("token")) {
        setuser({ value: localStorage.getItem("token") });
        setkey(Math.random());
        fetchData();
      }
    }, [router.query]);
  };
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
    setkey(Math.random());
    setuser({ value: null });
  };
  const redirect = () => {
    useEffect(() => {
      if (localStorage.getItem("token")) {
        router.push("/");
      }
    }, [router.query]);
  };
  const redirect2 = () => {
    useEffect(() => {
      if (!localStorage.getItem("token")) {
        router.push("/");
      }
    }, [router.query]);
  };
  return (
    <cartContext.Provider
      value={{
        addToCart,
        saveCart,
        removeFromCart,

        cart,
        total,
        setcart,
        settotal,
        clearCart,
        existUser,
        user,
        key,
        logout,
        redirect,
        redirect2,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}

export default CartState;
