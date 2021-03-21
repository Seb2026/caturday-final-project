/**Our connection to the front-end */
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Comment = require("../models/Comment");
const User = require("../models/User");
const RescueStory = require("../models/RescueStory");

router.get(`/`, (req, res) => {
  res.json({
    backend: "🔥",
  });
});

router.post(`/addComment`, authorize, (req, res) => {
  Comment.create({ comment: req.body.comment, userId: res.locals.user._id })
    .then((comment) => {
      res.json({ comment });
    })
    .catch(console.error);
});

router.get("/getComments", (req, res) => {
  Comment.find({}).then((allCommentsFromDb) => {
    res.json(allCommentsFromDb);
  });
});

router.get("/getMyComments", authorize, (req, res) => {
  Comment.find({ userId: res.locals.user._id }).then((allCommentsFromDb) => {
    res.json(allCommentsFromDb);
  });
});

router.get("/user", authorize, (req, res) => {
  User.findById(res.locals.user._id)
    .then((user) => {
      res.json(user);
    })
    .catch(console.error);
});

router.post("/logMeIn", async (req, res) => {
  //Check if user already exists
  let user = await User.findOne({ email: req.body.email });

  //If s/he doesn't exist than create new user
  if (!user) {
    user = await User.create(req.body);
  }

  //Signing the token with the user object
  jwt.sign({ user }, "secret key", { expiresIn: "30min" }, (err, token) => {
    //Send token back to the frontend
    res.json({ user, token });
  });
});

router.post("/rescue-story", (req, res) => {
  const { name, age, breed, story, image } = req.body;
  RescueStory.create({ name, age, breed, story, image })
    .then((createdStory) => {
      console.log(createdStory);
    })
    .catch((err) => console.log(err));
});

//   <input type="text" name="name" placeholder="Cat's Name" />
//   <br />
//   <input type="number" name="age" placeholder="Age" /> <br />
//   <input type="text" name="breed" placeholder="Breed" /> <br />
//   <label>Tell your cat's story:</label>
//   <br />
//   <textarea name="story" cols="80" rows="10"></textarea>
//   <br />
//   <label>Show off your beautiful Furbaby!</label>
//   <br />
//   <input type="file" name="image" />
function authorize(req, res, next) {
  let token = req.headers["authorization"].split(" ")[1];

  if (token != "null") {
    jwt.verify(token, "secret key", async (err, data) => {
      if (!err) {
        console.log(data);
        res.locals.user = data.user;
        next();
      } else {
        console.error(err);
      }
    });
  } else {
    res.status(403).json({ message: "Must be logged in" });
  }
}

module.exports = router;
