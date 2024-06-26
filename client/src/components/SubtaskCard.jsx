import React , {useState, useEffect} from "react";
import CreateSubtaskBtn from "./CreateSubtaskBtn"
import { subtasks , updateSubTask } from "../../utils/api";
import DeleteBtn from "./DeleteBtn";
import Auth from "../../utils/auth"
import { BiMessageRoundedDots } from "react-icons/bi";
import SubtaskDetailsModal from "./SubtaskDetailsModal";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function SubtaskCard({ todo, doing, done, taskId }) {

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

      if(typeof subtasksData.message === "string" ){
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
  // console.log("whats returning", subtask)
}

const onDragEnd = async (result) => {
  const { source, destination } = result;

  if (!destination) {
    return;
  }

  const originalColumn = source.droppableId;
  // console.log("original column:", originalColumn);
  const destinationColumn = destination.droppableId;
  // console.log("destination", destinationColumn)
  const subtaskId = result.draggableId;
  // console.log("subtask ID", subtaskId)

  const updatedSubtasks = {
    "To Do": [...todoSubtasks],
    "Doing": [...doingSubtasks],
    "Done": [...doneSubtasks]
  };

  // console.log("updated task:", updatedSubtasks)
  // console.log("does this match the subtaskID?", updatedSubtasks[originalColumn])
  const movedSubtask = updatedSubtasks[originalColumn].find(subtask => subtask.id.toString() === subtaskId);
  // console.log("moved subtask:", movedSubtask)
  const movedSubtaskIndex = updatedSubtasks[originalColumn].indexOf(movedSubtask);
  updatedSubtasks[originalColumn].splice(movedSubtaskIndex, 1);
  // console.log("moved subtask index:", movedSubtaskIndex)

  movedSubtask.status = destinationColumn;


  updatedSubtasks[destinationColumn].push(movedSubtask);

  setTodoSubtasks([...updatedSubtasks["To Do"]]);
  setDoingSubtasks([...updatedSubtasks["Doing"]]);
  setDoneSubtasks([...updatedSubtasks["Done"]]);

  const token = Auth.getToken();
  await updateSubTask(taskId, subtaskId, destinationColumn, token);
};

return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">

        <div>
          <h1 className="font-semibold text-xl">To Do</h1>
          <Droppable droppableId="To Do">
          {(provided) => ( 
          <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className="bg-transparent text-gray-700 ">
            <div className="p-3 relative flex flex-col justify-end "></div>
            {todoSubtasks && todoSubtasks.map((subtask, index ) => (
              <Draggable key={subtask.id.toString()} draggableId={subtask.id.toString()} index={index}>
                 {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
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
                 )}
                </Draggable>
               ))}
              {provided.placeholder}
            </div>
          </div>
          )}
          </Droppable>
          <CreateSubtaskBtn taskId={taskId} status="To Do" />
        </div>

   
        <div>
          <h1 className="font-semibold text-xl">Doing</h1>
          <Droppable droppableId="Doing">
          {(provided) => ( 
          <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className="bg-transparent text-gray-700 ">
            <div className="p-3 relative flex flex-col justify-end "></div>
            {doingSubtasks && doingSubtasks.map((subtask, index) => (
              <Draggable key={subtask.id.toString()} draggableId={subtask.id.toString()} index={index}>
                 {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
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
                 )}
                </Draggable>
               ))}
              {provided.placeholder}
            </div>
          </div>
          )}
          </Droppable>
          <CreateSubtaskBtn taskId={taskId} status="Doing" />
        </div>
 
        <div>
          <h1 className="font-semibold text-xl">Done</h1>
          <Droppable droppableId="Done">
          {(provided) => ( 
          <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className="bg-transparent text-gray-700 ">
            <div className="p-3 relative flex flex-col justify-end "></div>
            {doneSubtasks && doneSubtasks.map((subtask, index) => (
              <Draggable key={subtask.id.toString()} draggableId={subtask.id.toString()} index={index}>
                 {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
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
                 )}
                </Draggable>
               ))}
              {provided.placeholder}
            </div>
          </div>
          )}
          </Droppable>
          <CreateSubtaskBtn taskId={taskId} status="Done" />
        </div>

        <SubtaskDetailsModal
        showDetailsModal={showDetailsModal}
        setShowDetailsModal={setShowDetailsModal}
        subtask={selectedSubtask}
      />

      </div>
      </DragDropContext>
    </div>
  );
}

export default SubtaskCard;