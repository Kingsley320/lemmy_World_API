let express = require("express");
let app = express.Router();
let users = require("../models/users");
let posts = require("../models/posts");
let community = require("../models/community");

app.post("/users", async (req, res) => {
  try {
    let user = new users(req.body);
    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await users.findOne({
      email: email,
      password: password,
    });
    let loggeduser = await users
      .findOne({
        email: email,
        password: password,
      })
      .select("-password");
      
    if (user) {
      // console.log(user)
      if (user.password === password) {
        res.json(loggeduser);
      } else {
        res.json("Password incorrect");
      }
    } else {
      res.json("Not registered");
    }
  } catch (error) {
    res.status(500).send({ message: error });
    // console.log(error)
  }
});

app.post('users/likes', async (req,res) => {
  try {
    
  } catch (error) {
    res.send(error.message)
  }
})

module.exports = app;
