import React, {useEffect, useState} from "react";
import Auth from "../../utils/auth"
import { tasks } from "../../utils/api"

function Tasks() {

  const [ taskData, setTaskData ] = useState([])


  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const token = Auth.getToken();
        const response = await tasks(token)
        console.log("response", response)

        
        setTaskData(response)
      }catch(error){
        console.log(error)
      }
    }
    getAllTasks()
  }, [])


  return (
    <div> 
      <h1> Tasks </h1>
        <ul>
          {taskData.map((task, i) => (
            <li key={i}> 
              <p> {task.title} </p>
              <p> {task.description} </p>
              <p> {task.category} </p>
              <p> {task.created_at} </p>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default Tasks;

