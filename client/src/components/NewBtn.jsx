import React from "react";

function NewBtn() {


  return (
    <div>
      <button className="flex items-center mb-3 ml-4 "> 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /> 
        </svg> 
        <span className="ml-1 font-bold">New</span>
      </button>
    </div>
  )
}

export default NewBtn;