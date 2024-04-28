const errorHandler = (error, req, res, next) => {
    if (error?.errors?.username) {
      return res.status(400).json({
        message: error.errors.username.message,
      });
    }
    if (error?.errors?.email) {
      return res.status(400).json({
        message: error.errors.email.message,
      });
    }
    if (error?.errors?.password) {
      return res.status(400).json({
        message: error.errors.password.message,
      });
    }
  
    if (error?.code === 11000 && error?.keyValue.username) {
      return res.status(400).json({
        message: "username already exists",
      });
    }
    res.status(500).json({
      message: "something went wrong",
    });
  };
  
  export default errorHandler;