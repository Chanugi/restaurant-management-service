// models/restaurantModel.js
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    cuisineType: { type: String },
    status: { type: String, enum: ["open", "closed"], default: "closed" },
    image: { type: String },
    isVerified: { type: Boolean, default: false },
    role: { type: String }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);