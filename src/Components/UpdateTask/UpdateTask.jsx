import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateTask = () => {
  const task = useLoaderData();
  const navigate = useNavigate()
  const { date, details, status, title, _id } = task || {};
  const handleUpdateTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const date = form.date.value;
    const details = form.details.value;
    const status = form.status.value;
    const updateTask = {
        title,
        date,
        details,
        status,
      };
  
      fetch(`https://mca-task-manager-server.vercel.app/tasks/${_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateTask),
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
          if (data.modifiedCount > 0) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Task Update Success",
              showConfirmButton: false,
              timer: 1500,
            });
            form.reset();
            navigate("/")
          }
        });
  };
  return (
    <div className="py-8" >
      <div className="card mx-auto bg-white md:w-1/2">
        <form onSubmit={handleUpdateTask}>
          <h3 className="font-bold text-2xl text-center">Task Update</h3>

          <div className="form-control mb-3 w-full">
            <label className="label">
              <span className="label-text font-medium">Title</span>
            </label>
            <label className="">
              <input
                required
                name="title"
                defaultValue={title}
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
                defaultValue={date}
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
                defaultValue={details}
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
              defaultValue={status}
              className="select select-primary md:w-1/2 max-w-xs"
            >
              <option value="uncompleted">uncompleted</option>
              <option value="completed">completed</option>
            </select>
          </div>

          <button className="btn btn-block btn-primary">Update Task</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
