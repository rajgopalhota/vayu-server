const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  username: {
    type: String,
    default: "Anonymous",
  },
  place: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  category: {
    type: String,
  },
  openingHours: {
    type: String,
  },
  isVisited: {
    type: Boolean,
    default: false,
  },
  dateAdded: {
    type: String,
    default:
      function () {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        const hoursIST = today.getHours();
        const minutesIST = today.getMinutes();

        return `${dd}-${mm}-${yyyy} at ${hoursIST}:${minutesIST}`;
      }

  },
});

module.exports = mongoose.model("Itinerary", itinerarySchema);
