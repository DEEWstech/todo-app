import express from "express";
import {
  allTasks,
  createTask,
  deleteTask,
  singleTask,
  updateTask,
} from "../controllers/taskControllers.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(auth, allTasks).post(auth, createTask);
router
  .route("/:id")
  .get(auth, singleTask)
  .patch(auth, updateTask)
  .delete(auth, deleteTask);

export default router;