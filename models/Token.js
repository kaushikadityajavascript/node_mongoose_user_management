const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async function (value) {
        const user = await mongoose.model("User").findOne({ _id: value });
        return user !== null;
      },
      message: "User_id does not exist.",
    },
  },
  type: { type: String, enum: ["Reset", "Auth", "RefreshAuth"] },
  token: { type: String, required: true },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
