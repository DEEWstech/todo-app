import express from "express";
import {
  getUser,
  registerUser,
  signInUser,
} from "../controllers/authController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/signin").post(signInUser);
router.route("/").get(auth, getUser);

export default router;