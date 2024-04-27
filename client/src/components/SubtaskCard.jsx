import React , {useState, useEffect} from "react";
import CreateSubtaskBtn from "./CreateSubtaskBtn"
import Auth from "../../utils/auth"
import { subtasks } from "../../utils/api";

function SubtaskCard({ todo, doing, done, taskId }) {
console.log("  this is taskId" , taskId)
// console.log("props", todo, doing, done)
const [todoSubtasks, setTodoSubtasks] = useState([]);
const [doingSubtasks, setDoingSubtasks] = useState([]);
const [doneSubtasks, setDoneSubtasks] = useState([]);


useEffect(() => {
  const getSubtasks = async () => {

    try {
      const token = Auth.getToken();
  

        const todoSubtasksData = await subtasks(taskId, token);
        // const doingSubtasksData = await subtasks(taskId, "Doing", token);
        // const doneSubtasksData = await subtasks(taskId, "Done", token);
        
        console.log("to dos", todoSubtasksData)
        // console.log("doing", doingSubtasksData)
        // console.log("done", doneSubtasksData)

        setTodoSubtasks(todoSubtasksData)

    } catch (error) {
      console.log(error)
    }
  
  }
  getSubtasks()
},[taskId])


return (
    <div>
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">

        <div>
          <h1 className="font-semibold text-xl mb-4">{todo}</h1>
          <div className="relative rounded-md flex flex-col bg-clip-border bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="p-6 relative flex flex-col justify-end"></div>
            {todoSubtasks && todoSubtasks.map((subtask, i ) => (
              <div key={i}>{subtask.title}</div>
            ))}
          </div>
          <CreateSubtaskBtn taskId={taskId} status="To Do" />
        </div>

   
        <div>
          <h1 className="font-semibold text-xl mb-4">{doing}</h1>
          <div className="relative rounded-md flex flex-col bg-clip-border bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden ">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="p-6 relative flex flex-col justify-end"></div>
     
          </div>
          <CreateSubtaskBtn taskId={taskId} status="Doing" />
        </div>
 

        <div>
          <h1 className="font-semibold text-xl mb-4 ">{done}</h1>
          <div className="relative rounded-md flex flex-col bg-clip-borderbg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden">
            <div className="absolute inset-0 bg-black/10 "></div>
            <div className="p-6 relative flex flex-col justify-end"></div>

          </div>
          <CreateSubtaskBtn taskId={taskId} status="Done" />
        </div>


      </div>
    </div>
  );
}

export default SubtaskCard;