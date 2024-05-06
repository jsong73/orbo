import React from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

function SideNav({ openSideNav , setOpenSideNav}) {
    console.log("show?", openSideNav)

    const handleClose = () => {
        setOpenSideNav(false)
    }
  return (

    
    <aside
      className={`fixed left-0 top-0 h-full w-64 bg-white border-r-2 border-gray-200 p-2 transition-transform duration-300 ease-in-out transform ${
        openSideNav ? "translate-x-0" : "-translate-x-full"
      }`}
    >

    <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    >
       <IoClose className="text-xl" />
    </button>

    <Link
        to="/tasks"
        className="flex items-center space-x-1 rounded-md px-2 py-4 mt-12 hover:bg-gray-100 hover:text-blue-600"
    >
        <span className="text-2xl">
            <i className="bx bx-home"></i>
        </span>
        <span>Dashboard</span>
    </Link>


    <Link
        to="/completed"
        className="flex items-center space-x-1 rounded-md px-2 py-4 hover:bg-gray-100 hover:text-blue-600"
    >
        <span className="text-2xl">
            <i className="bx bx-home"></i>
        </span>
        <span>Completed</span>
    </Link>


    <Link
        to="/calender"
        className="flex items-center space-x-1 rounded-md px-2 py-4 hover:bg-gray-100 hover:text-blue-600"
    >
        <span className="text-2xl">
            <i className="bx bx-home"></i>
        </span>
        <span>Calender</span>
    </Link>



        </aside>
  );
}

export default SideNav;