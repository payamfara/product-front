import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import { Fragment } from "react";

const AttrExpanded = ({ items, rowIndex, meta_datas, onChange }) => {
    const booleanDataMap = Object.fromEntries(Object.entries(items).filter(([name, value]) => meta_datas[name] && meta_datas[name].type === 'bool'))
    const getProps = (name) => ({
        onChange: (value) => onChange(name, value),
        data: {
            attribute_id: `${rowIndex}-${name}`,
            attribute_name_en: name,
            attribute_name_fa: meta_datas[name].verbose_name,
            attr_type: meta_datas[name],
            attribute_value: items[name],
            `attr
            ibute_value_str`: items[`${name}_str`]
        },
    })
    return (
        <Fragment>
            <div className="col-7 offset-1">
                <div className="row row-cols-2">
                    <div className="p-2"><DynamicAttributeField {...getProps('type')} /></div>
                    <div className="p-2"><DynamicAttributeField {...getProps('list_id')} /></div>
                </div>
                <div className="row row-cols-3">
                    <div className="p-2"><DynamicAttributeField {...getProps('title_en')} /></div>
                    <div className="p-2"><DynamicAttributeField {...getProps('title_fa')} /></div>
                    <div className="p-2"><DynamicAttributeField {...getProps('title_bz')} /></div>
                </div>
                <div className="row">
                    <div className="p-2 col-9"><DynamicAttributeField {...getProps('description')} /></div>
                    <div className="p-2 col-3"><DynamicAttributeField {...getProps('priority')} /></div>
                </div>
                <div className="row row-cols-3">
                    <div className="p-2"><DynamicAttributeField {...getProps('prefix')} /></div>
                    <div className="p-2"><DynamicAttributeField {...getProps('postfix')} /></div>
                    <div className="p-2"><DynamicAttributeField {...getProps('weight')} /></div>
                </div>
            </div>
            <div className="col-4 row row-cols-2">
                {Object.keys(booleanDataMap).map((name, index) =>
                    <div key={`${rowIndex}-${index}`} className="p-2"><DynamicAttributeField {...getProps(name)} /></div>
                )}
            </div>
        </Fragment >
    )
}
export default AttrExpanded;