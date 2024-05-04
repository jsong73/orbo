import React , {useState, useEffect} from "react";
import CreateSubtaskBtn from "./CreateSubtaskBtn"
import Auth from "../../utils/auth"
import { subtasks } from "../../utils/api";

function SubtaskCard({ todo, doing, done, taskId }) {
// console.log(" this is taskId" , taskId)
// console.log("props", todo, doing, done)
const [todoSubtasks, setTodoSubtasks] = useState([]);
const [doingSubtasks, setDoingSubtasks] = useState([]);
const [doneSubtasks, setDoneSubtasks] = useState([]);
const [loading, setLoading] = useState(true)


useEffect(() => {
  const getSubtasks = async () => {

    try {

      if(!taskId) {
        setLoading(false)
        return;
      }

      const token = Auth.getToken();
  
        const subtasksData = await subtasks(taskId, token);
        console.log("subtasksData", subtasksData)

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

    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  
  }
  getSubtasks()
},[taskId])


if (loading) {
  return (
    <div class="flex items-center justify-center w-full h-full">
	  <div class="flex justify-center items-center space-x-1 text-sm text-gray-700">
		 
				<svg fill='none' class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
					<path clip-rule='evenodd'
						d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
						fill='currentColor' fill-rule='evenodd' />
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
          <h1 className="font-semibold text-xl mb-4">{todo}</h1>
          <div className="relative rounded-md flex flex-col bg-clip-border bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="p-6 relative flex flex-col justify-end "></div>
            {todoSubtasks && todoSubtasks.map((subtask, i ) => (
                <div key={i}
                  className="p-4 rounded-lg shadow-md border"
                >
                  <h2 className="text-lg font-semibold">{subtask.title}</h2>
                  <div className="text-sm">{subtask.description}</div>
              </div>
            ))}
          </div>
          <CreateSubtaskBtn taskId={taskId} status="To Do" />
        </div>

   
        <div>
          <h1 className="font-semibold text-xl mb-4">{doing}</h1>
          <div className="relative rounded-md flex flex-col bg-clip-border bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden ">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="p-6 relative flex flex-col justify-end"></div>
              {doingSubtasks && doingSubtasks.map((subtask, i) => (
                <div key={i}
                className="p-4 rounded-lg shadow-md border"
                >
                  <h2 className="text-lg font-semibold">{subtask.title}</h2>
                  <p className="text-sm">{subtask.description}</p>
              </div>
              ))}
          </div>
          <CreateSubtaskBtn taskId={taskId} status="Doing" />
        </div>
 

        <div>
          <h1 className="font-semibold text-xl mb-4 ">{done}</h1>
          <div className="relative rounded-md flex flex-col bg-clip-borderbg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden">
            <div className="absolute inset-0 bg-black/10 "></div>
            <div className="p-6 relative flex flex-col justify-end"></div>
              {doneSubtasks && doneSubtasks.map((subtask, i) => (
                <div key={i}>
                    <p>{subtask.title}</p>
                    <p>{subtask.description}</p>
                </div>
              ))}
          </div>
          <CreateSubtaskBtn taskId={taskId} status="Done" />
        </div>


      </div>
    </div>
  );
}

export default SubtaskCard;