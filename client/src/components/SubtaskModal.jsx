import React, { useState , useEffect} from "react";
import Auth from "../../utils/auth"
import { FaRegClock } from "react-icons/fa6";
import { GrUploadOption } from "react-icons/gr";
import { addSubtask } from "../../utils/api"; 
import { TbStatusChange } from "react-icons/tb";
import Select from 'react-select';

function SubtaskModal({showModal, setModal, taskId, status }) {
  // console.log("this is status", status)
  // console.log("did taskId make it here?", taskId)
    const [ title, setTitle ] = useState("")
    const [ description, setDescription] = useState("")
    const [ subtaskStatus, setSubtaskStatus] = useState(status)

    const handleClose = () => {
      setModal(false)
    }

    useEffect(() => {
      setSubtaskStatus(status)
      console.log("status",subtaskStatus)
    }, [status])

    const handleClick = async () => {
        setModal(false)

        try{
            const token = Auth.getToken();
          
            const newSubtask = await addSubtask(taskId, { title: title, description: description, status: subtaskStatus }, token);

            // console.log("new subtask", newSubtask)
    
            
            setTitle("");
            setDescription("");
            window.location.reload();
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
                    className="ml-2  text-3xl font-bold border-none w-full h-20 focus:outline-none" placeholder="Untitled"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}> 
                </input>
                

                {/* close button */}
                <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                    <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
                </div>


                <div className="mt-4 flex flex-col-2 ml-8">
                        <div className="flex items-center">
                            <FaRegClock className="mr-2 text-gray-400" />
                            <p className="text-gray-400">Date Created</p>
                        </div>
                        <div className="ml-7">{today}</div>
                </div>



                <div className="mt-4 flex flex-col-2 ml-8">
                        <div className="flex items-center">
                            <TbStatusChange  className="mr-2 text-gray-400" />
                            <p className="text-gray-400">Status</p>
                        </div>
                    <Select
                        value={{ value: subtaskStatus, label: subtaskStatus }}
                        onChange={(option) => setSubtaskStatus(option.value)}
                        options={[
                        { value: 'To Do', label: 'To Do'},
                        { value: 'Doing', label: 'Doing'},
                        { value: 'Done', label: 'Done'}
                        ]}
                        className="ml-20 w-1/4"
                    />
                    </div>

                    
                {/* <div className="mt-4 px-4 flex items-center">
                    <IoPersonCircle  className="mr-2 ml-3 text-gray-400 text-xl" /> 
                    <p className="text-gray-400 mr-36">Author</p>

                </div> */}
        

                {/* task text */}
                <div className="ml-2 mt-4 px-4 h-full">
                    <h2 className="mt-8 font-semibold text-xl !text-gray-500">Description</h2>
                    <textarea  
                        className="mt-8 w-full h-4/6 whitespace-normal focus:outline-none" 
                        placeholder="Write something here ☺" 
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}> 
                </textarea >



                {title && (
                    <div className="mt-4 flex justify-end text-blue-500">
                        <button onClick={handleClick} className="text-2xl">
                        <GrUploadOption />
                        </button>
                    </div>
                    )}

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

export default SubtaskModal;