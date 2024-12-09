import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { baseApiAuth } from "../api/baseApi";

const TagifyComponent = forwardRef(
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
    },
    ref
  ) => {
    const tagifyRef = useRef();
    const settings = {
      placeholder,
      maxTags,
      whitelist: whitelist.map((item) => ({
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
      getValues: () => tagifyRef.current.value,
    }));

    const processedvalue = value.map((item) => ({
      id: item[valueKey],
      value: item[displayKey],
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
                id: item[valueKey],
                value: item[displayKey],
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
          type="text"
          className="pb-4dot5rem form-control"
        />
        <label htmlFor={name}>{name}</label>
        <Tags
          name={name}
          id={id}
          className={`position-absolute bottom-0 inner form-control`}
          tagifyRef={tagifyRef}
          settings={settings}
          defaultValue={processedvalue}
          onChange={handleChange}
          onInput={handleInput}
        />
      </div>
    );
  }
);

export default TagifyComponent;
