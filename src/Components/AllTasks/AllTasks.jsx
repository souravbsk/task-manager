import React, { useEffect, useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import Swal from "sweetalert2";

const AllTasks = () => {
  const [taskData, setTaskData] = useState([]);
  const [statusUpdate,setStatusUpdate] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
    .then(res => res.json())
    .then(data => {
      setTaskData(data)
    })

  },[statusUpdate])


  const handleDeleteCard = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do You Wan't to Delete Your Task",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/tasks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remainData = taskData.filter((data) => data._id !== id);
              setTaskData(remainData);
            }
          });
        Swal.fire("Deleted!", "Your Task has been deleted.", "success");
      }
    });
  };


  const handleStatusTask = (id,status) => {

 
    fetch(`http://localhost:5000/tasks/${id}`,{
      method:"PATCH",
      headers:{
        'content-type' : "application/json",
      },
      body: JSON.stringify({status})
    })
    .then(res => res.json())
    .then(data => {
      if(data.modifiedCount > 0){
        setStatusUpdate(!statusUpdate)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Status Update',
          showConfirmButton: false,
          timer: 1500
        })
        
      }
      console.log(data);
    })
  }

  return (
    <div className="w-full">
      <h1 className="font-semibold text-white text-3xl">
        All tasks ({taskData.length} tasks)
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {taskData?.map((task) => (
          <TaskCard
            handleDeleteCard={handleDeleteCard}
            handleStatusTask={handleStatusTask}
            task={task}
            key={task._id}
          ></TaskCard>
        ))}
      </div>
    </div>
  );
};

export default AllTasks;
