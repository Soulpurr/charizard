var jwt = require("jsonwebtoken");
import ConnectToMongo from "../../middleware/mongoose";
import orders from "../../models/orders";

var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
  if (req.method == "GET") {
    console.log(req.body);
    const data = req.headers["auth"];
    if (data) {
      var decrypted = await jwt.verify(data, "POKEMONAWESOME");
      req.data = decrypted;
      let order = await orders.find({ user: req.data.user._id });
      res.send(order);
    } else {
      res.send({ message: "Enter a valid token" });
    }
  }
};

export default ConnectToMongo(handler);
