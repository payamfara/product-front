"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";

const Select2Component = ({
  name,
  asyncUrl,
  isAsync = false,
  placeholder = "Select an option",
  isMulti = false,
  onChange,
  options = [],
  defaultValue
}) => {
  const [defaultOptions, setDefaultOptions] = useState([]);
  const handleOptions = async (inputValue) => {
    try {
      const response = await fetch(`${asyncUrl}?term=${inputValue}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchDefaultOptions = async () => {
      const options = await handleOptions("");
      setDefaultOptions(options);
    };
    fetchDefaultOptions();
  }, []);

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    
    if (onChange) onChange(selectedOption);
  };

  const customStyles = {
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "#e0f7fa",
      borderRadius: "5px",
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#00796b",
    }),
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
          placeholder={placeholder}
          isMulti={isMulti}
          onChange={handleChange}
          getOptionLabel={(e) => e.label || e.name || e.value}
          getOptionValue={(e) => e.id || e.value}
          classNamePrefix="custom-select"
        />
      ) : (
        <Select
          name={name}
          options={options}
          defaultValue={defaultValue} 
          placeholder={placeholder}
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
