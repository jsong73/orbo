import React from "react";

function Calender() {

  const currentDate = new Date();
  console.log("date", currentDate)
  const numericalMonth = currentDate.getMonth() + 1;
  const textMonth = currentDate.toLocaleString('default', { month: 'long' });

  const daysInMonth = new Date(currentDate.getFullYear(), numericalMonth, 0).getDate();

  const monthDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    monthDays.push(i);
  }

  return (
    <div>
      <div className="flex justify-center mt-20">
      <div className="w-1/2 max-w-screen-4xl mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <div className="flex items-center text-gray-900">
            <div className="flex-auto text-sm font-semibold">{textMonth}</div>

          </div>
          <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            {monthDays.map((day) => (
              <button key={day} type="button" className="py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10">
                <time className="mx-auto flex h-7 w-7 items-center justify-center rounded-full" dateTime={`${currentDate.getFullYear()}-${numericalMonth}-${day}`}>
                  {day}
                </time>
              </button>
            ))}
          </div>
          <button type="button" className="mt-8 w-full rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add event</button>
        </div>
      </div>
    </div>
  )
}

export default Calender;