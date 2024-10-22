import React from "react";
import "./counter.css";

const count = 0

function Counter(props) {
    const { name } = props;
  const [count, setCount] = React.useState(props.number);
  return (
    <>
      <div className="counter">
        <h1 className="title">{name}</h1>
        <h3 className="number">Number Start : {props.number}</h3>
        <button className="btn btn-danger" onClick={() => setCount(count - 5)}>-5</button>
        <button className="btn btn-danger m-3" onClick={() => setCount(count - 1)}>-1</button>
        <span className="number-count">{count}</span>
        <button className="btn btn-success m-3" onClick={() => setCount(count + 1)}>+1</button>
        <button className="btn btn-success" onClick={() => setCount(count + 5)}>-5</button>
      </div>
    </>
  );
}

export default Counter;
