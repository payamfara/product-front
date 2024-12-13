import React, { Fragment, useState, useRef, useEffect } from "react";
import { FaTrash, FaExpandAlt, FaCompressAlt } from "react-icons/fa";
import RippleButton from "../../../../../components/RippleButton/RippleButton";
import AttrCollapsed from './AttrCollapsed';
import AttrExpanded from './AttrExpanded';

const AttrListComponent = ({ inputs, updateAttrList }) => {
  const [activeRow, setActiveRow] = useState(-1);
  const [hoverRow, setHoverRow] = useState(-1);

  const rowRefs = useRef([]);

  useEffect(() => {
    if (activeRow !== -1 && rowRefs.current[activeRow]) {
      rowRefs.current[activeRow].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeRow]);

  const handleInputChange = (name, value, rowIndex) => {
    console.log(name, value);

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

  const handleHoverRow = (rowIndex) => setHoverRow(rowIndex);

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
              ref={(el) => (rowRefs.current[rowIndex] = el)} 
              className={`${activeRow === rowIndex
                ? `col-12 order-${Math.min(inputs.length, rowIndex + 4 - (rowIndex % 4))}`
                : `order-${rowIndex} col-3`
                } p-2`}
            >
              <div
                onMouseEnter={() => handleHoverRow(rowIndex)}
                onMouseLeave={() => handleHoverRow(-1)}
                role="button"
                className={`ps-4 p-2 position-relative card border ${activeRow === rowIndex ? "border-success" : rowInputs.id ? "border-primary" : "border-warning"
                  } ${hoverRow === rowIndex ? "shadow-lg" : "shadow-sm"}`}
              >
                <div
                  className={`d-flex align-items-start flex-wrap w-100 ${activeRow === rowIndex ? "row-cols-5" : "row-cols-2"
                    } `}
                >
                  {activeRow === rowIndex
                    ? <AttrExpanded
                      rowIndex={rowIndex}
                      items={rowInputs}
                      meta_datas={meta_datas}
                      onChange={(name, value) =>
                        handleInputChange(name, value, rowIndex)
                      } />
                    : <AttrCollapsed
                      rowIndex={rowIndex}
                      items={rowInputs}
                      meta_datas={meta_datas}
                      onChange={(name, value) =>
                        handleInputChange(name, value, rowIndex)
                      } />
                  }
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
