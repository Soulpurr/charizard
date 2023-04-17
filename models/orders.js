import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: Object, default: "Pending" },
    product: { type: Object, required: true },

    date: { type: Date, default: Date.now },
    hidden: Boolean,
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending", required: true },
    user: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("Order", orderSchema);
