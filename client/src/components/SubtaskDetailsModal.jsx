import React from "react";
import { TbStatusChange } from "react-icons/tb";
import DeleteBtn from "./DeleteBtn";

function SubtaskDetailsModal({showDetailsModal, setShowDetailsModal, subtask}) {

// console.log("subtask being passed down?", subtask)

    const handleClose = () => {
        setShowDetailsModal(false)
    }


  return (
    <>
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="flex justify-end items-center min-h-screen">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-xl">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl">
                  <div className="flex items-center justify-between px-4">

                <div className="ml-2 mt-8 text-3xl font-bold border-none w-full h-20" >
                    {subtask.title}
                </div>
                

                {/* close button */}
                <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                    <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
                </div>



                <div className="mt-4 flex flex-col-2 ml-8">
                        <div className="flex items-center">
                            <TbStatusChange  className="mr-2 text-gray-400" />
                            <p className="text-gray-400">Current Status</p>
                            <div className="ml-20">{subtask.status}</div>
                        </div>
                    
                    </div>


                <div className="ml-2 mt-4 px-4 h-full">
                    <h2 className="mt-8 font-semibold text-xl !text-gray-500">Description</h2>
                    <div className="mt-8">{subtask.description}</div>


              

                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
);
}

export default SubtaskDetailsModal;