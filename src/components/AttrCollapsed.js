import DynamicAttributeField from "@/src/components/DynamicAttributeField";

const AttrCollapsed = ({items, rowIndex, meta_datas, onChange, dataKeys}) => {
    const dataMap = Object.fromEntries(Object.entries(items).filter(([name, value]) => Object.keys(dataKeys).includes(name)))

    return (
        Object.keys(dataMap).map((name, index) =>
                index < 4 && <div className="p-2" key={`${rowIndex}-${index}`}>
                    {meta_datas[name] && (
                        <DynamicAttributeField
                            onChange={(value) => onChange(name, value)}
                            className="p-2"
                            data={{
                                attribute_id: `${rowIndex}-${name}`,
                                attribute_name_en: name,
                                attribute_name_fa: meta_datas[name].verbose_name,
                                attr_type: {
                                    ...meta_datas[name],
                                    type: dataKeys[name] ? dataKeys[name] : meta_datas[name].type
                                },
                                attribute_value: dataMap[name],
                                attribute_value_str: dataMap[`${name}_str`],
                            }}
                        />
                    )}
                </div>
        )
    )
}
export default AttrCollapsed;