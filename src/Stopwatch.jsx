import React, { useState, useEffect, useRef } from 'react';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [LapTimes, setLapTimes] = useState([]);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    if (!isRunning) {
      // Jika stopwatch tidak berjalan, atur startTimeRef dan mulai dari 0.
      setElapsedTime(0);
      startTimeRef.current = Date.now();
    }
    setIsRunning(true);
  }
  

  function pause() {
    setIsRunning(false);
    setLapTimes([...LapTimes, formatTime()])
  }

  function resume() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
    setLapTimes([]);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    return `${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-blue-300 min-h-screen">
      <div className="flex flex-col justify-center items-center border-4 border-white rounded-3xl bg-blue-200 p-8">
        <div className="text-5xl font-mono font-bold text-black mb-6 shadow-lg">{formatTime()}</div>
        <div className="flex gap-3">
          <button onClick={start} className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg hover:scale-110 transition-transform">Start</button>
          <button onClick={pause} className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg hover:scale-110 transition-transform">Pause</button>
          <button onClick={resume} className="bg-yellow-400 text-white font-bold px-4 py-2 rounded-lg hover:scale-110 transition-transform">Resume</button>
          <button onClick={reset} className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:scale-110 transition-transform">Reset</button>
        </div>
        <div className='mt-5 w-full max-h-40 overflow-y-auto'>
        <h3 className='text-center font-bold text-xl text-slate-700 mb-2'>Lap Times</h3>
        <ul className=' list-disc pl-5'>
            {LapTimes.map((lap, index) =>(
                <li key={index} className='text-lg text-slate-600'>{lap}</li>
            ))}
        </ul>
      </div>
      </div>
    </div>
  );
}

export default Stopwatch;
