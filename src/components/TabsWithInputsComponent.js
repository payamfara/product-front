import React, {useState, useEffect, useMemo} from "react";
import DynamicAttributeField from "./DynamicAttributeField";

const TabsWithInputs = ({onChange, inputs, errors}) => {
    const categorizeInputs = (sortedInputs) => {
        const priorities = [...new Set(sortedInputs.map((input) => input.priority))];
        const categorized = {};
        priorities.forEach((priority) => {
            categorized[priority] = sortedInputs.filter(
                (input) => input.priority === priority
            );
        });
        return categorized;
    };

    const [activeTab, setActiveTab] = useState("");

    const categorizedInputs = useMemo(() => {
        const sortedInputs = inputs.sort((a, b) => {
            if (a.order !== b.order) {
                return a.order - b.order;
            }
            return a.title_en.localeCompare(b.title_en, "fa");
        });
        return categorizeInputs(sortedInputs);
    }, [inputs]);

    useEffect(() => {
        if (!activeTab && Object.keys(categorizedInputs).length > 0) {
            setActiveTab(Object.keys(categorizedInputs)[0]); // مقدار اولیه تب
        }
    }, [categorizedInputs]);

    const handleChange = (priorityKey, index, newValue) => {
        const extra_data =
            typeof newValue === "object"
                ? {
                    attr_value: newValue.id,
                    attribute_value_str:
                        newValue.text || newValue.label || newValue.name || newValue.title_en,
                }
                : {attr_value: newValue};

        if (onChange)
            onChange((prevData) =>
                prevData.map((nonVariant) =>
                    nonVariant.attribute === categorizedInputs[priorityKey][index].attribute
                        ? {...nonVariant, ...extra_data, changed: true}
                        : nonVariant
                )
            );
    };

    return (
        <div>
            {/* Tab Navigation */}
            <ul className="nav nav-tabs mb-3">
                {Object.keys(categorizedInputs).map((priorityKey) => (
                    <li key={priorityKey} className="nav-item">
                        <button
                            type="button"
                            className={`nav-link ${activeTab === priorityKey ? "active" : ""}`}
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
                                            data={{
                                                ...input,
                                                attribute_error: errors?.[input.attribute]
                                            }}
                                            parentClassName={input.changed ? "warning" : ""}
                                            onChange={(value) => handleChange(priorityKey, index, value)}
                                        />
                                    );
                                })}
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default TabsWithInputs;
