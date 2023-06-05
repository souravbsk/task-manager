import React from "react";
import { NavLink, Outlet, useNavigation } from "react-router-dom";
import "./Main.css";
import { TraceSpinner } from "react-spinners-kit";
import { FaBars, FaHamburger } from "react-icons/fa";

const Main = () => {
  const {state} = useNavigation();
  
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-[#0F172A]">
          <div className="px-3 md:px-8 py-6">
          <label
            htmlFor="my-drawer-2"
            className="btn mb-5 btn-primary drawer-button lg:hidden"
          >
           <FaBars></FaBars>
          </label>
             {
              state === "loading" && <div className="flex h-screen items-center justify-center">
              <TraceSpinner size={60} color="#686769" loading={state === "loading"} />
            </div>
             }
    
              <Outlet></Outlet>
         
          </div>
          
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className=" py-10 text-white space-y-6 p-4 w-3/4 md:w-80 h-full bg-[#141E33] ">
            <li>
              <h2 className="text-gray-200 text-xl font-bold management-title">
                Task Management APP
              </h2>
            </li>
            <li>
              <NavLink to="addtask">
                <button className="primary-btn btn py-4 text-white">
                  Add Task +
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink className="text-xl font-semibold" to="/">All Tasks</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Main;
