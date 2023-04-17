import React from "react";
import Orders from "../models/orders";
function myOrder({ order }) {
  console.log(order);
  return (
    <div className="p-3">
      <div className="heading mt-5 font-semibold text-3xl p-4">My Orders</div>
      <div className="status flex flex-row justify-between p-6">
        <button className="bg-green-500 p-2 pl-4 pr-4 text-xl rounded-3xl sm:hover:bg-green-300">
          Completed
        </button>
        <button className="bg-green-500 p-2 pl-4 pr-4 text-xl rounded-3xl sm:hover:bg-green-300">
          Pending
        </button>
      </div>
      {order.map((item)=>(<div className="border-2 border-solid w-auto border-gray-400 p-3 mt-4 rounded-xl overflow-auto" key={item._id}>
        <div className="content ">
          {Object.keys(item.product).map((detail)=>(<div className="top flex flex-row justify-between" key={Math.random()*Date.now()}>
            <p className="font-bold text-xl">{item.product[detail].name}</p>
            <p className="font-mono">Id:{item.orderId.slice(0,8)}...</p>
          </div>))}
        </div>
        <div className="flex justify-center  mt-5 space-x-40  ">
          <div className="payment flex flex-col">
            <p className="font-light text-md">Payment</p>
            <p className="font-semibold text-lg">Cash</p>
          </div>

          <div className="payment flex flex-col">
            <p className="font-light text-md">Delivery By</p>
            <p className="font-semibold text-lg">12/11/22</p>
          </div>
        </div>
      </div>))}
    </div>
  );
}

export async function getServerSideProps() {
  // let data=await fetch('http://localhost:3000/myOrder');
  // let res=await data.json()
  // console.log(res)
  let order = await Orders.find();
  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  };
}
export default myOrder;
