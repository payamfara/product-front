import React, { useState, useImperativeHandle, forwardRef, Fragment } from "react";
import { FaTrash, FaExpandAlt, FaCompressAlt } from "react-icons/fa"; // آیکون‌ها از Font Awesome
import RippleButton from "../../../../../components/RippleButton/RippleButton";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";

const AttrList = ({ inputs, updateAttrList, struct }) => {
  const [activeRow, setActiveRow] = useState(-1);

  const handleInputChange = (name, value, rowIndex) => {
    updateAttrList((prevValues) =>
      prevValues.map((row, index) =>
        index === rowIndex ? { ...row, [name]: value } : row
      )
    );
  };

  const handleDeleteRow = (rowIndex) => {
    updateAttrList((prevValues) =>
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
      {inputs.map((_rowInputs, rowIndex) => {
        const {meta_datas, ...rowInputs} = _rowInputs;
        return (
          <div
            key={rowIndex}
            className="position-relative card flex-row flex-wrap ps-4 p-2 gap-2"
          >
            <div className="d-flex align-items-end flex-wrap w-100 row-cols-4">
              {Object.keys(rowInputs).map((name, index) => {
                return (
                (index < 4) || (activeRow === rowIndex && index > 3) ?
                  <div className="p-2" key={index}>
                    <DynamicAttributeField
                      // onChange={(name, value) => handleInputChange(name, value, rowIndex)}
                      className='p-2'
                      data={{
                        attribute_name_en: name,
                        attribute_name_fa: name,
                        attr_type: meta_datas[name],
                        attr_value: rowInputs[name],
                        attribute_value_str: rowInputs[`${name}_str`]
                      }}
                    />
                  </div> : null
              )})}
            </div>
            <div className="position-absolute d-flex flex-column justify-content-center gap-4 top-0 start-0 h-100 mxn-2">
              <RippleButton
                className="rounded-start-0 border-0 border-danger ribbon btn btn-danger btn-sm p-1 d-flex align-items-center justify-content-center"
                onClick={() => handleDeleteRow(rowIndex)}
                title="Delete"
              >
                <FaTrash size={16} />
              </RippleButton>
              <RippleButton
                className={`rounded-start-0 border-0 border-primary ribbon btn btn-${activeRow === rowIndex ? "secondary" : "primary"
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
        )
      })}
    </div>
  );
};

export default AttrList;
