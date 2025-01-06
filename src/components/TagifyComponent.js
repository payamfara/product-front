import React, {useRef} from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import {baseApiAuth} from "../api/baseApi";

const TagifyComponent =
    (
        {
            name,
            id,
            placeholder = "افزودن...",
            maxTags = 10,
            whitelist = [],
            asyncUrl = null,
            onChange,
            onInput,
            value = [],
            valueKey = "id",
            displayKey = "value",
        }
    ) => {
        const tagifyRef = useRef();
        const settings = {
            placeholder,
            maxTags,
            whitelist: whitelist.map((item) => ({
                [displayKey]: item[displayKey] || item['value'] || item['title'],
                value: item[displayKey] || item['value'] || item['title'],
            })),
            dropdown: {
                enabled: 0,
                maxItems: 5,
            },
            tagTextProp: displayKey,
            mapValueToProp: valueKey,
        };

        const processedvalue = value.map((item) => ({
            id: item[valueKey],
            [displayKey]: item[displayKey] || item['value'] || item['title'],
            value: item[displayKey] || item['value'] || item['title'],
        }));

        const handleInput = async (e) => {
            const inputValue = e.detail.value;
            if (asyncUrl) {
                const requestUrl = `${asyncUrl}?title_en__icontains=${inputValue}`;
                baseApiAuth
                    .get(requestUrl)
                    .then((res) => {
                        tagifyRef.current.settings.whitelist = res.data.results.map(
                            (item) => ({
                                [displayKey]: item[displayKey] || item['value'] || item['title'],
                                value: item[displayKey] || item['value'] || item['title'],
                            })
                        );
                    })
                    .catch((err) => {
                        console.error("Error fetching suggestions:", error);
                    });
            }
            if (onInput) onInput(e);
        };

        const handleChange = (e) => {
            if (onChange) onChange(JSON.parse(e.detail.value));
        };

        return (
            <div className={`form-floating`}>
                <input
                    id={`${name}_fake`}
                    readOnly
                    type="hidden"
                    className="form-control"
                />
                <label htmlFor={name}>
                    {name}
                </label>
                <Tags
                    name={name}
                    id={id}
                    className={`form-control pt-4`}
                    tagifyRef={tagifyRef}
                    settings={settings}
                    defaultValue={processedvalue}
                    onChange={handleChange}
                    onInput={handleInput}
                />
            </div>
        );
    };

export default TagifyComponent;
