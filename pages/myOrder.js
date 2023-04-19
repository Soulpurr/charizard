import React from "react";
import Orders from "../models/orders";
import { getCookie } from "cookies-next";
function myOrder({ order }) {
  let u = JSON.stringify(getCookie("user"));
 
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-rows-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {order.map((item) => (
          <div
            key={item._id}
            className="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md"
          >
            <div>
              <div className="absolute top-0 right-0 mt-2 mr-2 p-4 z-20 flex justify-between">
                <div className="inline-flex items-center justify-center w-8 h-8 p-2 rounded-full bg-white shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 h-auto fill-current text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative block h-full">
                <div className="h-32 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <h2 className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
                OrderId
              </h2>
              <h2>{item.orderId}</h2>
            </div>
            <div className="flex flex-row justify-between">
              <h2 className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
                Amount
              </h2>
              <h2>{item.amount}</h2>
            </div>
            <div className="flex flex-row justify-between">
              <h2 className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
                Payment
              </h2>
              <h2>{item.status}</h2>
            </div>

            <button className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md w-full">
              Order
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // let data = await fetch("http://localhost:3000/myOrder", {
  //   headers: {
  //     auth: JSON.parse(getCookie("user").token),
  //   },
  // });
  // let res = await data.json();
  // console.log(res);
  let order = await Orders.find({});
  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  };
}
export default myOrder;
