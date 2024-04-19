import React, { useState } from "react";
import { addTask } from "../../utils/api";
import Auth from "../../utils/auth"

function TaskModal({showModal, setModal}) {

    const handleClick = () => {
        setModal(false)
        console.log("setModal?", setModal)
    }

    const addTask = async (taskData) => {
        try{
            const token = Auth.getToken();

            const response = await addTask(taskData, token)
            console.log("response", response)
    
        } catch(error) {
            console.log(error)
        }
    }
  return (
    <>
    {showModal && (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      
            <button
              onClick={handleClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
            >
              Add Task
            </button>
            <button
              onClick={() => setModal(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);
}

export default TaskModal;