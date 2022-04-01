const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true ,unique:true},
    password: { type: String, required: true },
    cPassword: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {
      type: String,
      required: false,
      enum: ["male", "female"],
      default: "male",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
