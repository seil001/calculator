import React from "react";
import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const getStyleName = (btn) => {
  const className = {
    "=": "equals",
    "*": "opt",
    "-": "opt",
    "+": "opt",
    "/": "opt",
  };
  return className[btn];
};
const Button = ({ value }) => {
  const { calc, setCalc } = useContext(CalcContext);
  console.log(setCalc);
  //User click comma
  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };
  //user click C
  const resetClick = () => {
    setCalc({
      sign: "",
      num: 0,
      res: 0,
    });
  };

  //user Click number
  const handleClickButton = () => {
    const numberString = value.toString();
    let numberValue;
    if (numberString === "0" && calc.num === 0) {
      numberValue = "0";
    } else {
      numberValue = Number(calc.num + numberString);
    }
    setCalc({
      ...calc,
      num: numberValue,
    });
  };

  //user click oteration

  const signClick = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };
  //user click equals

  const equalClick = () => {
    if (calc.res && calc.num) {
      const math = (a, b, sign) => {
        const result = {
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
          "*": (a, b) => a * b,
          "/": (a, b) => a / b,
        };
        return result[sign](a, b);
      };

      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  //user persen click
  const persenClick = () => {
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      sign: "",
    });
  };

  //user click invert button

  const invertClick = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    });
  };

  const handleBtnClick = () => {
    // console.log(value);
    const results = {
      ".": commaClick,
      C: resetClick,
      "/": signClick,
      "*": signClick,
      "-": signClick,
      "+": signClick,
      "=": equalClick,
      "%": persenClick,
      "+-": invertClick,
    };
    if (results[value]) {
      return results[value]();
    } else {
      return handleClickButton();
    }
  };
  return (
    <button onClick={handleBtnClick} className={`${getStyleName(value)}`}>
      {value}
    </button>
  );
};

export default Button;
