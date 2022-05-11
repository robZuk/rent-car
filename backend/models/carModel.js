import mongoose from "mongoose";

const carSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    images: [{ type: String }],

    fuel: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numOfPeople: {
      type: String,
      required: true,
    },
    engine: { type: String, required: true },
    acceleration: {
      type: String,
      required: true,
    },
    gearbox: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    reservedDays: [{ type: Date }],
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
