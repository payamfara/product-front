import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const CustomDropdown = ({ items, icon, title = '', variant = '' , noCaret = false}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle className={`d-flex gap-1 h-100 ${noCaret? "no-caret" : ""}`} variant={""} id="dropdown-custom">
        {icon}
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((item, index) => (
          <Dropdown.Item
            key={index}
            href={item.href || '#'}
            onClick={item.onClick}
            className='fs-1 d-flex gap-1 text-secondary'
          >
            {item.icon}
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropdown;
