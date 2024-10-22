import React from "react";
import Variable from "../Variable/Variable";

function Temperature({ cValue ,name }) {

    const [celsius, setCelsius] = React.useState(cValue);
    const [fahrenheit, setFahrenheit] = React.useState(cValue * 1.8 + 32);
    const [kelvin, setKelvin] = React.useState(cValue + 273.15);

    // React.useEffect(() => {
    //     setCelsius(celsius);
    //     setFahrenheit(celsius * 1.8 + 32);
    //     setKelvin(celsius + 273.15);
    // }, [celsius]);

    const upCelsius = (celsius) => {
        setCelsius(celsius);
        setFahrenheit(celsius * 1.8 + 32);
        setKelvin(celsius + 273.15);
    }

    const updateCelsiusToFahrenheit = (fahrenheit) => {
        setFahrenheit(fahrenheit);
        setCelsius((fahrenheit - 32) / 1.8);
        setKelvin((fahrenheit - 32) / 1.8 + 273.15);
    }
    const updateCelsiusToKelvin = (kelvin) => {
        setKelvin(kelvin);
        setCelsius(kelvin - 273.15);
        setFahrenheit((kelvin - 273.15) * 1.8 + 32);
    }
    
  return (
    <div className="bg-secondary rounded-3">
      <div>
        <h3 className="p-3 fs-1 fw-bold rounded-4 text-center">{name}</h3>
      </div>
      <div>
        <div className="d-flex justify-content-around ">
          <h3 className="bg-white p-3 fw-bold rounded-4">{celsius.toFixed(2)} C</h3>
          <h3 className="bg-white p-3 fw-bold rounded-4">{fahrenheit.toFixed(2)} F</h3>
          <h3 className="bg-white p-3 fw-bold rounded-4">{kelvin.toFixed(2)} K</h3>
        </div>
      </div>
      <div className="d-flex justify-content-around ">
        <Variable name={"CELSIUS"} value={celsius} setValue={upCelsius} />
        <Variable name={"FAHRENHEIT"} value={fahrenheit} setValue={updateCelsiusToFahrenheit} />
        <Variable name={"KELVIN"} value={kelvin} setValue={updateCelsiusToKelvin } />
      </div>
    </div>
  );
}

export default Temperature;
