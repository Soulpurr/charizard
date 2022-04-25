import ConnectToMongo from "../../middleware/mongoose";
import User from "../../models/users";
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
  if (req.method == "POST") {
    const secPass=CryptoJS.AES.encrypt(req.body.password,'process.env.SECRET').toString()
    let user=new User({
        fName:req.body.fName,
        lName:req.body.lName,
        email:req.body.email,
        password:secPass,
       
    })
      await user.save();
      return res.status(200).send(req.body)
    }

    
   
  
  return res.status(400).send('Not allowwd')
};

export default ConnectToMongo(handler);
