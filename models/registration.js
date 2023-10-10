const mongoose = require("mongoose");
const registrationtemplate = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: function () {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const hoursIST = today.getHours();
      const minutesIST = today.getMinutes();

      return `${dd}-${mm}-${yyyy} at ${hoursIST}:${minutesIST}`;
    }
  },
  role: {
    type: String,
    default: "Customer",
  },
});

module.exports = mongoose.model("users", registrationtemplate);


