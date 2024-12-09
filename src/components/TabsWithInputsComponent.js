import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import DynamicAttributeField from "./DynamicAttributeField";

const TabsWithInputs = forwardRef(({ nonVariants, inputs, onChange }, ref) => {

  const categorizeInputs = (sortedInputs) => {
    const priorities = [
      ...new Set(sortedInputs.map((input) => input.priority)),
    ];

    const categorized = {};

    priorities.forEach((priority) => {
      categorized[priority] = sortedInputs.filter(
        (input) => input.priority === priority
      );
    });

    return categorized;
  };

  const [categorizedInputs, setCategorizedInputs] = useState({});
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const sortedInputs = inputs.sort((a, b) => {
      const aHasValue = a.attr_value ? 1 : 0;
      const bHasValue = b.attr_value ? 1 : 0;

      if (aHasValue !== bHasValue) {
        return bHasValue - aHasValue;
      }

      return b.order - a.order;
    });

    const categorized = categorizeInputs(sortedInputs);
    setCategorizedInputs(categorized);
    setActiveTab(Object.keys(categorized)[0] || "");
  }, [inputs]);

  useImperativeHandle(ref, () => ({
    getValues: () => Object.values(categorizedInputs).flat(),
  }));

  const handleChange = (priorityKey, index, newValue) => {
    console.log(index, newValue);
    
    const value = typeof newValue === "object" ? newValue.id : newValue;
    const value_str = typeof newValue === "object" ? (newValue.value || newValue.label || newValue.name || newValue.title_en) : undefined;
    setCategorizedInputs((prevState) => {
      const updated = { ...prevState };
      updated[priorityKey][index] = {
        ...updated[priorityKey][index],
        attr_value: value,
        attribute_value_str: value_str,
      };
      return updated;
    });
    if (onChange)
      onChange(categorizedInputs[priorityKey][index].attribute, newValue);
  };
  return (
    <div>
      {/* Tab Navigation */}
      <ul className="nav nav-tabs mb-3">
        {Object.keys(categorizedInputs).map((priorityKey) => (
          <li key={priorityKey} className="nav-item">
            <button
              type="button"
              className={`nav-link ${
                activeTab === priorityKey ? "active" : ""
              }`}
              onClick={() => setActiveTab(priorityKey)}
            >
              {priorityKey == 4
                ? "الزامی"
                : priorityKey == 5
                ? "مهم"
                : "غیر مهم"}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="tab-content">
        {Object.keys(categorizedInputs).map(
          (priorityKey) =>
            activeTab === priorityKey && (
              <div
                key={priorityKey}
                className="d-flex flex-column gap-3 tab-pane show active"
              >
                {categorizedInputs[priorityKey].map((input, index) => {
                  return (
                    <DynamicAttributeField
                      key={index}
                      data={input}
                      parentClassName={
                        nonVariants &&
                        Object.keys(nonVariants).includes(
                          input.attribute.toString()
                        )
                          ? "warning"
                          : ""
                      }
                      onChange={(value) =>
                        handleChange(priorityKey, index, value)
                      }
                    />
                  );
                })}
              </div>
            )
        )}
      </div>
    </div>
  );
});

export default TabsWithInputs;
