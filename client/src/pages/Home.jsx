import React from "react";
import { Link } from "react-router-dom";
import component1 from  "../assets/Component 1.png"

const Home = () => {
  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gap-5 my-5 cardd">
        <div className="d-flex flex-column gap-3">
          <h1 className="">
            <span className="d-block">Manage your Tasks on</span> <span className="duty">Task Duty</span>
          </h1>
          <p className="fs-3 lor">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            necessitatibus nihil aut consequatur dicta illo saepe qui hic,
            voluptate omnis quae voluptatem ab iusto quaerat laboriosam. Porro
            praesentium iusto exercitationem!
          </p>
          <Link to="/tasks"><button className="px-5 py-2 text-white fs-4 border-0 rounded-2">Go to My Tasks</button></Link>
        </div>
        <img src={component1} alt="" />
      </div>
    </div>
  );
};

export default Home;