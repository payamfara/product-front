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
  defaultValue,
}) => {
  const [defaultOptions, setDefaultOptions] = useState([]);
  
  const handleOptions = async (inputValue) => {
    const requestUrl = `${asyncUrl}?value_en__icontains=${inputValue}`;
    console.log('requestUrl', requestUrl);
    
    try {
      const res = await baseApiAuth.get(requestUrl);
      return res.data.results; 
    } catch (err) {
      console.error("Error fetching data:", err);
      return []; 
    }
  };

  useEffect(() => {
    const fetchDefaultOptions = async () => {
      const options = await handleOptions(defaultValue?.value);
      setDefaultOptions(options);
    };
    fetchDefaultOptions();
  }, []);

  const handleChange = (selectedOption) => {
    if (onChange) onChange(name, selectedOption);
  };

  return (
    <div>
      {isAsync ? (
        <AsyncSelect
          name={name}
          cacheOptions
          loadOptions={handleOptions}
          defaultOptions={defaultOptions}
          defaultValue={defaultValue}
          placeholder={`انتخاب ${placeholder}`}
          isMulti={isMulti}
          onChange={handleChange}
          getOptionLabel={(e) => e.value_en || e.label || e.name || e.value}
          getOptionValue={(e) => e.id || e.value}
          classNamePrefix="custom-select"
        />
      ) : (
        <Select
          name={name}
          options={options}
          defaultValue={defaultValue}
          placeholder={`انتخاب ${placeholder}`}
          isMulti={isMulti}
          onChange={handleChange}
          getOptionLabel={(e) => e.label || e.name || e.value}
          getOptionValue={(e) => e.id || e.value}
          classNamePrefix="custom-select"
        />
      )}
    </div>
  );
};

export default Select2Component;
