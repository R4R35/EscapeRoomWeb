'use client'
import React, {useState} from 'react'

const MainPage = () => {

  const rooms = ['cafeteria', 'debara', 'hallway', 'experiment_room', 'greenhouse']

  const [cameraIndex, setCameraIndex] = useState(0);

  const currentRoom = rooms[cameraIndex];

  const goToPrevious = () =>{
    if(cameraIndex > 0) {setCameraIndex(cameraIndex - 1);}
    else {
      setCameraIndex(rooms.length-1);
    }
  }

  const goToNext = ()=>{
    if(cameraIndex < rooms.length - 1) {setCameraIndex(cameraIndex + 1);}
    else {
      setCameraIndex(0);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center gap-6 w-screen h-screen bg-black">
      
      <div className="relative w-[75%] h-[70%] border border-gray-800 bg-[#0d1117] rounded-2xl shadow-2xl overflow-hidden">
        <button 
        onClick={() => goToPrevious()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/50 hover:text-white transition-all"
      >
      {"<"}
    </button>
<div className="absolute inset-0 flex items-center justify-center text-gray-500">
          {currentRoom}
        </div>
<button 
  onClick={() => goToNext()}
  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/50 hover:text-white transition-all"
>
  {">"}
</button>
        
      </div>

      <div className="flex items-center p-3 gap-4 w-fit max-w-[90%] h-[12%] bg-gray-900/50 border border-gray-800 rounded-2xl overflow-x-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((slot) => (
          <div 
            key={slot} 
            className="aspect-square h-full flex-shrink-0 bg-gray-800/80 rounded-xl border border-gray-700 hover:border-blue-500 transition-all cursor-pointer"
          ></div>
        ))}
      </div>

    </main>
  )
}

export default MainPage