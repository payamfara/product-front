"use client";
import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

const Select2Component = ({
  asyncUrl, 
  isAsync = false, 
  placeholder = 'Select an option', 
  isMulti = false, 
  onChange, 
  options = [], 
}) => {
  const handleOptions = async (inputValue) => {
    try {
      const response = await fetch(`${asyncUrl}?term=${inputValue}`);
      const data = await response.json();
      return data.results; 
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const handleChange = (selectedOption) => {
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
          cacheOptions
          loadOptions={handleOptions}
          defaultOptions
          placeholder={placeholder}
          isMulti={isMulti}
          onChange={handleChange}
          getOptionLabel={(e) => e.label || e.name || e.value}
          getOptionValue={(e) => e.id || e.value}
          
        />
      ) : (
        <Select
          options={options} 
          placeholder={placeholder}
          isMulti={isMulti}
          onChange={handleChange}
          getOptionLabel={(e) => e.label || e.name || e.value}
          getOptionValue={(e) => e.id || e.value}
        />
      )}
    </div>
  );
};

export default Select2Component;
