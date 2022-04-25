import ConnectToMongo from "../../middleware/mongoose";
import User from "../../models/users";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
        let success;
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        if (req.body.password == user.password) {
            success=true;
          return res.status(200).send({success:success, user:user});
        }
        success=false;
        return res.status(200).send({success:success, error:'Invalid credentials'});
      } 
          
      
    } catch (error) {
        
        return res.status(200).send(error);
  }

  
}};

export default ConnectToMongo(handler);
