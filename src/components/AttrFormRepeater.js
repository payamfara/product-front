import React, { useState } from "react";
import Select2 from "./Select2Component";

const AttrFormRepeater = () => {
  const [attributes, setAttributes] = useState([
    { type: "", description: "" },
  ]);

  const addAttribute = () => {
    setAttributes([...attributes, { type: "", description: "" }]);
  };

  const removeAttribute = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updatedAttributes = attributes.map((attr, i) =>
      i === index ? { ...attr, [field]: value } : attr
    );
    setAttributes(updatedAttributes);
  };

  const handleAttrNameChange = (selectedOption) => {
    console.log(selectedOption);
    
  }

  return (
    <form>
      {attributes.map((attr, index) => (
        <div key={index} className="row align-items-end mb-3">
          <div className="col-4">
            <label className="form-label" htmlFor={`type-${index}`}>
              گزینه‌ها
            </label>
            <Select2
                asyncUrl="http://localhost:8000/ajax/attributes/"
                isAsync={true}
                placeholder="انتخاب ویژگی"
                onChange={handleAttrNameChange}
            />
          </div>
          <div className="col-6">
            <label className="form-label invisible" htmlFor={`desc-${index}`}>
              غیر قابل دیدن
            </label>
            <input
              id={`desc-${index}`}
              className="form-control"
              type="text"
              placeholder="شرح ویژگی"
              value={attr.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
            />
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeAttribute(index)}
            >
              حذف
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-primary"
        onClick={addAttribute}
      >
        افزودن ویژگی
      </button>
    </form>
  );
};

export default AttrFormRepeater;
