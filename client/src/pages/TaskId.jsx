import React , {useEffect, useState}from "react";
import { task } from "../../utils/api"
import Auth from "../../utils/auth"
import { useParams } from "react-router-dom"

function TaskId() {

    const [taskIdData, setTaskIdData ]= useState([])
    const [error, setError] = useState("")

    const { id } = useParams()

    useEffect(()=> {
        const getOneTask = async (taskId) => {
            try{
                const token = Auth.getToken();
                // console.log("task id", taskId)
                const response = await task(taskId, token);
                console.log("response", response)

                if (typeof response.message === "string") {
                    setError(response.message);
                    setTaskIdData([]); 
                  } else {
                    console.log("taskIdData:", taskIdData);

                setTaskIdData(response);
                setError("");
                }
            }catch(error){
                console.log(error)
            }
        }
        getOneTask(id)
    }, [id])


return (
<div>


<section className="container mx-auto px-8 py-8 lg:py-40">
   <h2 className="font-sans text-4xl font-semibold text-blue-gray-900 lg:!text-4xl">{taskIdData.title}</h2>
    <p className="font-sans text-xl font-normal leading-relaxed text-inherit mt-2 w-full font-normal !text-gray-500 lg:w-5/12">{taskIdData.description}</p>


    <div className="flex space-x-2 mt-2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p className="font-sans">{taskIdData.category}</p>
    </div>


    <p className="text-sm mt-3">Click <b>+ New</b> to create a new task directly on this board.</p>
    <p className="text-sm">Click an existing task to add additional context or subtasks.</p>


    <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">

    
     <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">
       <div className="absolute inset-0 bg-black/70"></div>
       <div className="p-6 relative flex flex-col justify-end">
         <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">Record-breaking Profits</h4>
         <p className="block antialiased font-sans text-base font-light leading-relaxed text-white my-2 font-normal">We are proud to announce that our bank has achieved record-breaking profits this year. Thanks to our dedicated team and loyal customers, we have surpassed all expectations and set new industry standards. Read more to learn about our success story.</p>
       </div>
     </div>

     <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">
       <div className="absolute inset-0 bg-black/70"></div>
       <div className="p-6 relative flex flex-col justify-end">
         <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">Expansion into New Markets</h4>
         <p className="block antialiased font-sans text-base font-light leading-relaxed text-white my-2 font-normal">We are excited to share that our bank has successfully expanded into new markets. With strategic partnerships and innovative solutions, we have established a strong presence in international markets. Learn more about our expansion journey and the opportunities it brings.</p>
      </div>
     </div>

     <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">
       <div className="absolute inset-0 bg-black/70"></div>
       <div className="p-6 relative flex flex-col justify-end">
        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">Digital Transformation Success</h4>
         <p className="block antialiased font-sans text-base font-light leading-relaxed text-white my-2 font-normal">Our bank has undergone a successful digital transformation, revolutionizing the way we serve our customers. From seamless online banking experiences to advanced security measures, we have embraced technology to enhance customer satisfaction. Discover the key milestones of our digital transformation journey.</p>
       </div>
     </div>
</div>
</section>

</div>

  )
}

export default TaskId;