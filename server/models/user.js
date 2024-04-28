import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;