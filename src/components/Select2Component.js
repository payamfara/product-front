"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { baseApiAuth } from "../api/baseApi";

const Select2Component = ({
  name,
  asyncUrl,
  isAsync = false,
  placeholder = "Select an option",
  isMulti = false,
  onChange,
  options = [],
  value,
  className
}) => {
  
  const [defaultOptions, setDefaultOptions] = useState(options);
  
  const handleOptions = async (inputValue) => {
    const separator = asyncUrl.includes("?") ? "&" : "?";
    const requestUrl = `${asyncUrl}${separator}title_en__icontains=${inputValue}&title__icontains=${inputValue}`;
    
    try {
      const res = await baseApiAuth.get(requestUrl);
      // setDefaultOptions(res.data.results);
      return res.data.results; 
    } catch (err) {
      console.error("Error fetching data:", err);
      return []; 
    }
  };

  useEffect(() => {
    // isAsync && handleOptions(value.value || "")
    if (!isAsync) return
    const fetchData = async () => {
      const options = await handleOptions(value?.value || "");
      setDefaultOptions(options);
    };
    fetchData();
  }, []);

  return (
    isAsync ? (
      <AsyncSelect
        name={name}
        cacheOptions
        loadOptions={handleOptions}
        defaultOptions={defaultOptions}
        value={value} 
        placeholder={`انتخاب ${placeholder}`}
        isMulti={isMulti}
        onChange={onChange}
        getOptionLabel={(e) => e.value || e.label || e.name || e.title_en || e.title}
        getOptionValue={(e) => e.pk || e.id || e.value}
        classNamePrefix="custom-select"
        className={className}
      />
    ) : (
      <Select
        name={name}
        options={options}
        defaultOptions={options}
        value={value}
        placeholder={`انتخاب ${placeholder}`}
        isMulti={isMulti}
        onChange={onChange}
        getOptionLabel={(e) => e.value || e.label || e.name || e.title_en || e.title}
        getOptionValue={(e) => e.pk || e.id || e.value}
        classNamePrefix="custom-select"
        className={className}
      />
    )
  );
};

export default Select2Component;
