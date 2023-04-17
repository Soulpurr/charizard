import React, { useContext } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import cartContext from "../../context/cartContext";

function CartItemDisplay() {
  const context = useContext(cartContext);
  const { addToCart, removeFromCart, cart } = context;

  return (
    <ol className="list-decimal font-semibold text-xl">
      {Object.keys(cart).length === 0 && (
        <div className="font-semibold text-2xl my-4">No items in cart</div>
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
  );
}

export default CartItemDisplay;
