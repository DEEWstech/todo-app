import { createContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(() => {
    return JSON.parse(localStorage.getItem("token") || null);
  });

  const signInUser = async (formdata, props) => {
    try {
      const { data } = await axiosInstance.post("/api/auth/signin", formdata);
      console.log(data);
      setToken(data.token);
      localStorage.setItem("token", JSON.stringify(data.token));
      props.onHide();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const signUpUser = async (formdata, props) => {
    try {
      const { data } = await axiosInstance.post("/api/auth/register", formdata);
      console.log(data);
      setToken(data.token);
      localStorage.setItem("token", JSON.stringify(data.token));
      props.onHide();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const contextData = {
    name: "Esther",
    token,
    signInUser,
    signUpUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children} </AuthContext.Provider>
);
};