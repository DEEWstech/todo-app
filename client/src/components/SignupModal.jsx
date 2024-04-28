import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AuthContext from "../context/AuthContext";

const SignupModal = (props) => {
  const { signUpUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault;
    signUpUser({ username, email, password }, props);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column p-5 gap-4"
        action=""
      >
        <h2 className="text-start ">Sign Up</h2>
        <div>
          <input
            className="w-100 border rounded-3 py-3 px-2"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            className="w-100 border rounded-3 py-3 px-2"
            type="text"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            className="w-100 border rounded-3 py-3 px-2"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <button className="text-white rounded-2 ">Sign Up</button>
        <p>
          Already have an account?
          <a
            href="#"
            onClick={() => {
              props.onSwap();
              props.onHide();
            }}
            className="text-decoration-none"
          >
            Login
          </a>
        </p>
      </form>
    </Modal>
  );
};

export default SignupModal;
