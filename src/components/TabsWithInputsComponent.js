import React, { useState, useImperativeHandle, forwardRef } from "react";
import DynamicAttributeField from "./DynamicAttributeField";

const TabsWithInputs = forwardRef(({ inputs }, ref) => {
  const sortedInputs = inputs.sort((a, b) => {
    const aHasValue = a.attribute_value ? 1 : 0;
    const bHasValue = b.attribute_value ? 1 : 0;

    if (aHasValue !== bHasValue) {
      return bHasValue - aHasValue;
    }

    return a.attribute.attribute_order - b.attribute.attribute_order;
  });

  const categorizeInputs = (sortedInputs) => {
    const priorities = [
      ...new Set(
        sortedInputs.map((input) => input.attribute.attribute_priority)
      ),
    ];

    const categorized = {};

    priorities.forEach((priority) => {
      categorized[priority] = sortedInputs.filter(
        (input) => input.attribute.attribute_priority === priority
      );
    });

    return categorized;
  };

  const categorizedInputs = categorizeInputs(sortedInputs);

  const [inputValues, setInputValues] = useState(() => {
    const initialState = {};
    sortedInputs.forEach((input) => {
      initialState[input.attribute.attribute_id] = input.attribute_value || "";
    });
    return initialState;
  });

  const [activeTab, setActiveTab] = useState(
    Object.keys(categorizedInputs)[0] || ""
  );

  useImperativeHandle(ref, () => ({
    getValues: () =>
      Object.keys(inputValues).map((inputName) => ({
        attribute_id: inputName,
        attribute_value: inputValues[inputName]?.id || inputValues[inputName],
      })),
  }));

  const handleInputChange = (name, value) => {
    console.log(name, value);
    
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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
              {`${priorityKey}`}
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
                {categorizedInputs[priorityKey].map((input, index) => (
                  <DynamicAttributeField
                    onChange={handleInputChange}
                    key={input.attribute.id || index}
                    data={{
                      ...input.attribute,
                      attribute_value: input.attribute_value,
                    }}
                    value={inputValues[input.attribute.attribute_id] || ""}
                  />
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
});

export default TabsWithInputs;
