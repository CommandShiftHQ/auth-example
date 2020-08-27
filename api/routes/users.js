const express = require("express");
const router = express();
const User = require("../models/users");

// Create a user
router.post("/", async (req, res) => {
  const user = await User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// user login
router.post("/login", function (req, res) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          message: "User not found.",
        });
      } else {
        if (user.validatePassword(req.body.password)) {
          res.status(200).json(user);
          // jwt token/cookies
        } else {
          res.status(401).json({
            message: "The username/password is incorrect",
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

module.exports = router;
