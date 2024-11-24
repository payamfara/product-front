import Select2 from "./Select2Component";

const DynamicAttributeField = ({ data }) => {
  console.log(data.attribute_title, data.attribute_value);

  const {
    attribute_type,
    attribute_title,
    attribute_placeholder,
    attribute_value,
    attribute_priority,
    attribute_id,
  } = data;
  switch (attribute_type) {
    case 0: // Select2
      return (
        <div>
          <label className="form-label" htmlFor={attribute_title}>
            {attribute_placeholder}
          </label>
          <Select2
            id={attribute_title}
            name={attribute_title}
            asyncUrl={`http://localhost:8000/ajax/attrs/${attribute_id}/`}
            isAsync={true}
            placeholder={attribute_placeholder}
            onChange={(vals) => {
              console.log(vals);
            }}
            defaultValue={attribute_value}
          />
        </div>
      );
    case 1: // Input type=number
      return (
        <div>
          <label className="form-label" htmlFor={attribute_title}>
            {attribute_placeholder}
          </label>
          <input
            type="number"
            id={attribute_title}
            name={attribute_title}
            className="form-control"
            placeholder={attribute_placeholder}
            defaultValue={attribute_value}
          />
        </div>
      );
    case 2:
      // For checkbox or radio based on priority
      if (attribute_priority === 0) {
        return (
          <div>
            <label className="form-label" htmlFor={attribute_title}>
              {attribute_placeholder}
            </label>
            <input
              type="checkbox"
              id={attribute_title}
              name={attribute_title}
              className="form-check-input"
              defaultChecked={!!attribute_value}
            />
          </div>
        );
      } else {
        return (
          <div>
            <label className="form-label" htmlFor={attribute_title}>
              {attribute_placeholder}
            </label>
            <input
              type="radio"
              id={`${attribute_title}_1`}
              name={attribute_title}
              className="form-radio-input"
              defaultChecked={attribute_value === "1"}
            />
            <input
              type="radio"
              id={`${attribute_title}_2`}
              name={attribute_title}
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
