import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        reservedDays: { type: Array, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        car: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Car",
        },
      },
    ],

    paymentOnAccountMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    paymentOnAccount: {
      type: Number,
      required: true,
      default: 0.0,
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
