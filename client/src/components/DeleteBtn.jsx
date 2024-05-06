import React, { useState , useEffect, useRef  } from "react";
import { CiMenuKebab } from "react-icons/ci";
import Auth from "../../utils/auth"
import { deleteSubtask, deleteTask , updateTask} from "../../utils/api";

function DeleteBtn({taskId, subtaskId}) {

const token = Auth.getToken();

// console.log("is taskID being passed down?", taskId)
// console.log("is subtaskID being passed down?", subtaskId)
  const [showModal, setModal] = useState(false);
  const menuRef = useRef(null); 

  const handleSelectMenu = () => {
    setModal(true);
  };

  const handleClick = async () => {
    setModal(false);
    try {
        if(subtaskId) {
            await deleteSubtask(taskId, subtaskId, token) 
            window.location.reload();
        } else {
            await deleteTask(taskId, token)
            window.location.reload();
        }

    } catch (error){
        console.log(error)
    }
  };

  const handleCompleteTask = async () => {
    setModal(false);
    try{
        await updateTask(taskId, { completed: true}, token)
        window.location.reload();
    } catch(error) {
        console.log(error)
    }
  };

  const displayCompleteBtn = () => {
    if (!subtaskId) {
      return (
        <li
          className="py-1 px-3 hover:bg-gray-100 cursor-pointer"
          onClick={handleCompleteTask}
        >
          Mark Complete
        </li>
      );
    }
    return null;
  };


  //close menu when clicking outside of the drop down menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="relative">
      <button onClick={handleSelectMenu} className="absolute top-0 right-0">
        <CiMenuKebab />
      </button>
      {showModal && (
        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-md z-10 w-36 " ref={menuRef}>
          <ul>
            <li className="py-1 px-3 hover:bg-gray-100 cursor-pointer" onClick={handleClick}>
              Delete
            </li>
            {displayCompleteBtn()}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DeleteBtn;