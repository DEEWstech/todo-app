import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const port = 5000;

import taskRouter from "./routes/taskRouter.js";
import authRouter from "./routes/authRouter.js";
import mongoose from "mongoose";
import errorHandler from "./middlewares/error.js";

app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.use(errorHandler);

app.use((req, res) => {
  res.send("Route Not Found");
});

const start = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected!");
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error.message);
}
};
start();








