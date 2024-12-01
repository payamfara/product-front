import React, { useState, useImperativeHandle, forwardRef, Fragment } from "react";
import { FaTrash, FaExpandAlt, FaCompressAlt } from "react-icons/fa"; // آیکون‌ها از Font Awesome
import RippleButton from "../../../../../components/RippleButton/RippleButton";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";

const AttributeComponent = forwardRef(({ inputs, struct }, ref) => {
  console.log(struct);
  
  const [activeRow, setActiveRow] = useState(-1);
  const [inputValues, setInputValues] = useState(inputs || []);

  useImperativeHandle(ref, () => ({
    getValues: () => inputValues,
  }));

  const handleInputChange = (e, rowIndex) => {
    const { name, value } = e.target;
    setInputValues((prevValues) =>
      prevValues.map((row, index) =>
        index === rowIndex ? { ...row, [name]: value } : row
      )
    );
  };

  const handleDeleteRow = (rowIndex) => {
    setInputValues((prevValues) =>
      prevValues.filter((_, index) => index !== rowIndex)
    );
  };

  const handleActivateRow = (rowIndex) => {
    setActiveRow((prevActiveRow) =>
      prevActiveRow === rowIndex ? -1 : rowIndex
    );
  };

  return (
    <div className="ps-3 d-flex flex-column gap-3">
      {inputValues.map((rowInputs, rowIndex) => (
        <div
          key={rowIndex}
          className="z-0 card flex-row flex-wrap p-2 gap-2 position-relative"
        >
          <div className="d-flex align-items-end flex-wrap w-100 row-cols-4">
            {Object.keys(rowInputs).map((name, index) => (
              (index < 4) || (activeRow === rowIndex && index > 3) ? 
                <div className="p-2" key={index}>
                  <DynamicAttributeField
                    onChange={e=>handleInputChange(e, rowIndex)}
                    className='p-2'
                    data={{
                      attribute_name_en: name,
                      attribute_name_fa: name,
                      attribute_type: struct[name],
                      attribute_value: rowInputs[name],
                    }}
                  />
                </div> : null
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
              className={`pe-auto z-1 btn btn-${
                activeRow === rowIndex ? "secondary" : "primary"
              } btn-sm p-1 d-flex align-items-center justify-content-center`}
              onClick={() => handleActivateRow(rowIndex)}
              title={activeRow === rowIndex ? "Hide" : "Expand"}
            >
              {activeRow === rowIndex ? (
                <FaCompressAlt size={16} />
              ) : (
                <FaExpandAlt size={16} />
              )}
            </RippleButton>
          </div>
        </div>
      ))}
    </div>
  );
});

export default AttributeComponent;
