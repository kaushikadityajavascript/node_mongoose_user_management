const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  is_deleted: { type: Boolean, default: false },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
