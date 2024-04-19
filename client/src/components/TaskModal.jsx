import React, { useState } from "react";
import { addTask } from "../../utils/api";
import Auth from "../../utils/auth"
import { FaRegClock } from "react-icons/fa6";

function TaskModal({showModal, setModal}) {

    const handleClick = () => {
        setModal(false)
        console.log("setModal?", setModal)
    }

    const today = new Date();
    const fixedDate = today.toGMTString().split(' ').slice(0, 4);
    // console.log("fixed",fixedDate)


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
          <div className="flex justify-end items-center min-h-screen">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-xl">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl">
                  <div className="flex items-center justify-between px-4">

                    <input className="ml-2 text-3xl font-bold border-none w-full h-20 focus:outline-none" placeholder="Untitled "type="text"> 
                    </input>
                

                    {/* close button */}
                    <button onClick={handleClick} className="text-gray-500 hover:text-gray-700">
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>

                    <div className="mt-2 px-4 flex items-center ">
                        <FaRegClock className="mr-2 ml-3 text-gray-400" /> 
                        <p className="text-gray-400">Date Created</p>
                        <span className="ml-32">{fixedDate}</span>
                    </div>




                  <div className="mt-4 px-4 h-full overflow-auto">
              
        
                  </div>
                  <div className="mt-6 px-4">
                    <button className="flex justify-center items-center bg-black text-white rounded-md text-sm p-2 gap-1">
                      <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z" fill="currentColor"></path>
                      </svg> Filters
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
);
}

export default TaskModal;