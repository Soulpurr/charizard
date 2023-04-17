import ConnectToMongo from "../../middleware/mongoose";
import User from "../../models/users";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let success;
      let user = await User.findOne({ email: req.body.email });
      console.log(req.body.email);
      if (user) {
        var pass = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
        let secPass = pass.toString(CryptoJS.enc.Utf8);
        if (secPass == req.body.password) {
          success = true;
          let token = await jwt.sign({ user: user }, process.env.SECRET, {
            expiresIn: "2d",
          });

          return res.status(200).send({ token, success });
        }
        success = false;
        return res
          .status(200)
          .send({ success: success, error: "Invalid credentials" });
      }
      return res.send({ message: "User doesnt exist", success: false });
    } catch (error) {
      return res.status(200).send("error");
    }
  }
};

export default ConnectToMongo(handler);
