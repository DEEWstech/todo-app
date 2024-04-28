import Task from "../models/task.js";

const allTasks = async (req, res) => {
  const { userId } = req.user;
  const tasks = await Task.find({ createdBy: userId });
  res.status(200).json({
    tasks,
  });
};

const singleTask = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const task = await Task.findOne({ _id: id, createdBy: userId });
  if (!task) {
    return res.status(404).json({
      message: `No task with ID:${id}`,
    });
  }
  res.status(200).json({
    task,
  });
};

const createTask = async (req, res, next) => {
  const { userId } = req.user;
 

  try {
    const task = await Task.create({ ...req.body, createdBy: userId });
    res.status(201).json({
      message: "Task Created",
      task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const task = await Task.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { ...req.body },
    { new: true }
  );
  if (!task) {
    return res.status(404).json({
      message: `No task with ID:${id}`,
    });
  }
  res.status(200).json({
    message: "Task Updated",
    task,
  });
};

const deleteTask = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, createdBy: userId });
  if (!task) {
    return res.status(404).json({
      message: `No task with ID:${id}`,
    });
  }
  res.status(200).json({
    message: "Task Deleted",
    task,
  });
};

export { allTasks, singleTask, createTask, updateTask, deleteTask};