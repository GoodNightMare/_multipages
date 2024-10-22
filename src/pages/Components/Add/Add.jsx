import React, { useEffect, useState } from "react";
import Variable from "../Variable/Variable";

function Add({ aValue, bValue ,name}) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  useEffect(() => {
    setA(aValue || 0);
    setB(bValue || 0);
  }, [aValue, bValue]);

  return (
    <>
      <div className="p-3 rounded-4 mb-3 " style={{backgroundColor:"gray"}}>
        <div className="fs-1 fw-bold text-center text-bg-light rounded">
          <p>{name}</p>
        </div>
        <div className="d-flex justify-content-around fs-3 fw-bold">
          <span className="bg-danger rounded p-3 ">A = {a}</span>
          <span className="bg-info rounded p-3">B = {b}</span>
          <span className="bg-warning rounded p-3">A + B = {a + b}</span>
        </div>
        <div className="d-flex justify-content-around ">
          <Variable type={"int"} name={"A"} value={a} setValue={setA} />
          <Variable type={"int"} name={"B"} value={b} setValue={setB} />
        </div>
      </div>
    </>
  );
}

export default Add;
