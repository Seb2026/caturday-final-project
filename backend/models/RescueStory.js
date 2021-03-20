const { Schema, model, ObjectId } = require("mongoose");

const rescueStorySchema = new Schema({
  breed: String,
  age: Number,
  story: String,
  image: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("RescueStory", rescueStorySchema);
