import React from 'react';
import { Dropdown, Nav } from 'react-bootstrap';

const MultilevelMenu = () => {
  return (
    <Nav className="p-3">
      <Dropdown>
        <Dropdown.Toggle className='rounded-pill bg-secondary border-secondary' variant="primary">
          منوی پنل
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown drop="end" as="div" className="dropdown-submenu">
            <Dropdown.Toggle as="button" className="dropdown-item">
              محصولات
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/product/">لیست</Dropdown.Item>
              <Dropdown.Item href="/product/save/">ایجاد</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown drop="end" as="div" className="dropdown-submenu">
            <Dropdown.Toggle as="button" className="dropdown-item">
              دسته بندی
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/category/">لیست</Dropdown.Item>
              <Dropdown.Item href="/category/save/">ایجاد</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
};

export default MultilevelMenu;
