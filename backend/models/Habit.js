const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily",
    },

    completionDates: {
      type: [Date],
      default: [],
    },

    totalCompletions: {
      type: Number,
      default: 0,
    },

    xp: {
      type: Number,
      default: 0,
    },

    streak: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);