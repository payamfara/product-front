import Select2 from "./Select2Component";
import DatePicker from "./DatePicker";
import { useEffect, useState } from "react";

const DynamicAttributeField = ({ data, onChange, parentClassName }) => {
  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  // <div className="d-flex justify-content-between align-items-center">
  // {attribute_category && <span id="help_part_number_en" className="badge text-bg-danger fs-tiny form-label">{attribute_category}</span>}
  const attribute_type = localData.attr_type ?? localData.meta_datas.attr_value;
  // const attribute_type = localData.attribute_type ?? localData.attr_type
  const attribute_name_en = localData.attribute_name_en ?? localData.title_en;
  const attribute_name_fa = localData.attribute_name_fa ?? localData.title_fa;
  const attribute_value = localData.attribute_value ?? localData.attr_value;
  const attribute_value_str = localData.attribute_value_str;
  const attribute_priority = localData.attribute_priority ?? localData.priority;
  const attribute_id = localData.attribute_id ?? localData.attribute;
  const attribute_url = localData.attribute_url;
  const attribute_category = localData.attribute_category ?? localData.category;
  const attribute_prefix = localData.attribute_prefix ?? localData.prefix;
  const attribute_postfix = localData.attribute_postfix ?? localData.postfix;
  const attribute_placeholder = localData.attribute_placeholder ?? attribute_name_fa;

  // console.log(attribute_name_en, attribute_value, attribute_value_str);

  switch (attribute_type.type) {
    case "Text": // Text
    case "text": // Text
    case "select_2": // Text
      return (
        <div className={`${parentClassName} form-floating`}>
          <input
            id={`${attribute_name_en}_fake`}
            readOnly
            type="text"
            className="form-control"
          />
          {/* <label htmlFor={`${attribute_name_en}_fake`}>{attribute_name_en}</label> */}
          <label htmlFor={attribute_name_en}>{attribute_name_fa}</label>
          <Select2
            id={attribute_name_en}
            name={attribute_name_en}
            asyncUrl={attribute_type.url}
            isAsync={true}
            placeholder={attribute_placeholder}
            onChange={onChange}
            value={{'id': attribute_value, 'value': attribute_value_str}}
            className={`position-absolute bottom-0 w-100 custom-select--nobrorder`}
          />
        </div>
      );
    case "list": // Text
      return (
        <div className={`${parentClassName} form-floating`}>
          <input
            id={`${attribute_name_en}_fake`}
            readOnly
            type="text"
            className="form-control"
          />
          {/* <label htmlFor={`${attribute_name_en}_fake`}>{attribute_name_en}</label> */}
          <label htmlFor={attribute_name_en}>{attribute_name_fa}</label>
          <Select2
            options={attribute_type.choice}
            id={attribute_name_en}
            name={attribute_name_en}
            isAsync={false}
            placeholder={attribute_placeholder}
            onChange={onChange}
            value={{'id': attribute_value, 'value': attribute_value_str}}
            className={`position-absolute bottom-0 w-100 custom-select--nobrorder`}
          />
        </div>
      );
    case "string": // Text
      return (
        <div className={`${parentClassName} form-floating`}>
          <input
            onChange={(e) => onChange(e.target.value)}
            id={attribute_name_en}
            name={attribute_name_en}
            className={`form-control`}
            placeholder={attribute_placeholder}
            value={attribute_value}
          />
          <label htmlFor={attribute_name_en}>{attribute_name_fa}</label>
        </div>
      );
    case "readonly": // Readonly
      return (
        <div className={`${parentClassName} form-floating`}>
          <input
            readOnly
            onChange={(e) => onChange(e.target.value)}
            id={attribute_name_en}
            name={attribute_name_en}
            className={`form-control`}
            placeholder={attribute_placeholder}
            value={attribute_value}
          />
          <label htmlFor={attribute_name_en}>{attribute_name_fa}</label>
        </div>
      );
    case "Float": // Input type=number
    case "float": // Input type=number
    case 0:
      return (
        <div className={`${parentClassName} form-floating`}>
          <input
            onChange={(e) => onChange(e.target.value)}
            type="number"
            id={attribute_name_en}
            name={attribute_name_en}
            className={`form-control`}
            placeholder={attribute_placeholder}
            value={attribute_value}
          />
          <label htmlFor={attribute_name_en}>{attribute_name_fa}</label>
        </div>
      );
    case false:
    case "bool":
      // For checkbox or radio based on priority
      if (attribute_priority === "mandatory" || attribute_type.required) {
        return (
          <div className={`${parentClassName} position-relative form-floating`}>
            <input
              id={`${attribute_name_en}_fake`}
              readOnly
              type="text"
              className="form-control"
            />
            <label htmlFor={`${attribute_name_en}_fake`}>
              {attribute_name_fa}
            </label>
            <input
              type="checkbox"
              onChange={(e) => onChange(e.target.value)}
              id={attribute_name_en}
              name={attribute_name_en}
              className={`position-absolute bottom-0 mx-3 m-2 form-check-input`}
              defaultChecked={!!attribute_value}
            />
          </div>
        );
      } else {
        return (
          <div className={`${parentClassName} form-floating`}>
            <input
              id={`${attribute_name_en}_fake`}
              readOnly
              type="text"
              className="form-control"
            />
            <label htmlFor={`${attribute_name_en}_fake`}>
              {attribute_name_fa}
            </label>
            <div className="position-absolute bottom-0 m-2 mx-3">
              <div className="form-check form-check-inline">
                <input
                  onChange={(e) => onChange(true)}
                  type="radio"
                  id={`${attribute_name_en}_true`}
                  name={attribute_name_en}
                  className={`form-check-input`}
                  defaultChecked={attribute_value === true}
                />
                <label htmlFor={`${attribute_name_en}_true`}>بله</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  onChange={(e) => onChange(false)}
                  type="radio"
                  id={`${attribute_name_en}_false`}
                  name={attribute_name_en}
                  className={`form-check-input`}
                  defaultChecked={attribute_value === false}
                />
                <label htmlFor={`${attribute_name_en}_false`}>خیر</label>
              </div>
            </div>
          </div>
        );
      }
    default:
      // debugger
      let isAsync, inputValue, asyncUrl, options;
      if (typeof (attribute_type === "object")) {
        isAsync = attribute_type.type === "select_2";
        inputValue = {'id': attribute_value, 'value': attribute_value_str};
        asyncUrl = `/strvalue/?list_id=${attribute_type.list_id}`;
        options = attribute_type.choice;
      } else {
        const match = attribute_type?.match(/\(([^)]+)\)/);
        if (match) {
          isAsync = true;
          inputValue = { id: attribute_value, value: attribute_value_str };
          asyncUrl =
            match[1] == "choice"
              ? `/choice/?title=${attribute_name_en}`
              : `/${match[1]}/`;
        } else {
          return (
            <div className={`${parentClassName} form-floating`}>
              <DatePicker name={attribute_name_en} />
              <label htmlFor={attribute_name_en}>{attribute_name_en}</label>
            </div>
          );
        }
      }

      return (
        <div className={`${parentClassName} form-floating`}>
          <input
            id={`${attribute_name_en}_fake`}
            readOnly
            type="text"
            className="form-control"
          />
          {/* <label htmlFor={`${attribute_name_en}_fake`}>{attribute_name_en}</label> */}
          <label htmlFor={attribute_name_en}>{attribute_name_fa}</label>
          <Select2
            options={options}
            id={attribute_name_en}
            name={attribute_name_en}
            asyncUrl={asyncUrl}
            isAsync={isAsync}
            placeholder={attribute_placeholder}
            onChange={onChange}
            value={inputValue}
            className={`position-absolute bottom-0 w-100 custom-select--nobrorder`}
          />
        </div>
      );
  }
};

export default DynamicAttributeField;
