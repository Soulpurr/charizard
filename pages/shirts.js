import React from "react";
import ConnectToMongo from "../middleware/mongoose";

import Product from "../models/product";

import Link from "next/link";
function Shirts(props) {
  const {products}=props;
  
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(products).map((item)=>{
              
            return(
            <Link passHref={true} href={`/products/${products[item].slug}`} key={products[item]._id}>
              
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md cursor-pointer space-x-2 space-y-4">
                <a className="block relative  rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="h-[36vh] block m-auto"
                    src={products[item].img}
                  />
                </a>
                <div className="mt-4 text-center">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                   {products[item].category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {products[item].title}
                  </h2>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                   {products[item].size.includes('XS')&&<span className="border border-gray-300 m-1 ">XS</span>}
                   {products[item].size.includes('S')&&<span className="border border-gray-300 m-1 ">S</span>}
                   {products[item].size.includes('L')&&<span className="border border-gray-300 m-1 ">L</span>}
                   {products[item].size.includes('XL')&&<span className="border border-gray-300 m-1 ">XL</span>}
                   {products[item].size.includes('XXL')&&<span className="border border-gray-300 m-1 ">XXL</span>}
                  </h3>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                   {products[item].color.includes('green')&&<button className="border-2 border-gray-300 ml-1 bg-green-400 rounded-full w-6 h-6 focus:outline-none"></button>}
                   {products[item].color.includes('red')&&<button className="border-2 border-gray-300 ml-1 bg-red-400 rounded-full w-6 h-6 focus:outline-none"></button>}
                   {products[item].color.includes('black')&&<button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                   {products[item].color.includes('pink')&&<button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                   
                  </h3>
                  <p className="mt-1">₹{products[item].price}</p>
                </div>
              </div>
            </Link>)})}
            
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
   let products=await Product.find({category:'SHIRTS'})
 let tshirts={};
 for (let item of products) {
     if (item.title in tshirts) {
         if (!tshirts[item.title].color.includes(item.color) &&item.availableQty>0) {
            tshirts[item.title].color.push(item.color)
               
         }
          if (!tshirts[item.title].size.includes(item.size)&&item.availableQty>0) {
             tshirts[item.title].size.push(item.size)
         }
     }
     else{
          tshirts[item.title]=JSON.parse(JSON.stringify(item));
         if (item.availableQty>0)
            tshirts[item.title].color=[item.color];
            tshirts[item.title].size=[item.size];
         
        }
        
     }
     return {
      props: {products:JSON.parse(JSON.stringify(tshirts))}, // will be passed to the page component as props
    }
  }
  


//  api alternative dont know why its not working but will debug it
//  let product=await fetch('http://localhost:3000/api/getProducts')
  
//  let data=await product.json();
 
//   return {
//      props: {products:JSON.parse(JSON.stringify(data))}, // will be passed to the page component as props
//   }
// }

export default Shirts;
