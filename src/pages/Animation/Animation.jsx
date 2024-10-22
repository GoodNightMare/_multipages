import React, { useEffect, useState } from 'react'
import './Animation.css'

function Animation() {
  const [balls, setBalls] = useState([
    { x: 0, y: 0, vx: 5, vy: 5, goRight: true, goDown: true, rotateDirection: 0, mathRandom: 0, id: "ball1" }
  ]);
  const [runing, setRunning] = useState(true);
  const [idBall , setIdBall] = useState(1);
  const [key, setKey] = useState("");
  
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
  
  const renderImg = (img) => {
    setBalls(balls.map((ball) => {
      const ballElement = document.getElementById(ball.id);
      if (img === undefined || img === "-") {
        ballElement.style.backgroundImage = "none";
      } else {
        ballElement.style.backgroundImage = `url(./../../../forAnimation/${img})`;
      }
      return ball;
    }));
  };
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      setKey(event.key);
      switch (event.key) {
        case " ":
          runClick();
          break;
        case "0":
          renderImg("-");
          break;
        case "1":
          renderImg("basketball.png");
          break;
        case "2":
          renderImg("football.png");
          break;
        case "3":
          renderImg("volleyball.png");
          break;
        case "4":
          renderImg("human.jpg");
          break;
        case "5":
          renderImg("cartoon.png");
          break;
        case "6":
          renderImg("myLogo.png");
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
    renderImg("basketball.png");
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
        <label onClick={() => renderImg('-')} className="btn btn-lg btn-outline-info">NONE</label>
        <label onClick={() => renderImg('basketball.png')} className="btn btn-lg btn-outline-danger">BASKETBALL</label>
        <label onClick={() => renderImg('football.png')} className="btn btn-lg btn-outline-secondary">FOOTBALL</label>
        <label onClick={() => renderImg('volleyball.png')} className="btn btn-lg btn-outline-warning">VOLLEYBALL</label>
        <label onClick={() => renderImg('human.jpg')} className="btn btn-lg btn-outline-info">HUMAN</label>
        <label onClick={() => renderImg('cartoon.png')} className="btn btn-lg btn-outline-dark">CARTOON</label>
        <label onClick={() => renderImg('myLogo.png')} className="btn btn-lg btn-outline-primary">LOGO</label>
      </div>
    </div>
  );
};


export default Animation