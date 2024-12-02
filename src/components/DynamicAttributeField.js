import Select2 from "./Select2Component";
import DatePicker from "./DatePicker";

const DynamicAttributeField = ({ data, onChange }) => {
  const {
    attribute_type,
    attribute_name_en,
    attribute_name_fa,
    attribute_value,
    attribute_value_str,
    attribute_priority,
    attribute_id,
    attribute_url,
    attribute_category,
    attribute_prefix,
    attribute_postfix,
  } = data;
  // <div className="d-flex justify-content-between align-items-center">
  // {attribute_category && <span id="help_part_number_en" className="badge text-bg-danger fs-tiny form-label">{attribute_category}</span>}

  switch (attribute_type) {
    case "Text": // Text
      return (
        <div className="d-flex flex-column justify-content-between fs-6">
          <label className="text-primary" htmlFor={attribute_name_en}>
            {attribute_name_fa}
          </label>
          <Select2
            id={attribute_name_en}
            name={attribute_id || attribute_name_en}
            asyncUrl={attribute_url}
            isAsync={true}
            placeholder={attribute_name_fa}
            onChange={onChange}
            defaultValue={{ id: attribute_value, value: attribute_value_str }}
            className=""
          />
        </div>
      );
    case "": // Text
      return (
        <div className="form-floating">
          <input
            onChange={(e) => onChange(e.target.name, e.target.value)}
            id={attribute_name_en}
            name={attribute_id || attribute_name_en}
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
            name={attribute_id || attribute_name_en}
            className="form-control"
            placeholder={attribute_name_fa}
            defaultValue={attribute_value}
          />
          <label htmlFor={attribute_name_en}>{attribute_name_fa}</label>
        </div>
      );
    case "Float": // Input type=number
    case 0:
      return (
        <div className="form-floating">
          <input
            onChange={(e) => onChange(e.target.name, e.target.value)}
            type="number"
            id={attribute_name_en}
            name={attribute_id || attribute_name_en}
            className="form-control"
            placeholder={attribute_name_fa}
            defaultValue={attribute_value}
          />
          <label htmlFor={attribute_name_en}>{attribute_name_fa}</label>
        </div>
      );
    case false:
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
              name={attribute_id || attribute_name_en}
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
                  name={attribute_id || attribute_name_en}
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
                  name={attribute_id || attribute_name_en}
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
      const match = attribute_type.match(/\(([^)]+)\)/);
      if (match) {
        const asyncUrl =
          match[1] == "choice"
            ? `/choice/?title=${attribute_name_en}`
            : `/${match[1]}/`;
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
              name={attribute_id || attribute_name_en}
              asyncUrl={asyncUrl}
              isAsync={true}
              placeholder={attribute_name_fa}
              onChange={onChange}
              defaultValue={{ id: attribute_value, value: attribute_value_str }}
              className="position-absolute bottom-0 w-100 custom-select--nobrorder"
            />
          </div>
          // <div className="d-flex flex-column justify-content-between fs-6">
          //   <input
          //     id={`${attribute_name_en}_fake`}
          //     readOnly
          //     type="text"
          //     className="form-control"
          //   />
          //   {/* <label htmlFor={`${attribute_name_en}_fake`}>{attribute_name_en}</label> */}
          //   <label className="text-primary" htmlFor={attribute_name_en}>
          //     {attribute_name_fa}
          //   </label>
          //   <Select2
          //     id={attribute_name_en}
          //     name={attribute_id || attribute_name_en}
          //     asyncUrl={asyncUrl}
          //     isAsync={true}
          //     placeholder={attribute_name_fa}
          //     onChange={onChange}
          //     defaultValue={{ 'id': attribute_value, 'value': attribute_value_str }}
          //     className=''
          //   />
          // </div>
        );
      }
      return (
        <div className="form-floating">
          <DatePicker name={attribute_name_en}/>
          <label htmlFor={attribute_name_en}>{attribute_name_en}</label>
        </div>
      );
  }
};

export default DynamicAttributeField;
