const mongoose = require("mongoose");
const validator = require("validator")

// schema desing
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique"],
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
       type : String,
       required: true,
       validate: [validator.isURL, "wrong url"]
      },
    ],
    category: {
      name:{
        type: String,
        required: true
      },
      id:{
        type: mongoose.Types.ObjectId,
        ref:"Category",
        required: true,
      }
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

//mongoose middleware for saving data: pre / post
productSchema.pre("save", function (next) {
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next();
});

productSchema.post("save", function (doc, next) {
  console.log("After saving data");
  next();
});

// model creation
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
