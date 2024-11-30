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
}, ref) => {
    console.log(ref);
    
    const tagifyRef = useRef();
    const settings = {
        placeholder,
        maxTags,
        whitelist,
        dropdown: {
            enabled: 0,
            maxItems: 5,
        },
    };
    useImperativeHandle(ref, () => ({
        getValues: () => tagifyRef.current.value
    }));
    
    const handleInput = async (e) => {
        const input = e.detail.value;
        if (asyncUrl) {
            try {
                const response = await fetch(`${asyncUrl}?term=${input}`);
                const data = await response.json();
                tagifyRef.current.settings.whitelist = data.results;
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
            defaultValue={defaultValue} 
            onChange={handleChange}
            onInput={handleInput}
        />
    );
});

export default TagifyComponent;
