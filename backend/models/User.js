const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    bio: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
      trim: true,
    },

    socialLinks: {
      github: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
    },

    resumeUrl: {
      type: String,
      default: "",
    },
    
    customDomain: {
  type: String,
  default: "",
},

    templateId: {
      type: String,
      default: "minimalist",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);