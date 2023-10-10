const communitytemp = require("../models/community");
const itenaryModel = require("../models/itenary");
const express = require("express");
const router = express.Router();

router.post("/comment", async (req, res) => {
  const { username, blogmsg, title, imagelink } = req.body;

  try {
    // Input validation
    if (!username || !blogmsg || !title || !imagelink) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const comment = new communitytemp({
      username: username,
      title: title,
      blogmsg: blogmsg,
      imagelink: imagelink,
    });

    await comment.save();
    res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

router.get("/getcomments", async (req, res) => {
  try {
    const items = await communitytemp.find();
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// itenary
router.post("/itinerary", async (req, res) => {
  const { username, place, city, state, category, openingHours } = req.body;
  console.log(req.body);

  try {
    const itinerary = new itenaryModel({
      username: username,
      place: place,
      city: city,
      state: state,
      category: category,
      openingHours: openingHours,
    });

    await itinerary.save();

    res.status(201).json({ message: "Itinerary added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add itinerary" });
  }
});

router.delete("/deleteItem/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    // Use Mongoose to find and remove the item by its ID
    const deletedItem = await itenaryModel.findByIdAndRemove(itemId);

    if (!deletedItem) {
      // If the item with the provided ID is not found, return a 404 response
      return res.status(404).json({ message: "Item not found" });
    }

    // If the item was successfully deleted, return a 200 response
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error while deleting item:", error);
    // If there's an error, return a 500 response
    res.status(500).json({ message: "Internal server error" });
  }
});

//checkbox update
router.post("/updatecheckbox", async (req, res) => {
  try {
    const { _id, isVisited } = req.body;

    // Update the document with the given _id
    const updatedItem = await itenaryModel.findByIdAndUpdate(
      _id,
      { isVisited },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error while updating checkbox state:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getitinerary", async (req, res) => {
  const user = req.query.user;
  try {
    const itineraries = await itenaryModel.find({ username: user });
    res.json(itineraries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get itineraries" });
  }
});

module.exports = router;
