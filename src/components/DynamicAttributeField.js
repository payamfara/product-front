import { Fragment } from "react";
import Select2 from "./Select2Component";

const DynamicAttributeField = ({ data, onChange }) => {
  
  const {
    attribute_type,
    attribute_name_en,
    attribute_name_fa,
    attribute_value,
    attribute_priority,
    attribute_id,
    attribute_category,
    attribute_prefix,
    attribute_postfix,
  } = data;
  // <div className="d-flex justify-content-between align-items-center">
  // {attribute_category && <span id="help_part_number_en" className="badge text-bg-danger fs-tiny form-label">{attribute_category}</span>}

  switch (attribute_type) {
    case 'Text': // Select2
    case 'rel(choice)': // Select2
      return (
        <div className="d-flex flex-column justify-content-between fs-6">
          <label className="text-primary" htmlFor={attribute_name_en}>
            {attribute_name_fa}
          </label>
          <Select2
            id={attribute_name_en}
            name={attribute_id}
            asyncUrl={`http://192.168.1.21:8000/ajax/attrs/${attribute_id}/`}
            isAsync={true}
            placeholder={attribute_name_fa}
            onChange={onChange}
            defaultValue={attribute_value}
            className=''
          />
        </div>
      );
    case '': // Text
      return (
        <div className="form-floating">
          <input
            onChange={onChange}
            id={attribute_name_en}
            name={attribute_id}
            className="form-control"
            placeholder={attribute_name_fa}
            defaultValue={attribute_value}
          />
          <label htmlFor={attribute_name_en}>
            {attribute_name_fa}
          </label>   
        </div>
      );
    case 'readonly': // Readonly
      return (
        <div className="form-floating">
          <input
            readOnly
            onChange={onChange}
            id={attribute_name_en}
            name={attribute_id}
            className="form-control"
            placeholder={attribute_name_fa}
            defaultValue={attribute_value}
          />
          <label htmlFor={attribute_name_en}>
            {attribute_name_fa}
          </label>
        </div>
      );
    case 'Float': // Input type=number
    case 0: 
      return (
        <div className="form-floating">
          <input
            onChange={onChange}
            type="number"
            id={attribute_name_en}
            name={attribute_id}
            className="form-control"
            placeholder={attribute_name_fa}
            defaultValue={attribute_value}
          />
          <label htmlFor={attribute_name_en}>
            {attribute_name_fa}
          </label>
        </div>
      );
    case false:
      // For checkbox or radio based on priority
      if (attribute_priority === 'mandatory') {
        return (
          <div className="form-check">
            <input
              onChange={onChange}
              type="checkbox"
              id={attribute_name_en}
              name={attribute_id}
              className="form-check-input"
              defaultChecked={!!attribute_value}
            />
            <label htmlFor={attribute_name_en}>
              {attribute_name_fa}
            </label>
          </div>
        );
      } else {
        return (
          <div className="d-flex flex-column justify-content-between">
            <div className="text-primary">{attribute_name_en}</div>
            <div className="px-2 py-1 border rounded">
              <div className="form-check form-check-inline">
                <input
                  onChange={onChange}
                  type="radio"
                  id={`${attribute_name_en}_1`}
                  name={attribute_id}
                  className="form-check-input"
                  defaultChecked={attribute_value === "1"}
                />
                <label htmlFor={`${attribute_name_en}_1`}>
                  بله
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  onChange={onChange}
                  type="radio"
                  id={`${attribute_name_en}_2`}
                  name={attribute_id}
                  className="form-check-input"
                  defaultChecked={attribute_value === "2"}
                />
                <label htmlFor={`${attribute_name_en}_2`}>
                  خیر
                </label>
              </div>
            </div>
          </div>
        );
      }
    default:
      return "";
  }
};

export default DynamicAttributeField;
