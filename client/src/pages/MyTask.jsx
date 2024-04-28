import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import AuthContext from "../context/AuthContext";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const MyTask = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [showLoginModal, setshowLoginModal] = useState(false);
  const [showSignUpModal, setshowSignUpModal] = useState(false);

  useEffect(() => {
    if (!token) {
      return setshowLoginModal(true);
    }
    const getData = async () => {
      try {
        const { data } = await axiosInstance.get("/api/task", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(data.tasks);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [token]);

  const deleteTask = async (id) => {
    const { data } = await axiosInstance.delete(`/api/task/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(data);
    navigate(0);
  };

  return (
    <div className="container">
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
      <div className="d-flex justify-content-between align-items-center py-5">
        <p className="fs-4 fw-bold">My Tasks</p>
        <Link className="text-decoration-none" to="/new">
          + Add New Task
        </Link>
      </div>

      <div className="d-flex flex-column gap-3">
        {tasks.map((task) => {
          return (
            <div key={task._id} className="border p-3 rounded-3 text-start">
              <div className="d-flex justify-content-between border-bottom py-3 align-items-center">
                <p className="text-danger">{task.tags} </p>
                <div className="d-flex gap-3 align-items-center">
                  <div className="edit d-flex align-items-center px-4 py-2 rounded-3 gap-3">
                    <FaRegEdit className="text-white" />
                    <Link
                      className="edit rounded-3 text-decoration-none text-white"
                      to={`/edit/${task._id}`}
                    >
                      Edit
                    </Link>
                  </div>

                  <div className="delete border-2 rounded-3 px-4 py-2">
                    <RiDeleteBinLine />
                    <button
                      className="border-0 bg-white "
                      onClick={() => {
                        deleteTask(task._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <p className="fs-3 fw-semibold">{task.title} </p>
              <p>{task.description} </p>
            </div>
          );
        })}
        <a href="#" className="text-center text-decoration-none">
          Back To Top
        </a>
      </div>
    </div>
  );
};

export default MyTask;
