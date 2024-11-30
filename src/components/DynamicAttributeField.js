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
  switch (attribute_type) {
    case 'Text': // Select2
      return (
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <label className="form-label" htmlFor={attribute_name_en}>
              {attribute_name_fa}
            </label>
            {attribute_category && <span id="help_part_number_en" className="badge text-bg-danger fs-tiny form-label">{attribute_category}</span>}
          </div>
          <Select2
            id={attribute_name_en}
            name={attribute_id}
            asyncUrl={`http://192.168.1.21:8000/ajax/attrs/${attribute_id}/`}
            isAsync={true}
            placeholder={attribute_name_fa}
            onChange={onChange}
            defaultValue={attribute_value}
          />
        </div>
      );
    case 'Float': // Input type=number
      return (
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <label className="form-label" htmlFor={attribute_name_en}>
              {attribute_name_fa}
            </label>
            {attribute_category && <span id="help_part_number_en" className="badge text-bg-danger fs-tiny form-label">{attribute_category}</span>}
          </div>
          <input
            onChange={e=>onChange(e.target.name, e.target.value)}
            type="number"
            id={attribute_name_en}
            name={attribute_id}
            className="form-control"
            placeholder={attribute_name_fa}
            defaultValue={attribute_value}
          />
        </div>
      );
    case 'Boolean':
      // For checkbox or radio based on priority
      if (attribute_priority === 'mandatory') {
        return (
          <div className="form-check">
            <div className="d-flex justify-content-between align-items-center">
              <label className="form-label" htmlFor={attribute_name_en}>
                {attribute_name_fa}
              </label>
              {attribute_category && <span id="help_part_number_en" className="badge text-bg-danger fs-tiny form-label">{attribute_category}</span>}
            </div>
            <input
              onChange={e=>onChange(e.target.name, e.target.value)}
              type="checkbox"
              id={attribute_name_en}
              name={attribute_id}
              className="form-check-input"
              defaultChecked={!!attribute_value}
            />
          </div>
        );
      } else {
        return (
          <div className="form-check">
            <div className="d-flex justify-content-between align-items-center">
              <label className="form-label" htmlFor={attribute_name_en}>
                {attribute_name_fa}
              </label>
              {attribute_category && <span id="help_part_number_en" className="badge text-bg-danger fs-tiny form-label">{attribute_category}</span>}
            </div>
            <input
              onChange={e=>onChange(e.target.name, e.target.value)}
              type="radio"
              id={`${attribute_name_en}_1`}
              name={attribute_id}
              className="form-radio-input"
              defaultChecked={attribute_value === "1"}
            />
            <input
              onChange={e=>onChange(e.target.name, e.target.value)}
              type="radio"
              id={`${attribute_name_en}_2`}
              name={attribute_id}
              className="form-radio-input"
              defaultChecked={attribute_value === "2"}
            />
          </div>
        );
      }
    default:
      return "";
  }
};

export default DynamicAttributeField;
