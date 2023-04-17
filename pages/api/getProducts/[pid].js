import { useRouter } from "next/router";
import ConnectToMongo from "../../../middleware/mongoose";
import Product from "../../../models/product";

const handler = async (req, res) => {
  console.log(req.query.pid);
  let products = await Product.find({ category: req.query.pid });

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
      if (
        !data[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        data[item.title].size.push(item.size);
        data[item.title].availableQty + item.availableQty;
      }
      if (
        (data[item.title].size.includes(item.size) &&
          item.availableQty > 0) ||
        (data[item.title].size.includes(item.color) && item.availableQty > 0)
      ) {
        data[item.title].availableQty+= item.availableQty;
      }
    } else {
      data[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        data[item.title].color = [item.color];
        data[item.title].size = [item.size];
      }
    }
  }

  res.status(200).json({ data, products });
};

export default ConnectToMongo(handler);
