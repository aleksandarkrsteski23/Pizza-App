import mongoose from "mongoose";

// Define the pizza schema
const pizzaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    sizes: {
      regular: {
        type: Number,
        required: true,
      },
      xl: {
        type: Number,
        required: true,
      },
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;
