export const updatePartNumbers = (attrs) => {
    const partNumbers = ['part_number_en', 'part_number_fa', 'part_number_bz'].reduce((acc, key) => {
        acc[key] = attrs
            .filter(a => a.is_part_of_part_number)
            .map(nv => {
                if (key === 'part_number_en') return nv.attribute_value_str !== "None" ? nv.attribute_value_str ?? nv.attr_value ?? "" : nv.attr_value ?? "";
                if (key === 'part_number_fa') return nv.attr_value_fa ?? nv.attr_value ?? "";
                if (key === 'part_number_bz') return nv.attr_value_bz ?? nv.attr_value ?? "";
            })
            .filter(value => value); 
        return acc;
    }, {});
    
    const strPartNumbers = Object.entries(partNumbers).map(([name, value]) => [name, value.join('_')]);
    return Object.fromEntries(strPartNumbers)
}