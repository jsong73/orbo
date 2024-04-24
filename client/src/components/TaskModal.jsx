import React, { useState } from "react";
import { addTask } from "../../utils/api";
import Auth from "../../utils/auth"
import { FaRegClock } from "react-icons/fa6";
import { TbStatusChange } from "react-icons/tb";
import { GrUploadOption } from "react-icons/gr";

function TaskModal({showModal, setModal}) {

    const [ title, setTitle ] = useState("")
    const [ description, setDescription] = useState("")
    const [ status, setStatus ] = useState("")

    const handleClick = async () => {
        setModal(false)
        // console.log("setModal?", setModal)
        
        try{
            const token = Auth.getToken();


        } catch(error) {
            console.log(error)
        }
      }
    

    const today =  new Date().toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' });
    // console.log(today)


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


                <input 
                    className="ml-2 text-3xl font-bold border-none w-full h-20 focus:outline-none" placeholder="Untitled"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}> 
                </input>
                

                {/* close button */}
                <button onClick={handleClick} className="text-gray-500 hover:text-gray-700">
                    <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
                </div>

                <div className="mt-4 px-4 flex items-center ">
                    <FaRegClock className="mr-2 ml-3 text-gray-400" /> 
                    <p className="text-gray-400">Date Created</p>
                    <span className=" ml-28">{today}</span>
                </div>

                    
                <div className="mt-4 px-4 flex items-center">
                    <TbStatusChange  className="mr-2 ml-3 text-gray-400" /> 
                    <p className="text-gray-400 mr-36">Status</p>
                        <select 
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className=" ml-4 border border-gray-300 rounded-md p-1 focus:outline-none">
                        <option value="To Do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
        

                {/* task text */}
                <div className="ml-2 mt-4 px-4 h-full">
                    <h2 className="mt-8 font-semibold text-xl !text-gray-500">Description</h2>
                    <textarea  
                        className="mt-8 w-full h-5/6 whitespace-normal focus:outline-none" 
                        placeholder="Write something here ☺" 
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}> 
                </textarea >



                {/* upload button */}
                <button onClick={handleClick} className="text-2xl">
                <GrUploadOption />
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