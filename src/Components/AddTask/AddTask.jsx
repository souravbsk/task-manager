import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddTask = () => {
  const handleSubmitTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const date = form.date.value;
    const details = form.details.value;
    const status = form.status.value;

    const addNewTask = {
      title,
      date,
      details,
      status,
    };

    fetch("https://mca-task-manager-server.vercel.app/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addNewTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Task Added Success",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      });
  };
  return (
    <div className="card mx-auto my-8 bg-white md:w-1/2">
      <form onSubmit={handleSubmitTask} >
        <h3 className="font-bold text-2xl text-center">Add A Task</h3>

        <div className="form-control mb-3 w-full">
          <label className="label">
            <span className="label-text font-medium">Title</span>
          </label>
          <label className="">
            <input
              required
              name="title"
              type="text"
              placeholder="title"
              className="input w-full input-bordered"
            />
          </label>
        </div>
        <div className="form-control mb-3 w-full">
          <label className="label">
            <span className="label-text font-medium">Date</span>
          </label>
          <label className="">
            <input
              name="date"
              required
              type="date"
              placeholder="Date"
              className="input w-full input-bordered"
            />
          </label>
        </div>
        <div className="form-control mb-3 w-full">
          <label className="label">
            <span className="label-text font-medium">Description</span>
          </label>
          <label className="">
            <textarea
              required
              name="details"
              placeholder="Details"
              className="input resize-none h-32 p-3 w-full input-bordered"
            ></textarea>
          </label>
        </div>
        <div className="form-control mb-3 w-full">
          <label className="label">
            <span className="label-text font-medium">Status</span>
          </label>
          <select
            name="status"
            defaultValue="uncompleted"
            className="select select-primary md:w-1/2 max-w-xs"
          >
            <option value="uncompleted">uncompleted</option>
            <option value="completed">completed</option>
          </select>
        </div>

        
         <button  className="btn btn-block btn-primary">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
