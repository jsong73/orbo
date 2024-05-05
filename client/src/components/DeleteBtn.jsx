import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import Auth from "../../utils/auth"
import { deleteTask } from "../../utils/api";

function DeleteBtn({taskId}) {
    console.log("is taskID being passed down?", taskId)
  const [showModal, setModal] = useState(false);

  const handleToggleMenu = (event) => {
    event.stopPropagation(); 
    setModal(true);
  };

  const handleClick = async () => {
    setModal(false);

    try {
        const token = Auth.getToken();

        await deleteTask(taskId, token)
        window.location.reload();
        
    } catch (error){
        console.log(error)
    }
  };

  const handleCompleteTask = () => {
    setModal(false);
  };

  return (
    <div>
      <button onClick={handleToggleMenu}>
        <CiMenuKebab />
      </button>
      {showModal && (
        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-md z-10 w-36 ">
          <ul>
            <li className="py-1 px-3 hover:bg-gray-100 cursor-pointer" onClick={handleClick}>
              Delete Task
            </li>
            <li className="py-1 px-3 hover:bg-gray-100 cursor-pointer" onClick={handleCompleteTask}>
              Mark Complete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default DeleteBtn;