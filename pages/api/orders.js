var jwt = require("jsonwebtoken");
import ConnectToMongo from "../../middleware/mongoose";
import orders from "../../models/orders";

var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    const data = req.headers["auth"];
    if (data) {
      var decrypted = await jwt.verify(data, "POKEMONAWESOME");
      req.data = decrypted;

      const { email, orderId, paymentInfo, product, address, amount } =
        JSON.parse(req.body);

      console.log(JSON.parse(req.body));

      let order = new orders({
        email,
        orderId: orderId,
        paymentInfo,
        product,
        address,
        amount,
        user: req.data.user._id,
      });
      await order.save();
    }

    res.send({ message: "Order created" });
  } else {
    res.send({ message: "Enter a valid token" });
  }
};

export default ConnectToMongo(handler);
