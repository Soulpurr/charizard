const Razorpay = require("razorpay");
const shortid = require("shortid");
import Orders from "../../models/orders";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    //  Create an order -> generate the OrderID -> Send it to the Front-end
    const payment_capture = 1;
    const amount = req.body.details;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      let response = await razorpay.orders.create(options);
     

      let order = new Orders({
        email: req.body.email,
        orderId: response.id,

        product:req.body.cart,

        address: req.body.address,
        amount: req.body.details,
        status: "pending",
      });
      let saved = await order.save();
      console.log(response);
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}
