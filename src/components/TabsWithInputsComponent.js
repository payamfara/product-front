import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import DynamicAttributeField from "./DynamicAttributeField";

const TabsWithInputs = forwardRef(({ inputs }, ref) => {
  console.log("inputs", inputs);

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
    console.log("ddddddd");
    const sortedInputs = [...inputs].sort((a, b) => {
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
    getValues: () =>
      Object.keys(categorizedInputs).map((inputName) => ({
        attribute_id: inputName,
        attribute_value:
          categorizedInputs[inputName]?.id || categorizedInputs[inputName],
      })),
  }));

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
                {categorizedInputs[priorityKey].map((input, index) => (
                  <DynamicAttributeField
                    key={input.id || index}
                    data={input}
                    value={input.attribute_name_en || ""}
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
