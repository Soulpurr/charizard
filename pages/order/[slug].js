import React from "react";
import Orders from "../../models/orders";
function slug({ order }) {
  
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CHARIZARD
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                YOUR ORDER ID IS {order.orderId}
              </h1>
              <div className="flex mb-4">
                <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                  DESCRIPTION
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                  QUANTITY
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                  TOTAL
                </a>
              </div>
              {order.status==='Paid'?<p className="leading-relaxed mb-4 text-green-500 font-semibold">
                YOUR ORDER HAS BEEN SUCCESSFULY PLACED
              </p>:<p className="leading-relaxed mb-4 text-red-500 font-semibold">
                YOUR ORDER HAS NOT BEEN PLACED
              </p>}

              {Object.keys(order.product).map((details) => (
                <div
                  className="flex border-t border-gray-200 py-2"
                  key={Math.random() * Date.now()}
                >
                  <span className="text-gray-500">
                    {order.product[details].name}
                  </span>
                  <span className="ml-auto text-gray-900">
                    {order.product[details].qty}
                  </span>
                  <span className="ml-auto text-gray-900">
                    ₹{order.product[details].price}
                  </span>
                </div>
              ))}

              
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{order.amount}
                </span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Track Order
                </button>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  let order = await Orders.findOne({ orderId: context.query.slug });

  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  };
}

export default slug;
