import React , {useEffect, useState}from "react";
import { task } from "../../utils/api"
import Auth from "../../utils/auth"
import { useParams } from "react-router-dom"
import SubtaskCard from "../components/SubtaskCard"

function TaskId() {

    const [taskIdData, setTaskIdData ]= useState([])
    const [error, setError] = useState("")

    const { id } = useParams()

    useEffect(()=> {
        const getOneTask = async (taskId) => {
            try{
                const token = Auth.getToken();
                // console.log("task id", taskId)
                const response = await task(taskId, token);
                console.log("response", response)

                if (typeof response.message === "string") {
                    setError(response.message);
                    setTaskIdData([]); 
                  } else {
                    console.log("taskIdData:", taskIdData);

                setTaskIdData(response);
                setError("");
                }
            }catch(error){
                console.log(error)
            }
        }
        getOneTask(id)
    }, [id])


return (
<div>


<section className="container mx-auto px-8 py-8 lg:py-10">

    
   <h2 className="font-sans text-4xl font-semibold text-blue-gray-900 lg:!text-4xl">{taskIdData.title}</h2>
    <p className="font-sans text-xl  leading-relaxed text-inherit mt-2 w-full font-normal !text-gray-500 lg:w-5/12">{taskIdData.description}</p>


    <div className="flex space-x-2 mt-2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p className="font-sans">{taskIdData.category}</p>
    </div>


    <p className="text-sm mt-3">Click <b>+ New</b> to create a new task directly on this board.</p>
    <p className="text-sm">Click an existing task to add additional context or subtasks.</p>

    
    <SubtaskCard todo="To Do"
                doing="Doing"
                done="Done"  
    />



</section>

</div>

  )
}

export default TaskId;