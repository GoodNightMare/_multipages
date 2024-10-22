import React, { useEffect, useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [operand1, setOperand1] = useState("");
  const [operand2, setOperand2] = useState("");
  const [operatorSign, setOperatorSign] = useState("");
  const [lastPress, setLastPress] = useState("");
  const [btnClearText, setBtnClearText] = useState("AC");

  const clearAll = () => {
    setDisplayValue("0");
    setOperand1(0);
    setOperand2("");
    setOperatorSign("");
    setBtnClearText("AC");
  };

  const changeOperator = () => {
    setDisplayValue((prevValue) => String(Number(prevValue) * -1));
    if (operand1 === 0) {
      setOperand1(displayValue);
    } else if (operand1 !== "" && operand2 !== "") {
      setOperand2(displayValue);
    }
  };

  const displayNumber = (number) => {
    console.log("เข้ามาล่าสุด = ", number);
    console.log(typeof number);
    console.log(operand1, operand2, operatorSign);

    console.log(lastPress);

    if (lastPress === "equal") {
      setDisplayValue(String(number));
      setOperand2(String(number));
      setLastPress("number");
      console.log("re")
      return;
    }

    if (lastPress === "operator") {
      setDisplayValue(String(number));
      setOperand2(String(number));
      setLastPress("number");
      console.log("re")
      return;
    }

    if (displayValue === "0" && number === 0) {
      console.log("re")
      return;
    }

    if (displayValue === "0" || lastPress === "operator") {
      console.log(displayValue)
      console.log(number)
      setDisplayValue(String(number));
      // setOperand1(String(number));
      // setLastPress("number");        //keyboard error ตรงนี้
    } else {
      setDisplayValue((prevValue) => prevValue + String(number));
    }

    if (operatorSign === "") {
      setOperand1((prevValue) => prevValue + String(number));
    } else {
      setOperand2((prevValue) => prevValue + String(number));
    }

    setLastPress("number");

    console.log(lastPress);
  };

  const handleOperator = (operator) => {
    setOperatorSign(operator);
    console.log("ตัวที่ 1 = ", operand1);
    console.log("ตัวที่ 2 = ", operand2);
    console.log("เครื่องหมาย = ", operatorSign);

    setLastPress("operator");
    console.log(lastPress);

    if(lastPress === "equal"){
      setOperand2("")
      // setDisplayValue("")
      return
    }
    if (lastPress === "number") {
      calculate();
    }
  };

  const calculate = () => {
    let result = 0;
    setLastPress("equal")
    if (operatorSign && operand2 !== "") {
      result = eval(`${operand1} ${operatorSign} ${operand2}`);
      setDisplayValue(String(result));
      setOperand1(result);
      console.log("ตัวที่ 1 = ", operand1);
      console.log("ตัวที่ 2 = ", operand2);
      console.log("เครื่องหมาย = ", operatorSign);
    }
  };


  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        calculate();
        break;
      case "Escape":
        clearAll();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        handleOperator(event.key);
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        displayNumber(Number(event.key));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    
    // ลบ event listener เมื่อ component ถูก unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div id="container-calculator">
      <div id="display">{displayValue}</div>
      <div id="operations">
        <button
          id="btnClear"
          className="button backGroundGray"
          onClick={clearAll}
        >
          {btnClearText}
        </button>
        <button className="button backGroundGray" onClick={changeOperator}>
          +/-
        </button>
        <button
          className="button backGroundGray"
          onClick={() => {
            /* Percent logic here */
          }}
        >
          %
        </button>
        <button
          className="button backGroundOrange"
          onClick={() => handleOperator("/")}
        >
          ÷
        </button>
        <button className="button backGroundBlack" onClick={() => displayNumber(7)}>
          7
        </button>
        <button className="button backGroundBlack" onClick={() => displayNumber(8)}>
          8
        </button>
        <button className="button backGroundBlack" onClick={() => displayNumber(9)}>
          9
        </button>
        <button
          className="button backGroundOrange"
          onClick={() => handleOperator("*")}
        >
          x
        </button>
        <button className="button backGroundBlack" onClick={() => displayNumber(4)}>
          4
        </button>
        <button className="button backGroundBlack" onClick={() => displayNumber(5)}>
          5
        </button>
        <button className="button backGroundBlack" onClick={() => displayNumber(6)}>
          6
        </button>
        <button
          className="button backGroundOrange"
          onClick={() => handleOperator("-")}
        >
          -
        </button>
        <button className="button backGroundBlack" onClick={() => displayNumber(1)}>
          1
        </button>
        <button className="button backGroundBlack" onClick={() => displayNumber(2)}>
          2
        </button>
        <button className="button backGroundBlack" onClick={() => displayNumber(3)}>
          3
        </button>
        <button
          className="button backGroundOrange"
          onClick={() => handleOperator("+")}
        >
          +
        </button>
        <button className="button backGroundBlack zero" onClick={() => displayNumber(0)}>
          0
        </button>
        <button className="button backGroundBlack" onClick={() => displayNumber(".")}>
          .
        </button>
        <button className="button backGroundOrange" onClick={calculate}>
          =
        </button>
      </div>
    </div>
  );
}
