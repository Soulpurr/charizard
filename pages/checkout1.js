import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";
import cartContext from "../context/cartContext";
import CheckoutForm from "../components/checkout/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51K6w9HSCCzF8ZYwfSRDDD4DVbzHcAztUecen2zi9N7O4LakCHxHC05rZ6jIgc08QTij6LfzX0Q7RHP57GOjLIPTn00QeaGZ3Ib"
);

function Checko() {
  const data = {
    price: 2000,
    name: "hello",
  };

  const handleClick = async (e) => {
    try {
      let amount = 100;
      e.preventDefault();
      const stripe = await stripePromise;
      let res = await fetch("/api/stripe", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const da = await res.json();
      console.log(da.session);
      const result = await stripe.redirectToCheckout({
        sessionId: da.session.id,
      });
      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CheckoutForm />
    </>
  );
}

export default Checko;
