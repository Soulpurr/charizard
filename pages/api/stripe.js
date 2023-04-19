import ConnectToMongo from "../../middleware/mongoose";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { cart } = req.body;

      console.log(req.body);
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              unit_amount: req.body.total * 100,
              currency: "inr",
              product_data: {
                name: "Charizard Pay",
              },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancele`,
      });
      // const setupIntent = await stripe.setupIntents.create({
      //   usage: "on_session",
      // });
      res.send({ session });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
