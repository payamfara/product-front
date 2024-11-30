import React, { useState } from "react";
import { FaTrash, FaExpandAlt, FaCompressAlt } from "react-icons/fa"; // آیکون‌ها از Font Awesome
import RippleButton from "../../../../../components/RippleButton/RippleButton";

const AttributeComponent = ({ inputs }) => {
  const [activeRow, setActiveRow] = useState(-1);
  const [inputValues, setInputValues] = useState(() => {
    const initialState = {};
    inputs.forEach((input, rowIndex) => {
      initialState[rowIndex] = {};
      Object.keys(input).forEach((key) => {
        initialState[rowIndex][key] = input[key] || "";
      });
    });
    return initialState;
  });

  const handleInputChange = (e, rowIndex) => {
    const { name, value } = e.target;

    setInputValues((prevValues) => ({
      ...prevValues,
      [rowIndex]: {
        ...prevValues[rowIndex],
        [name]: value,
      },
    }));
  };

  const handleDeleteRow = (rowIndex) => {
    setInputValues((prevValues) => {
      const newValues = { ...prevValues };
      delete newValues[rowIndex];
      return newValues;
    });
  };

  const handleActivateRow = (rowIndex) => {
    setActiveRow((prevActiveRow) => (prevActiveRow === rowIndex ? -1 : rowIndex));
  };

  return (
    <div className="ps-3 d-flex flex-column gap-3">
      {Object.entries(inputValues).map(([rowIndex, rowInputs]) => (
        <div key={rowIndex} className="z-0 card flex-row flex-wrap p-2 gap-2 position-relative">
          <div className="d-flex flex-wrap w-100 row-cols-4">
            {Object.keys(rowInputs).map((name, index) => (
              <div
                key={name}
                className={`p-2 ${activeRow != rowIndex && index > 3 ? "d-none" : ""}`}
              >
                <input
                  type="text"
                  name={name}
                  value={rowInputs[name]}
                  placeholder={name}
                  className="form-control"
                  onChange={(e) => handleInputChange(e, rowIndex)}
                />
              </div>
            ))}
          </div>
          <div className="z-n1 position-absolute d-flex flex-column justify-content-center gap-1 top-0 start-0 h-100 translate-x">
            <RippleButton
              className="pe-auto z-1 btn btn-danger btn-sm p-1 d-flex align-items-center justify-content-center"
              onClick={() => handleDeleteRow(rowIndex)}
              title="Delete"
            >
              <FaTrash size={16} />
            </RippleButton>
            <RippleButton
              className={`pe-auto z-1 btn btn-${activeRow === rowIndex ? "secondary" : "primary"} btn-sm p-1 d-flex align-items-center justify-content-center`}
              onClick={() => handleActivateRow(rowIndex)}
              title={activeRow === rowIndex ? "Hide" : "Expand"}
            >
              {activeRow === rowIndex ? <FaCompressAlt size={16} /> : <FaExpandAlt size={16} />}
            </RippleButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttributeComponent;
