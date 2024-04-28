import React, { useContext, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import AuthContext from "../context/AuthContext";
import LoginModal from "../components/LoginModal";
import axiosInstance from "../utils/axiosInstance";
import SignupModal from "../components/SignupModal";
import { useNavigate } from "react-router-dom";

const NewTask = () => {
  const { name, token } = useContext(AuthContext);

  const [showLoginModal, setshowLoginModal] = useState(false);
  const [showSignUpModal, setshowSignUpModal] = useState(false);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      return setshowLoginModal(true);
    }
    try {
      const { data } = await axiosInstance.post(
        "/api/task",
        {
          title,
          description,
          tags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      navigate("/tasks");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container text-start">
      <LoginModal
        show={showLoginModal}
        onHide={() => setshowLoginModal(false)}
        onSwap={() => setshowSignUpModal(true)}
      />
      <SignupModal
        show={showSignUpModal}
        onHide={() => setshowSignUpModal(false)}
        onSwap={() => setshowLoginModal(true)}
      />
      <div className="d-flex py-4 align-items gap-1">
        <p>
          <IoIosArrowBack className=" fs-2 my-1" />
        </p>
        <h2 className="m-0">New Task</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-5 py-3"
        action=""
      >
        <div className="position-relative">
          <label
            className="position-absolute label1 bg-white px-2 text-secondary fw-semibold fs-6"
            htmlFor="title"
          >
            Task Title
          </label>
          <input
            placeholder="E.g Project Defense, Assignment"
            className="w-100 border py-3 rounded-2 px-4"
            type="text"
            id="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="position-relative">
          <label
            className="position-absolute label2 bg-white px-2 text-secondary fw-semibold fs-6"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            placeholder="Briefly describe your task..."
            className="w-100 border rounded-2 py-3 px-4"
            name=""
            id="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="position-relative">
          <label
            className="position-absolute label3 bg-white px-2 text-secondary fw-semibold fs-6"
            htmlFor="tags"
          >
            Tags
          </label>
          <input
            placeholder="Urgent Important"
            className="w-100 border py-3 rounded-2 px-4"
            type="text"
            id="tags"
            onChange={(e) => {
              setTags(e.target.value);
            }}
          />
        </div>
        <button className="w-100 border-0 py-3 rounded-3 text-white">
          Done
        </button>
        <a href="#" className="text-center text-decoration-none">
          Back To Top
        </a>
      </form>
    </div>
  );
};

export default NewTask;