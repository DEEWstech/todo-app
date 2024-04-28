import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import logo from "../assets/Group 1.png"
import avatar from "../assets/Group 6.png"


const Navbar1 = () => {
  return (
    <Navbar expand="lg" className="border-bottom py-4">
      <Container>
       <Link to="/" className="text-black text-decoration-none fs-4 fw-bold d-flex align-items-center gap-3">
       <img src={logo} alt="" />
       <p className="m-0">TaskDuty</p>
       </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto me-lg-0 ms-lg-auto d-flex gap-3 align-items-center">
            <Link className="text-black text-decoration-none fw-semibold" to="/new">New Task</Link>
            <Link className="text-black text-decoration-none fw-semibold" to="/tasks">All Task</Link>
            <img src={avatar} alt="" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Navbar1;