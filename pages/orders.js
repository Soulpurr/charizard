import React from "react";

function Orders({order}) {
  
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
      <div className="border-2 border-solid border-gray-400 p-3 rounded-xl">
        <div className="content flex justify-center">
          <div className="top flex flex-row space-x-40">
            <p className="font-bold text-xl">Name</p>
            <p className="font-mono">Id:1234564566</p>
          </div>
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
      </div>
    </div>
  );
}

// export async function getServerSideProps(){
//   let order=await Orders.find()
//   return{
//     props:order
//   }
// }
export default Orders;
