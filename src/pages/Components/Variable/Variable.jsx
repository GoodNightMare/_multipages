import React from "react";

function Variable({type, name, value, setValue }) {
  return (
    <>
      <div className="bg-body-secondary p-3 rounded m-1 fw-bold">
        <div className="fs-3 text-primary-emphasis text-center">{name}</div>
        <div className=" text-info-emphasis d-flex justify-content-around">
          <button
            className="btn btn-light m-2 text-danger fw-bold fs-3"
            onClick={() => setValue(value - 1)}
          >
            -
          </button>
          <p className=" fs-3 m-3 text-body-tertiary fw-bold">
            {type && type === 'int' ? value : value.toFixed(2)}
          </p>
          <button
            className="btn btn-light m-2 text-success fw-bold fs-3"
            onClick={() => setValue(value + 1)}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}

export default Variable;
