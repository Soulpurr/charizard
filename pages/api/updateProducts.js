import ConnectToMongo from "../../middleware/mongoose";
import Product from "../../models/product";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let products =await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
      
    }

    
    return res.status(200).send(req.body)
  }
  return res.status(400).send('Not allowwd')
};

export default ConnectToMongo(handler);
