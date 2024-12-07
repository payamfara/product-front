import Select2 from "./Select2Component";
import DatePicker from "./DatePicker";

const DynamicAttributeField = ({ data, onChange }) => {
  // <div className="d-flex justify-content-between align-items-center">
  // {attribute_category && <span id="help_part_number_en" className="badge text-bg-danger fs-tiny form-label">{attribute_category}</span>}
  const attribute_type = data.attr_type ?? data.meta_datas.attr_value;
  // const attribute_type = data.attribute_type ?? data.attr_type
  const attribute_name_en = data.attribute_name_en ?? data.title_en;
  const attribute_name_fa = data.attribute_name_fa ?? data.title_fa;
  const attribute_value = data.attribute_value ?? data.attr_value;
  const attribute_value_str = data.attribute_value_str;
  const attribute_priority = data.attribute_priority ?? data.priority;
  const attribute_id = data.attribute_id ?? data.attribute;
  const attribute_url = data.attribute_url;
  const attribute_category = data.attribute_category ?? data.category;
  const attribute_prefix = data.attribute_prefix ?? data.prefix;
  const attribute_postfix = data.attribute_postfix ?? data.postfix;

  // console.log('attribute_type', attribute_type);
  

  switch (attribute_type.type) {
    case "Text": // Text
    case "text": // Text
    case "select_2": // Text
      return (
        <div className="form-floating">
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
            placeholder={attribute_name_fa}
            onChange={(value)=>onChange(attribute_name_en, value)}
            defaultValue={attribute_type.default}
            className="position-absolute bottom-0 w-100 custom-select--nobrorder"
          />
        </div>
      );
    case "list": // Text
      return (
        <div className="form-floating">
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
            placeholder={attribute_name_fa}
            onChange={(value)=>onChange(attribute_name_en, value)}
            defaultValue={attribute_type.default}
            className="position-absolute bottom-0 w-100 custom-select--nobrorder"
          />
        </div>
      );
    case "": // Text
      return (
        <div className="form-floating">
          <input
            onChange={(e) => onChange(e.target.name, e.target.value)}
            id={attribute_name_en}
            name={attribute_name_en}
            className="form-control"
            placeholder={attribute_name_fa}
            defaultValue={attribute_value}
          />
          <label htmlFor={attribute_name_en}>{attribute_name_fa}</label>
        </div>
      );
    case "readonly": // Readonly
      return (
        <div className="form-floating">
          <input
            readOnly
            onChange={(e) => onChange(e.target.name, e.target.value)}
            id={attribute_name_en}
            name={attribute_name_en}
            className="form-control"
            placeholder={attribute_name_fa}
            defaultValue={attribute_value}
          />
          <label htmlFor={attribute_name_en}>{attribute_name_fa}</label>
        </div>
      );
    case "Float": // Input type=number
    case "float": // Input type=number
    case 0:
      return (
        <div className="form-floating">
          <input
            onChange={(e) => onChange(e.target.name, e.target.value)}
            type="number"
            id={attribute_name_en}
            name={attribute_name_en}
            className="form-control"
            placeholder={attribute_name_fa}
            defaultValue={attribute_value}
          />
          <label htmlFor={attribute_name_en}>{attribute_name_fa}</label>
        </div>
      );
    case false:
    case "boolean":
      // For checkbox or radio based on priority
      if (attribute_priority === "mandatory") {
        return (
          <div className="position-relative form-floating">
            <input
              id={`${attribute_name_en}_fake`}
              readOnly
              type="text"
              className="form-control"
            />
            <label htmlFor={`${attribute_name_en}_fake`}>
              {attribute_name_en}
            </label>
            <input
              type="checkbox"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              id={attribute_name_en}
              name={attribute_name_en}
              className="position-absolute bottom-0 mx-3 m-2 form-check-input"
              defaultChecked={!!attribute_value}
            />
          </div>
        );
      } else {
        return (
          <div className="form-floating">
            <input
              id={`${attribute_name_en}_fake`}
              readOnly
              type="text"
              className="form-control"
            />
            <label htmlFor={`${attribute_name_en}_fake`}>
              {attribute_name_en}
            </label>
            <div className="position-absolute bottom-0 m-2 mx-3">
              <div className="form-check form-check-inline">
                <input
                  onChange={(e) => onChange(e.target.name, true)}
                  type="radio"
                  id={`${attribute_name_en}_true`}
                  name={attribute_name_en}
                  className="form-check-input"
                  defaultChecked={attribute_value === true}
                />
                <label htmlFor={`${attribute_name_en}_true`}>بله</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  onChange={(e) => onChange(e.target.name, false)}
                  type="radio"
                  id={`${attribute_name_en}_false`}
                  name={attribute_name_en}
                  className="form-check-input"
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
        inputValue = attribute_type.default;
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
            <div className="form-floating">
              <DatePicker name={attribute_name_en} />
              <label htmlFor={attribute_name_en}>{attribute_name_en}</label>
            </div>
          );
        }
      }

      return (
        <div className="form-floating">
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
            placeholder={attribute_name_fa}
            onChange={(value)=>onChange(attribute_name_en, value)}
            defaultValue={inputValue}
            className="position-absolute bottom-0 w-100 custom-select--nobrorder"
          />
        </div>
      );
  }
};

export default DynamicAttributeField;
