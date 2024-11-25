import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  return (
    <div>
      {/* Tab Buttons */}
      <ul className="nav nav-tabs">
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
            className={`tab-pane ${activeTab === tab.id ? "active" : ""}`}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
