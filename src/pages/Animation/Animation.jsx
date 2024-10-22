import React, { useEffect, useState } from 'react'
import './Animation.css'

import Basketball from '../../../public/forAnimation/basketball.png'
import Football from '../../../public/forAnimation/football.png'
import Vollyball from '../../../public/forAnimation/volleyball.png'
import Human from '../../../public/forAnimation/human.jpg'
import Cartoon from '../../../public/forAnimation/cartoon.png'
import Logo from '../../../public/forAnimation/myLogo.png'

function Animation() {
  const [balls, setBalls] = useState([
    { x: 0, y: 0, vx: 5, vy: 5, goRight: true, goDown: true, rotateDirection: 0, mathRandom: 0, id: "ball1" }
  ]);
  const [runing, setRunning] = useState(true);
  const [activeBtn, setActiveBtn] = useState("1");
  
  let fieldWidth = 800;
  let fieldHeight = 400;
  let ballSize = 100;
  const maxLeft = fieldWidth - ballSize - 2;
  const maxTop = fieldHeight - ballSize - 2;

  useEffect(() => {
    const interval = setInterval(() => process(), 25);
    return () => clearInterval(interval);
  }, [balls, runing]);

  const runClick = () => setRunning(!runing);

  const calculate = () => {
    setBalls(balls.map(ball => {
      if (ball.goRight) {
        ball.x += ball.vx;
        if (ball.x >= maxLeft) {
          ball.x = maxLeft;
          ball.goRight = false;
          randomSpeed(ball);
        }
      } else {
        ball.x -= ball.vx;
        if (ball.x <= 0) {
          ball.x = 0;
          ball.goRight = true;
          randomSpeed(ball);
        }
      }
      if (ball.goDown) {
        ball.y += ball.vy;
        if (ball.y >= maxTop) {
          ball.y = maxTop;
          ball.goDown = false;
          randomSpeed(ball);
        }
      } else {
        ball.y -= ball.vy;
        if (ball.y <= 0) {
          ball.y = 0;
          ball.goDown = true;
          randomSpeed(ball);
        }
      }
      randomRotate(ball);
      return ball;
    }));
  };

  const randomRotate = (ball) => {
    if(ball.x >= maxLeft || ball.x <= 0 || ball.y >= maxTop || ball.y <= 0){
      const speedRotate = Math.floor(Math.random() * 10) + 1;
      ball.rotateDirection = Math.random() > 0.5 ? speedRotate : -speedRotate;
    }
    ball.mathRandom += ball.rotateDirection;
  };

  const randomSpeed = (ball) => {
    // Check which side the ball hit, then randomize its speed on that axis
    if (ball.x >= maxLeft || ball.x <= 0) {
      ball.vx = Math.floor(Math.random() * 10) + 2; // Random speed between 2 and 12 on the X-axis
    } else if (ball.y >= maxTop || ball.y <= 0) {
      ball.vy = Math.floor(Math.random() * 10) + 2; // Random speed between 2 and 12 on the Y-axis
    }
  };
  
  const renderImg = (img, button) => {
    setActiveBtn(button);
    setBalls(balls.map((ball) => {
      const ballElement = document.getElementById(ball.id);
      if (img === undefined || img === "-") {
        ballElement.style.backgroundImage = "none";
      } else {
        ballElement.style.backgroundImage = `url(${img})`;
      }
      return ball;
    }));
  };
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      // setKey(event.key);
      switch (event.key) {
        case " ":
          runClick();
          break;
        case "0":
          renderImg("-");
          setActiveBtn("0");
          break;
        case "1":
          renderImg(Basketball);
          setActiveBtn("1");
          break;
        case "2":
          renderImg(Football);
          setActiveBtn("2");
          break;
        case "3":
          renderImg(Vollyball);
          setActiveBtn("3");
          break;
        case "4":
          renderImg(Human);
          setActiveBtn("4");
          break;
        case "5":
          renderImg(Cartoon);
          setActiveBtn("5");
          break;
        case "6":
          renderImg(Logo);
          setActiveBtn("6");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []); 

  const process = () => {
    if (runing) {
      calculate();
    }
  };

  useEffect(() => {
    renderImg(Basketball);
  }, []);

  return (
    <div id="container-animation">
      <div id="field" style={{ width: fieldWidth, height: fieldHeight }}>
        {balls.map(ball => (
          <div
            key={ball.id}
            id={ball.id}
            className="ball"
            style={{
              width: ballSize,
              height: ballSize,
              left: ball.x,
              top: ball.y,
              transform: `rotate(${ball.mathRandom}deg)`
            }}
          />
        ))}
      </div>
      <div id="control">
        <button onClick={runClick} className={`btn btn-lg ${runing ? 'btn-danger' : 'btn-success'}`}>
          <i className={`bi ${runing ? 'bi-stop-fill' : 'bi-play'}`}></i>
          {runing ? 'PAUSE' : 'RUN'}
        </button>
        <label onClick={() => renderImg('-','0')} className={"btn btn-lg " + (activeBtn === "0" ? "btn-info" : "btn-outline-info")}>NONE</label>
        <label onClick={() => renderImg(Basketball,"1")} className={"btn btn-lg " + (activeBtn === "1" ? "btn-danger" : " btn-outline-danger") }>BASKETBALL</label>
        <label onClick={() => renderImg(Football,"2")} className={"btn btn-lg " + (activeBtn === "2" ? "btn-secondary" : "btn-outline-secondary") } >FOOTBALL</label>
        <label onClick={() => renderImg(Vollyball,"3")} className={"btn btn-lg " + (activeBtn === "3" ? "btn-warning" : "btn-outline-warning") } >VOLLEYBALL</label>
        <label onClick={() => renderImg(Human,"4")} className={"btn btn-lg " + (activeBtn === "4" ? "btn-info" : "btn-outline-info") } >HUMAN</label>
        <label onClick={() => renderImg(Cartoon,"5")} className={"btn btn-lg " + (activeBtn === "5" ? "btn-dark" : "btn-outline-dark") } >CARTOON</label>
        <label onClick={() => renderImg(Logo,"6")} className={"btn btn-lg " + (activeBtn === "6" ? "btn-primary" : "btn-outline-primary") } >LOGO</label>
      </div>
    </div>
  );
};


export default Animation