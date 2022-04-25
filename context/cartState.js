import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import cartContext from "./cartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CartState(props) {
  const [cart, setcart] = useState({});
  const [total, settotal] = useState(0);
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    //    itemcide is like a key like 1 has 1st cart item in which contains name price ..... of a particular item
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
      
    }
    
    setcart(newCart);
    saveCart(newCart);
    toast.info('🦄Added to cart successfully', {
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
    localStorage.setItem("cart", JSON.stringify(cart));
    let subt = total;
    let keys = Object.keys(cart);
   
    for (let i = 0; i < keys.length; i++) {
      subt += cart[keys[i]].price * cart[keys[i]].qty;
    }
    settotal(subt);
  };
  const clearCart = () => {
    // setstate doesnt immediately updates the sate
    setcart({});
    saveCart({});
    toast.info('Cart cleared successfully', {
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
      console.log(price)
    let newCart = JSON.parse(JSON.stringify(cart));
    //    itemcide is like a key like 1 has 1st cart item in which contains name price ..... of a particular item
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    
    setcart(newCart);
    saveCart(newCart);
    toast.info('Removed successfully', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });
  };
  const existCart = () => {
    useEffect(() => {
      try {
        if (localStorage.getItem("cart")) {
          setcart(JSON.parse(localStorage.getItem("cart")));
        }
      } catch (error) {
        console.error(error);
        localStorage.clear();
      }
    }, []);
  };
  return (
    <cartContext.Provider
      value={{
        addToCart,
        saveCart,
        removeFromCart,
        existCart,
        cart,
        total,
        setcart,
        settotal,
        clearCart,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}

export default CartState;
