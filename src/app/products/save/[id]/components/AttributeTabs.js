import React from "react";
import Tabs from "@/src/components/TabsComponent";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";

const AttributeTabs = ({ attributes }) => {
  const tabs = attributes.map((attr) => ({
    id: attr.group,
    label: attr.label,
    content: (
      <div className="d-flex flex-column gap-3">
        {attr.data.map((attrData) => (
          <DynamicAttributeField  
            key={attrData.id || index}
            data={{
              ...attrData,
              priority: attr.group,
              help_text: attrData.category ? 'ویژگی دسته بندی' : ''
            }}
          />
        ))}
      </div>
    ),
  }));

  return <Tabs tabs={tabs} />;
};

export default AttributeTabs;
