const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    dob: String,
    phone: String,
});

module.exports = mongoose.model("Contact", ContactSchema);