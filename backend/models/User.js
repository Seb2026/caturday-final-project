// const { Schema, model } = require('mongoose')

// const userSchema = new Schema({

//     email: String,
//     //googleId: String,
//     password: String,
//     //imageUrl: String,
//     roles: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' }

// })

// module.exports = model('User', userSchema)

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    fname: {
      type: String,
      required: [true, "First name is required"],
    },
    lname: String,

    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
    // profilePicture: {
    //   type: String,
    //   default: 'https://res.cloudinary.com/cruisemate/image/upload/v1612494865/profilePics/wrskr7pdp24ukwlo9gfq.jpg'
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
