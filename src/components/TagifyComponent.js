import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";

const TagifyComponent = forwardRef(({
    name,
    id,
    placeholder = "Add tags...",
    maxTags = 10,
    whitelist = [],
    asyncUrl = null,
    onChange,
    onInput,
    defaultValue = [],
    valueKey = "id", 
    displayKey = "value", 
}, ref) => {
    
    const tagifyRef = useRef();
    const settings = {
        placeholder,
        maxTags,
        whitelist: whitelist.map(item => ({
            id: item[valueKey],
            value: item[displayKey],
        })),
        dropdown: {
            enabled: 0,
            maxItems: 5,
        },
        tagTextProp: displayKey, 
        mapValueToProp: valueKey, 
    };

    useImperativeHandle(ref, () => ({
        getValues: () => tagifyRef.current.value
    }));
    
    const processedDefaultValue = defaultValue.map(item => ({
        id: item[valueKey],
        value: item[displayKey],
    }));

    const handleInput = async (e) => {
        const input = e.detail.value;
        if (asyncUrl) {
            try {
                const response = await fetch(`${asyncUrl}?q=${input}`);
                const data = await response.json();
                tagifyRef.current.settings.whitelist = data.results.map(item => ({
                    id: item[valueKey],
                    value: item[displayKey],
                }));
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        }
        if (onInput) onInput(e);
    };

    const handleChange = (e) => {
        if (onChange) onChange(e.detail.value);
    };

    return (
        <Tags
            name={name}
            id={id}
            className='form-control'
            tagifyRef={tagifyRef}
            settings={settings}
            defaultValue={processedDefaultValue} 
            onChange={handleChange}
            onInput={handleInput}
        />
    );
});

export default TagifyComponent;
