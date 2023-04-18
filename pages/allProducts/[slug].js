import React from "react";
import ConnectToMongo from "../../middleware/mongoose";

import Product from "../../models/product";
import { useContext } from "react";
import cartContext from "../../context/cartContext";
import Link from "next/link";
import { useRouter } from "next/router";
import connectMongo from "../../middleware/connectTomongo";
function AllProducts(props) {
  const context = useContext(cartContext);
  const { addToCart } = context;

  const { products } = props;
  // console.log(products);
  const router = useRouter();
  return (
    <div>
      <div
        className={`${Object.keys(products).length === 0 ? "block" : "hidden"}`}
      >
        Sorry currently not available
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(products).map((item) => {
              return (
                <Link
                  passHref={true}
                  href={`/products/${products[item].slug}`}
                  key={products[item]._id}
                >
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
                        {products[item].size.map((size) => (
                          <span
                            key={size}
                            className="border border-gray-300 m-1 "
                          >
                            {size}
                          </span>
                        ))}
                      </h3>
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {products[item].color?.map((col) => (
                          <button
                            key={col}
                            className={`border-2 border-gray-300 ml-1 bg-${col?.toLowerCase()}-400 rounded-full w-6 h-6 focus:outline-none`}
                          ></button>
                        ))}
                      </h3>
                      <p className="mt-1">₹{products[item].price}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
export default AllProducts;

export async function getServerSideProps(context) {
  await connectMongo;
  let products = await Product.find({ category: context.query.slug });
  let data = {};
  for (let item of products) {
    if (item.title in data) {
      if (
        !data[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        data[item.title].color.push(item.color);
        data[item.title].availableQty + item.availableQty;
      }
      if (!data[item.title].size.includes(item.size) && item.availableQty > 0) {
        data[item.title].size.push(item.size);
        data[item.title].availableQty + item.availableQty;
      }
      if (
        (data[item.title].size.includes(item.size) && item.availableQty > 0) ||
        (data[item.title].size.includes(item.color) && item.availableQty > 0)
      ) {
        data[item.title].availableQty += item.availableQty;
      }
    } else {
      data[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        data[item.title].color = [item.color];
        data[item.title].size = [item.size];
      }
    }
  }
  // let product = await fetch("http://localhost:3000/api/getProducts/shirts");
  // let data = await product.json();
  return {
    props: { products: JSON.parse(JSON.stringify(data)) }, // will be passed to the page component as props
  };
}
