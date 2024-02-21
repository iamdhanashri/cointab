const express = require("express");
const userRoute = express.Router();
const axios = require("axios");
const { User } = require("../models/user");

userRoute.get("/allUsers", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = response.data;

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

userRoute.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const user = response.data;

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

userRoute.post("/allUsers", async (req, res) => {
  const { id } = req.body;

  try {
    const isUser = await User.findOne({ id: id });

    if (isUser) {
      return res.status(409).send({ message: "User is already Registered !" });
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).send({ message: "User added", user: newUser });
  } catch (error) {
    return res.status(501).send({ message: "Error in adding user" });
  }
});

module.exports = { userRoute };
