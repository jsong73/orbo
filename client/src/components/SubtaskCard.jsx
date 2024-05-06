import React , {useState, useEffect, useRef} from "react";
import CreateSubtaskBtn from "./CreateSubtaskBtn"
import { subtasks } from "../../utils/api";
import DeleteBtn from "./DeleteBtn";
import { motion } from "framer-motion";
import {updateSubTask} from "../../utils/api"
import Auth from "../../utils/auth"


 
function SubtaskCard({ todo, doing, done, taskId }) {

  const token = Auth.getToken()
// console.log(" this is taskId" , taskId)
// console.log("props", todo, doing, done)
const [todoSubtasks, setTodoSubtasks] = useState([]);
const [doingSubtasks, setDoingSubtasks] = useState([]);
const [doneSubtasks, setDoneSubtasks] = useState([]);
const [loading, setLoading] = useState(true)

const constraintsRef = useRef(null);


useEffect(() => {
  const getSubtasks = async () => {

    try {

      if(!taskId) {
        setLoading(false)
        return;
      }
  
        const subtasksData = await subtasks(taskId, token);
        // console.log("subtasksData", subtasksData)

      if(typeof subtasksData.message === "string"){
        setTodoSubtasks([])
        setDoingSubtasks([])
        setDoneSubtasks([])
      } else {
    
        const todo = [];
        const doing = [];
        const done = [];

      
        subtasksData.forEach(subtask => {
          switch (subtask.status) {
            case "To Do":
              todo.push(subtask);
              // console.log("todos", todo)
              break;
            case "Doing":
              doing.push(subtask);
              // console.log("doing", doing)
              break;
            case "Done":
              done.push(subtask);
              // console.log("done", done)
              break;
            default:
              // console.log("status", subtask.status);
          }
        });

        setTodoSubtasks(todo);
        setDoingSubtasks(doing);
        setDoneSubtasks(done);
        setLoading(false);
      }
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  
  }
  getSubtasks()
},[taskId])


// const handleDrag = async (subtaskId, newStatus) => {

//   const draggedSubtask = todoSubtasks.find((subtask) => subtask.id === subtaskId);
//   console.log("dragged subtask", draggedSubtask)

//   if (draggedSubtask) {
//     try {

//       const updatedSubTask = await updateSubTask(subtaskId, {status: newStatus}, token); 
//       console.log("updated task" , updatedSubTask)
  
//       const updatedTodoSubtasks = todoSubtasks.filter((subtask) => subtask.id !== subtaskId);
//       const updatedDoingSubtasks = doingSubtasks.filter((subtask) => subtask.id !== subtaskId);
//       const updatedDoneSubtasks = doneSubtasks.filter((subtask) => subtask.id !== subtaskId);


//       switch (newStatus) {
//         case "To Do":
//           setTodoSubtasks([...updatedTodoSubtasks, draggedSubtask]);
//           break;
//         case "Doing":
//           setDoingSubtasks([...updatedDoingSubtasks, draggedSubtask]);
//           break;
//         case "Done":
//           setDoneSubtasks([...updatedDoneSubtasks, draggedSubtask]);
//           break;
//         default:
//           break;
//       }
//     } catch (error) {
//       console.log(error);
  
//     }
//   }
// };

if (loading) {
  return (
    <div className="flex items-center justify-center w-full h-full">
	  <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
		 
				<svg fill='none' className="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
					<path clipRule='evenodd'
						d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
						fill='currentColor' fillRule='evenodd' />
				</svg>

		<div>Loading ...</div>
	</div>
</div>
  )
}

return (
    <div>
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">

        <div>
          <h1 className="font-semibold text-xl">{todo}</h1>
          <div className="bg-transparent text-gray-700 ">
            <div className="p-3 relative flex flex-col justify-end "></div>
            {todoSubtasks && todoSubtasks.map((subtask, i ) => (
                <motion.div 
                  key={i}  
                  ref={constraintsRef}
                  drag dragConstraints={constraintsRef}
                  className="p-4 rounded-lg shadow-md bg-black/10 mb-2"
                  onDragEnd={() => handleDrag(subtask.id, "To Do")}
                >
                  <DeleteBtn taskId={taskId} subtaskId={subtask.id}/>
                  <h2 className="text-lg font-semibold">{subtask.title}</h2>
                  {/* <div className="text-sm">{subtask.description}</div> */}
                </motion.div>
            ))}
          </div>
          <CreateSubtaskBtn taskId={taskId} status="To Do" />
        </div>

   
        <div>
          <h1 className="font-semibold text-xl">{doing}</h1>
          <div className="bg-transparent text-gray-700 ">
            <div className="p-3 relative flex flex-col justify-end"></div>
              {doingSubtasks && doingSubtasks.map((subtask, i) => (
              <motion.div 
                key={i}  
                ref={constraintsRef}
                drag dragConstraints={constraintsRef}
                className="p-4 rounded-lg shadow-md bg-black/10 mb-2"
                onDragEnd={() => handleDrag(subtask.id, "Doing")}
               >
                  <DeleteBtn taskId={taskId} subtaskId={subtask.id} />
                  <h2 className="text-lg font-semibold">{subtask.title}</h2>
                  {/* <p className="text-sm">{subtask.description}</p> */}
                </motion.div>
              ))}
          </div>
          <CreateSubtaskBtn taskId={taskId} status="Doing" />
        </div>
 

        <div>
          <h1 className="font-semibold text-xl">{done}</h1>
          <div className=" bg-transparent text-gray-700">
            <div className="p-3 relative flex flex-col justify-end"></div>
              {doneSubtasks && doneSubtasks.map((subtask, i) => (
              <motion.div 
                key={i}  
                ref={constraintsRef}
                drag dragConstraints={constraintsRef}
                className="p-4 rounded-lg shadow-md bg-black/10 mb-2"
                onDragEnd={() => handleDrag(subtask.id, "Done")}
              >
                  <DeleteBtn taskId={taskId} subtaskId={subtask.id}/>
                  <h2 className="text-lg font-semibold">{subtask.title}</h2>
                  {/* <p className="text-sm">{subtask.description}</p> */}
              </motion.div>
              ))}
          </div>
          <CreateSubtaskBtn taskId={taskId} status="Done" />
        </div>


      </div>
    </div>
  );
}

export default SubtaskCard;