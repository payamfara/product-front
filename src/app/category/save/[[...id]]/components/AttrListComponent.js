import React, { Fragment, useState, useRef, useEffect } from "react";
import { FaTrash, FaExpandAlt, FaCompressAlt } from "react-icons/fa";
import RippleButton from "../../../../../components/RippleButton/RippleButton";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";

const AttrListComponent = ({ inputs, updateAttrList }) => {
  const [activeRow, setActiveRow] = useState(-1);
  const [hoverRow, setHoverRow] = useState(-1);

  // Refs for each row
  const rowRefs = useRef([]);

  useEffect(() => {
    // Scroll to active row when it changes
    if (activeRow !== -1 && rowRefs.current[activeRow]) {
      rowRefs.current[activeRow].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeRow]);

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

  const handleHoverRow = (rowIndex) => {
    setHoverRow((prevHoverRow) =>
      prevHoverRow === rowIndex ? -1 : rowIndex
    );
  };

  return (
    <div className={`ps-3 d-flex flex-wrap`}>
      {inputs.map((_rowInputs, rowIndex) => {
        const { meta_datas, ...rowInputs } = _rowInputs;
        return (
          <Fragment key={rowIndex}>
            {activeRow === rowIndex && (
              <div className={`col-3 p-2 order-${rowIndex}`}></div>
            )}
            <div
              ref={(el) => (rowRefs.current[rowIndex] = el)} // Assign ref to each row
              className={`${activeRow === rowIndex
                ? `col-12 order-${Math.min(inputs.length, rowIndex + 4 - (rowIndex % 4))}`
                : `order-${rowIndex} col-3`
                } p-2`}
            >
              <div
                onMouseEnter={() => handleHoverRow(rowIndex)}
                onMouseLeave={() => handleHoverRow(-1)}
                role="button"
                key={rowIndex}
                className={`position-relative card border ${activeRow === rowIndex ? "border-success" : "border-primary "
                  } ${hoverRow === rowIndex ? "shadow-lg" : "shadow-sm"
                  } flex-row flex-wrap ps-4 p-2 gap-2`}
              >
                <div
                  className={`d-flex align-items-end flex-wrap w-100 ${activeRow === rowIndex ? "row-cols-5" : "row-cols-2"
                    } `}
                >
                  {Object.keys(rowInputs).map((name, index) =>
                    index < 4 || (activeRow === rowIndex && index > 3) ? (
                      <div className="p-2" key={index}>
                        {meta_datas[name] && (
                          <DynamicAttributeField
                            onChange={(name, value) =>
                              handleInputChange(name, value, rowIndex)
                            }
                            className="p-2"
                            data={{
                              attribute_name_en: name,
                              attribute_name_fa: meta_datas[name].verbose_name,
                              attr_type: meta_datas[name],
                              attribute_value: rowInputs[name],
                              attribute_value_str: rowInputs[`${name}_str`],
                            }}
                          />
                        )}
                      </div>
                    ) : null
                  )}
                </div>
                {(hoverRow === rowIndex || activeRow === rowIndex) && (
                  <div className="position-absolute d-flex flex-column justify-content-center gap-4 top-0 start-0 h-100 mxn-2">
                    <RippleButton
                      className="rounded-start-0 border-0 border-danger ribbon btn btn-danger btn-sm p-1 d-flex align-items-center justify-content-center"
                      onClick={() => handleDeleteRow(rowIndex)}
                      title="Delete"
                    >
                      <FaTrash size={16} />
                    </RippleButton>
                    <RippleButton
                      className={`rounded-start-0 border-0 ribbon btn ${activeRow === rowIndex
                        ? "border-secondary btn-secondary"
                        : "border-primary btn-primary"
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
                )}
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default AttrListComponent;