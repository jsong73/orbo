import React from "react";
import NewBtn from "../components/NewBtn"

function TaskCard({ todo, doing, done }) {

// console.log("props", todo, doing, done)

return (
    <div>
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">

        <div>
          <h1 className="font-semibold text-xl mb-4">{todo}</h1>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="p-6 relative flex flex-col justify-end"></div>
            <NewBtn />
          </div>
        </div>

   
        <div>
          <h1 className="font-semibold text-xl mb-4">{doing}</h1>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="p-6 relative flex flex-col justify-end"></div>
            <NewBtn />
          </div>
        </div>

        <div>
          <h1 className="font-semibold text-xl mb-4">{done}</h1>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="p-6 relative flex flex-col justify-end"></div>
            <NewBtn/>
          </div>
        </div>


      </div>
    </div>
  );
}

export default TaskCard;