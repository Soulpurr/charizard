import ConnectToMongo from "../../middleware/mongoose";
import Product from "../../models/product";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let products = new Product({
        title: req.body[i].title,
        slug: req.body[i].slug,
        desc: req.body[i].desc,
        img: req.body[i].img,
        category: req.body[i].category,
        size: req.body[i].size,
        color: req.body[i].color,
        price: req.body[i].price,
        availableQty: req.body[i].availableQty,
      });
      await products.save();
    }

    
    return res.status(200).send(req.body)
  }
  return res.status(400).send('Not allowwd')
};

export default ConnectToMongo(handler);
