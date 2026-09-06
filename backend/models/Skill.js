const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "DevOps"],
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      default: "Intermediate",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);