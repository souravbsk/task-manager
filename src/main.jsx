import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layouts/Main.jsx";
import AllTasks from "./Components/AllTasks/AllTasks.jsx";
import AddTask from "./Components/AddTask/AddTask.jsx";
import UpdateTask from "./Components/UpdateTask/UpdateTask.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:"/",
        element:<AllTasks></AllTasks>,
      },
      {
        path:"/addtask",
        element:<AddTask></AddTask>
      },
      {
        path:"/updatetask/:id",
        element:<UpdateTask></UpdateTask>,
        loader: ({params}) => fetch(`http://localhost:5000/tasks/${params.id}`)
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
