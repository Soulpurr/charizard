import { buffer } from "micro";
const Stripe = require("stripe");

const stripe = new Stripe(
  "sk_test_51K6w9HSCCzF8ZYwfpZWcbuUsyPeyjtkVcfm1SRQ9ExoHJQlZ2k58Glb6cL6k4YGfdwuIv2A8QcF5v2UJovmiWWn700V5A4Exuq",
  {
    apiVersion: "2020-08-27",
  }
);
const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let stripeEvent;

    try {
      stripeEvent = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      console.log("stripeEvent", stripeEvent);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if ("checkout.session.completed" === stripeEvent.type) {
      const session = stripeEvent.data.object;
      console.log("payment success", session);
      // Do something here on payment success, like update order etc.        }

      res.json({ received: true });
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  }
}
