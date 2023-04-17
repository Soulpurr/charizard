import ConnectToMongo from "../../middleware/mongoose";
import Order from "../../models/orders";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
const handler = async (req, res) => {
  let email = req.body.email;
  let myOrder = await Order.find({ email: email });
  res.send({ myOrder });
  // console.log(token)

  // let data = jwt.verify(token, process.env.SECRET);
  // console.log(data)
  // let orders = await Order.find({ email: data.user });
};

export default ConnectToMongo(handler);
