import React, {useEffect, useState} from "react";
import Auth from "../../utils/auth"
import { tasks } from "../../utils/api"
import {icons} from "../../utils/icons"

function Tasks() {

  const [taskData, setTaskData] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const token = Auth.getToken();
        const response = await tasks(token)
        console.log("response", response)


        // if(response.completed)


        const filteredTasksByDate = response.slice().sort((a,b) =>{
          return new Date(b.created_at) - new Date(a.created_at);
        })


        if (typeof response.message === "string") {
          setError(response.message);
          setTaskData([]); 
        } else {
          setTaskData(filteredTasksByDate);
          setError("");

        }
      }catch(error){
        console.log(error)
        
      }
    }
    getAllTasks()
  }, [])

return (
<div className="flex items-center justify-center">
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {taskData.map((task, index) => (
            <div key={index} className="relative bg-white py-6 px-6 rounded-3xl w-80 my-4 shadow-xl">
              <div className={`text-white flex items-center absolute rounded-full py-4 px-4         shadow-xl left-4 -top-6 ${icons[task.category].color}`}>
                  {icons[task.category].icon}
                </div>
                <div className="mt-8">
                    <p className="text-xl font-semibold my-2">{task.title}</p>
                    <div className="flex space-x-2 text-gray-400 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p>{task.category}</p>
                    </div>
                    <div className="flex space-x-2 text-gray-400 text-sm my-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p>{task.description}</p>
                    </div>
                    <div className="border-t-2 "></div>
                    <div className="flex justify-between">
                        <div className="my-2">
                            <p className="font-semibold text-base mb-2">Created on</p>
                            <div className="flex space-x-2">
                            {task.created_at.substring(0, 10)} 
                            </div>
                        </div>
                        <div className="my-2">
                            <p className="font-semibold text-base mb-2">Priority</p>
                            <div className="text-base text-gray-400 font-semibold">
                                <p>{task.priority}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>

    {error && <p>{error}</p>}
</div>

  )
}

export default Tasks;

