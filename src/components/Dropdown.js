import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const CustomDropdown = ({ items, title = 'Click Me'}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-custom">
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((item, index) => (
          <Dropdown.Item
            key={index}
            href={item.href || '#'}
          >
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropdown;
