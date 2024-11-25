import Select2 from "./Select2Component";

const DynamicAttributeField = ({ data, onChange }) => {

  const {
    type,
    title_en,
    title_fa,
    value,
    priority,
    id,
    help_text,
    prefix,
  } = data;
  switch (type) {
    case 0: // Select2
      return (
        <div>
          <label className="form-label" htmlFor={title_en}>
            {title_fa}
          </label>
          <Select2
            id={title_en}
            name={prefix ? `${prefix}-${title_en}` : title_en}
            asyncUrl={`http://localhost:8000/ajax/attrs/${id}/`}
            isAsync={true}
            placeholder={title_fa}
            onChange={onChange}
            defaultValue={value}
          />
          <span id="help_part_number_en" className="text-danger fs-tiny form-label">{help_text}</span>
        </div>
      );
    case 1: // Input type=number
      return (
        <div>
          <label className="form-label" htmlFor={title_en}>
            {title_fa}
          </label>
          <input
            onChange={onChange}
            type="number"
            id={title_en}
            name={prefix ? `${prefix}-${title_en}` : title_en}
            className="form-control"
            placeholder={title_fa}
            defaultValue={value}
          />
          <span id="help_part_number_en" className="text-danger fs-tiny form-label">{help_text}</span>
        </div>
      );
    case 2:
      // For checkbox or radio based on priority
      if (priority === 'mandatory') {
        return (
          <div className="form-check">
            <label className="form-label" htmlFor={title_en}>
              {title_fa}
            </label>
            <span id="help_part_number_en" className="text-danger fs-tiny form-label"> ({help_text}) </span>
            <input
              onChange={onChange}
              type="checkbox"
              id={title_en}
              name={prefix ? `${prefix}-${title_en}` : title_en}
              className="form-check-input"
              defaultChecked={!!value}
            />
          </div>
        );
      } else {
        return (
          <div className="form-check">
            <label className="form-label" htmlFor={title_en}>
              {title_fa}
            </label>
            <span id="help_part_number_en" className="text-danger fs-tiny form-label"> ({help_text}) </span>
            <input
              onChange={onChange}
              type="radio"
              id={`${title_en}_1`}
              name={prefix ? `${prefix}-${title_en}` : title_en}
              className="form-radio-input"
              defaultChecked={value === "1"}
            />
            <input
              onChange={onChange}
              type="radio"
              id={`${title_en}_2`}
              name={prefix ? `${prefix}-${title_en}` : title_en}
              className="form-radio-input"
              defaultChecked={value === "2"}
            />
          </div>
        );
      }
    default:
      return "";
  }
};

export default DynamicAttributeField;
