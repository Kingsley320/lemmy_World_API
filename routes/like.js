const express = require("express");
const app = express.Router();
let Post = require("../models/posts");
let User = require("../models/users");
let Like = require("../models/like");

app.post("/like", async (req, res) => {
  let { user_id, post_id } = req.body;
    // Stopped trying to stop redundant likes
  try {
    // const loggedUser = await User.findById(user_id)
    // // console.log(loggedUser)
    // if (!loggedUser) return res.send({msg: "Log in to like!"})

    const sameLike = await Like.find({
      user_id: user_id,
      post_id: post_id
    });
    console.log(sameLike)
    if (sameLike) return res.send({ msg: "Liked already!", sameLike });

    const like = new Like(req.body);
    await like.save();

    let liker = await User.findById(user_id);
    liker.like_id.push(post_id);
    await liker.save();

    res.send(like);
  } catch (error) {
    res.send(error);
  }
});

app.get("/like", async (req, res) => {
  const post = req.params;
  try {
    const postLikes = await Like.find({
      post_id: post,
    });
    res.send(postLikes);
  } catch (error) {
    res.send(error);
  }
});

module.exports = app;
