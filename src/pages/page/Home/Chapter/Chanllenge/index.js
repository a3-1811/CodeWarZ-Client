import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Chanllenge(props) {
  const { chanllenge } = props;
  return (
    <div
      className={`chanllenge xl:basis-1/3 xl:h-1/4 bg-slate-800 h-3/4 border-primary border-2 rounded-md flex-1 px-2 py-4 text-center flex justify-center items-center flex-col
     ${chanllenge.result.completed ? "completed" : ""}`}
    >
        <h2 className="text-center font-bold text-white mb-3 text-xl h-14 limit-2 xl:h-auto">
          {chanllenge.chanllenge.name}
        </h2>
        <p className="desriptions mb-3 limit text-gray-500 limit-4 h-24 xl:limit-3 xl:h-auto">{chanllenge.chanllenge.descriptions}</p>
        <Link to={`/code/${chanllenge.chanllenge._id}`} className="mt-auto rounded-md px-4 py-2 bg-primary font-bold text-white" >
          {chanllenge.result.completed ? "View" : "Chanllenge"}
        </Link>
    </div>
  );
}

export default Chanllenge;
