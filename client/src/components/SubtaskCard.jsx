import React , {useState, useEffect, useRef} from "react";
import CreateSubtaskBtn from "./CreateSubtaskBtn"
import { subtasks , updateSubTask } from "../../utils/api";
import DeleteBtn from "./DeleteBtn";
import Auth from "../../utils/auth"
import { BiMessageRoundedDots } from "react-icons/bi";
import SubtaskDetailsModal from "./SubtaskDetailsModal";
 
function SubtaskCard({ todo, doing, done, taskId }) {

  const token = Auth.getToken()
// console.log(" this is taskId" , taskId)
// console.log("props", todo, doing, done)
const [todoSubtasks, setTodoSubtasks] = useState([]);
const [doingSubtasks, setDoingSubtasks] = useState([]);
const [doneSubtasks, setDoneSubtasks] = useState([]);
const [loading, setLoading] = useState(true)
const [selectedSubtask, setSelectedSubtask] = useState(null); 
const [showDetailsModal, setShowDetailsModal] = useState(false); 


useEffect(() => {
  const getSubtasks = async () => {

    try {

      if(!taskId) {
        setLoading(false)
        return;
      }
      const token = Auth.getToken()
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

const handleShowDetails = (subtask) => {
  setSelectedSubtask(subtask); 
  setShowDetailsModal(true); 
}



return (
    <div>
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">

        <div>
          <h1 className="font-semibold text-xl">{todo}</h1>
          <div className="bg-transparent text-gray-700 ">
            <div className="p-3 relative flex flex-col justify-end "></div>
            {todoSubtasks && todoSubtasks.map((subtask, i ) => (
                <div 
                  key={i}  
                  className="p-4 rounded-lg shadow-md bg-black/10 mb-2"
                >
                  <DeleteBtn taskId={taskId} subtaskId={subtask.id}/>
                    <h2  
                    onClick={() => handleShowDetails(subtask)}
                    className="text-lg font-semibold">{subtask.title}</h2>       
                  {subtask.description && (
                    <div>
                      <BiMessageRoundedDots  />
                    </div>
                  )}
           
                </div>
            ))}
          </div>
          <CreateSubtaskBtn taskId={taskId} status="To Do" />
        </div>

   
        <div>
          <h1 className="font-semibold text-xl">{doing}</h1>
          <div className="bg-transparent text-gray-700 ">
            <div className="p-3 relative flex flex-col justify-end"></div>
              {doingSubtasks && doingSubtasks.map((subtask, i) => (
                <div 
                key={i}  
                className="p-4 rounded-lg shadow-md bg-black/10 mb-2"
                >
                  <DeleteBtn taskId={taskId} subtaskId={subtask.id} />
                    <h2 
                     onClick={() => handleShowDetails(subtask)}
                    className="text-lg font-semibold">{subtask.title}</h2>
                  {subtask.description && (
                    <div>
                      <BiMessageRoundedDots  />
                    </div>
                  )}
                </div>
              ))}
          </div>
          <CreateSubtaskBtn taskId={taskId} status="Doing" />
        </div>
 

        <div>
          <h1 className="font-semibold text-xl">{done}</h1>
          <div className=" bg-transparent text-gray-700">
            <div className="p-3 relative flex flex-col justify-end"></div>
              {doneSubtasks && doneSubtasks.map((subtask, i) => (
                <div 
                key={i}  
                className="p-4 rounded-lg shadow-md bg-black/10 mb-2"
              >
                  <DeleteBtn taskId={taskId} subtaskId={subtask.id}/>
                    <h2 
                    onClick={() => handleShowDetails(subtask)}
                    className="text-lg font-semibold">{subtask.title}</h2>
                  {subtask.description && (
                    <div>
                      <BiMessageRoundedDots  />
                    </div>
                  )}
              </div>
              ))}
          </div>
          <CreateSubtaskBtn taskId={taskId} status="Done" />
        </div>

        <SubtaskDetailsModal
        showDetailsModal={showDetailsModal}
        setShowDetailsModal={setShowDetailsModal}
        subtask={selectedSubtask}
      />

      </div>
    </div>
  );
}

export default SubtaskCard;