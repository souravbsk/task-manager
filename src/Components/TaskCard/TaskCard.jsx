import moment from "moment/moment";
import React from "react";
import { FaCalendarAlt, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const TaskCard = ({ task,handleDeleteCard,handleStatusTask }) => {
  const { date, details, status, title, _id } = task || {};
  return (
    <div className="card bg-[#141E33] text-neutral-content">
      <div className="">
        <div className="mb-12">
          <h2 className="card-title text-2xl">{title}</h2>
          <p>
            {details?.length > 200 ? details?.slice(0, 200) + "..." : details}
          </p>
        </div>
        <p className="flex items-center mb-6 gap-2">
          <FaCalendarAlt></FaCalendarAlt>{" "}
          <span>{moment(date).format("MMMM Do YYYY, h:mm a")}</span>
        </p>
        <div className="card-actions justify-between border-gray-400 border-dashed border-t pt-2">
          <button onClick={() => handleStatusTask(_id,status)} className="btn btn-ghost">
            <span
              className={`badge  ${
                status === "completed" ? "badge-success" : "bg-[#FDE68A]"
              }`}
            >
              {status}
            </span>
          </button>
          <div>
            <Link to={`/updatetask/${_id}`}>
              <button className="btn mr-4 hover:text-indigo-500 text-white primary-btn">
                <FaRegEdit></FaRegEdit>
              </button>
            </Link>
            <button onClick={() => handleDeleteCard(_id)} className="btn  text-white hover:text-red-600 bg-red-700">
              <FaTrashAlt></FaTrashAlt>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
