import React , {useState}from "react";
import SubtaskModal from "./SubtaskModal";

function NewBtn() {

  const [ showModal, setModal ] = useState(false)

  const handleClick = () => {
    setModal(true)

  }


  return (
    <div>

      <button  
        onClick={handleClick} 
        className="bg-clip-border rounded-md bg-transparent text-gray-700 w-full flex items-center justify-start px-4 py-2 hover:shadow-md"> 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /> 
        </svg> 
        <span className="ml-1 font-bold">New</span>
      </button>

      <SubtaskModal showModal={showModal} setModal={setModal} />
    </div>
  )
}

export default NewBtn;