const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator")

// schema desing
const stokeSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "please provide a name for this product."],
      trim: true,
      // unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 charcters."],
      maxLength: [100, "Name is too large"],
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs",
      },
    },
    imgURLs: [
      {
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide a valid url"]
      },
    ],
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Product price can't be negative"],
    },
    store: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please provide a Store name"],
        lowercase: true,
        enum: {
          values: [
            "dhaka",
            "chittagong",
            "rajshahi",
            "sylhet",
            "khulna",
            "barishal",
            "rangpur",
            "mymenshing",
          ],
          message: "{VALUE} is not a valid name",
        },
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Store",
      },
    },
    suppliedBy: {
      name: {
        type: String,
        required: true,
        ref: "Store",
      },
      id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Supplier"
      }
    },
    sellCount:{
      type: Number,
      default: 0,
      min: 0,
    }
  },
  {
    timestamps: true,
  }
);

//mongoose middleware for saving data: pre / post
stokeSchema.pre("save", function (next) {
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next();
});

stokeSchema.post("save", function (doc, next) {
  console.log("After saving data");
  next();
});

// model creation
const Stoke = mongoose.model("Stoke", stokeSchema);

module.exports = Stoke;
