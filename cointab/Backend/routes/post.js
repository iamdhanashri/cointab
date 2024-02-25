const express = require("express");
const postRoute = express.Router();
const { PostModel } = require("../models/post");

postRoute.post("/:userId/bulkAdd", async (req, res) => {
  try {
    const userId = req.params.userId;

    const posts = req.body.posts;

    const addedPosts = await PostModel.insertMany(posts);

    res.status(201).json(addedPosts);
  } catch (error) {
    console.error("Error adding posts:", error);
    res.status(500).json({ error: "Failed to add posts" });
  }
});

postRoute.get("/:userId/downloadExcel", async (req, res) => {
  try {
    const userId = req.params.userId;

    const userPosts = await PostModel.find({ userId });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=posts.xlsx");

    res.send(/* Excel file buffer */);
  } catch (error) {
    console.error("Error downloading Excel file:", error);
    res.status(500).json({ error: "Failed to download Excel file" });
  }
});

module.exports = { postRoute };
