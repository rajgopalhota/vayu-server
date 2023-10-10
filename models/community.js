const mongoose = require("mongoose");
// const today = new Date();
// const dd = String(today.getDate()).padStart(2, "0");
// const mm = String(today.getMonth() + 1).padStart(2, "0");
// const yyyy = today.getFullYear();

// var currentOffset = today.getTimezoneOffset();
// var ISTOffset = 330;   // IST offset UTC +5:30 
// var ISTTime = new Date(today.getTime() + (ISTOffset + currentOffset) * 60000);
// var hoursIST = ISTTime.getHours()
// var minutesIST = ISTTime.getMinutes()

// const currentDate = dd + "-" + mm + "-" + yyyy + " at " + hoursIST + ":" + minutesIST;

const community = new mongoose.Schema({
    username: {
        type: String,
        default: "Anonymous",
    },
    title: {
        type: String
    },
    imagelink: {
        type: String
    },
    blogmsg: {
        type: String,
        // required: true,
    },
    location: {
        type: String,
        default: "India"
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
});

module.exports = mongoose.model("Community", community);