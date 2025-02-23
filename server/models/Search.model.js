const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
    },
    status: {  // Fixed typo (was "stauts")
      type: String,
    },
    score: {
      type: String,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // Ensure "User" model exists
      required: true,
    },
  },
  { timestamps: true }
);

const Search = mongoose.model("Search", searchSchema);

module.exports = Search;
