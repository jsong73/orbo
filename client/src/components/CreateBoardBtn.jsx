import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

function CreateBoardBtn() {
  

  return (
    <button className="relative bg-white py-6 px-6 rounded-3xl w-80 my-4 shadow-xl flex items-center justify-center  hover:bg-blue-100 transition duration-300">
        <AiOutlinePlus className="mr-2" /> 
        <span className="font-semibold ">Create new board</span>
    </button>
  )
}

export default CreateBoardBtn;
