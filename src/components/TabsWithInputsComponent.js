import React, { useState, useImperativeHandle, forwardRef } from "react";
import DynamicAttributeField from './DynamicAttributeField';

const TabsWithInputs = forwardRef(({ tabs }, ref) => {
  const [inputValues, setInputValues] = useState(() => {
    const initialState = {};
    tabs.forEach((tab) => {
      tab.inputs.forEach((input) => {
        initialState[input.prefix ? `${input.prefix}-${input.title_en}` : input.title_en] = input.value || "";
      });
    });
    return initialState;
  });

  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  useImperativeHandle(ref, () => ({
    getValues: () => inputValues,
  }));
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Tab Navigation */}
      <ul className="nav nav-tabs mb-3">
        {tabs.map((tab) => (
          <li key={tab.id} className="nav-item">
            <button
              type="button"
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`d-flex flex-column gap-3 tab-pane fade ${activeTab === tab.id ? "show active" : ""}`}
          >
            {tab.inputs.map((input) => (
              <DynamicAttributeField  
                  onChange={handleInputChange}
                  key={input.id || index}
                  data={{
                      ...input,
                      priority: tab.id,
                      help_text: input.category ? 'ویژگی دسته بندی' : ''
                  }}
                  value={inputValues[input.title_en] || ""}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default TabsWithInputs;
