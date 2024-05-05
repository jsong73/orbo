import React from "react";
import { IoClose } from "react-icons/io5";
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


      <a
        href="#"
        className="flex items-center space-x-1 rounded-md px-2 py-3 mt-12 hover:bg-gray-100 hover:text-blue-600"
      >
        <span className="text-2xl">
          <i className="bx bx-home"></i>
        </span>
        <span>Dashboard</span>
      </a>
      <a
        href="#"
        className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
      >
        <span className="text-2xl">
          <i className="bx bx-cart"></i>
        </span>
        <span>Cart</span>
      </a>
      <a
        href="#"
        className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
      >
        <span className="text-2xl">
          <i className="bx bx-shopping-bag"></i>
        </span>
        <span>Shopping</span>
      </a>
      <a
        href="#"
        className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
      >
        <span className="text-2xl">
          <i className="bx bx-heart"></i>
        </span>
        <span>My Favourite</span>
      </a>
      <a
        href="#"
        className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
      >
        <span className="text-2xl">
          <i className="bx bx-user"></i>
        </span>
        <span>Profile</span>
      </a>
    </aside>
  );
}

export default SideNav;