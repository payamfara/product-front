import React, { useState, useEffect, Fragment } from "react";
import Select2 from "./Select2Component";
import DynamicAttributeField from "./DynamicAttributeField";

const emptyAttr = {
  attribute_id: "",
  attribute_type: "",
  attribute_title: "",
  attribute_value: "",
  attribute_placeholder: "",
  attribute_priority: "",
};

const AttrFormRepeater = ({
  initialAttributes = [
    emptyAttr
  ],
}) => {
  const [attributes, setAttributes] = useState(initialAttributes);

  useEffect(() => {
    setAttributes(initialAttributes);
  }, [initialAttributes]);

  const addAttribute = () => {
    setAttributes([
      ...attributes,
      emptyAttr
    ]);
  };

  const removeAttribute = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const handleChange = (selectedOption, index) => {
    const updatedAttributes = attributes.map((attr, i) =>
      i === index ? { ...attr, ...selectedOption } : attr
    );
    setAttributes(updatedAttributes);
  };

  return (
    <div>
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
              onChange={(val) => handleChange(val, index)}
              defaultValue={attr.attribute_id && {id: attr.attribute_id, value: attr.attribute_title}}
            />
          </div>
          <div className="col-6">
            <DynamicAttributeField
              data={attr}
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
      <button type="button" className="btn btn-primary" onClick={addAttribute}>
        افزودن ویژگی
      </button>
    </div>
  );
};

export default AttrFormRepeater;
