import React, { useEffect, useState } from "react";
import "./timer.css";

const Timer = ({value,name}) => {
  const [time, setTime] = React.useState(0);
  const [runTime, setRunTime] = React.useState(null);

  const [running,setRunning] = useState(false)
  console.log(running)

  const countTimer = () => {
    if(!runTime){
        const newRunTime = setInterval(() => {
            setTime((time) => time + 1);
          }, 1000);
          setRunTime(newRunTime);
        }
  };
  const resetTimer = () => {
    setTime(0);
    clearInterval(runTime);
    setRunTime(null);
  };
  const stopTimer = () => {
    if(runTime){
      clearInterval(runTime);
      setRunTime(null);
    }
  };

  const runClick = () => {
    setRunning(!running)
    if(running){
      stopTimer()
    } else {
      countTimer()
    }
  }

  useEffect(()=>{
    setTime(value)
  },[value])     //[] ทำตอนโหลดครั้งแรก

  const changeTime = (time) => {
    const MINUTE_SECOND = 60;
    const HOUR_SECOND = 3600;
    const DAY_SECOND = 86400;

    let days = Math.floor(time / DAY_SECOND);
    let hours = Math.floor((time % DAY_SECOND) / HOUR_SECOND);
    let minutes = Math.floor((time % HOUR_SECOND) / MINUTE_SECOND);
    let seconds = time % MINUTE_SECOND;
    
    if(days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s `
    }
    else if(hours > 0){
      return `${hours}h ${minutes}m ${seconds}s `
    }
    else if(minutes > 0){
      return `${minutes}m ${seconds}s `
    }
    else {
      return `${seconds}s`
    }
  }
  
  return (
    <>
      <div className="timer mb-3">
        <div>
          <p className="text-body fs-1 text-center">{name ? name: 'aiai'}
          {name ? "aiai": name }</p>
        </div>
        <div className="time text-danger text-center">-{time}-</div>
        <div className="text-center">Time : {changeTime(time)}</div>
        <div className="buttons">
          <button className="btn btn-secondary" onClick={resetTimer}>Reset</button>
          <button className={"btn " + (running ? 'btn-warning' : 'btn-success')} onClick={()=>{runClick()}}>{running ? 'PAUSE' : 'RUN'}</button>
        </div>
      </div>
    </>
  );
};

export default Timer;
