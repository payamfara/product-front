import { Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { getFirstLetters } from "../utils/funcs";

const CustomDropdown = ({
  data,
  hasSpace = false,
  hasDivider = false,
  isScrollale = false,
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant={data.toggle.variant}
        className={`${data.toggle.className} d-flex gap-1 h-100`}
      >
        {data.toggle.img ? (
          <div className="avatar">
            <img
              alt=""
              className="h-auto rounded-circle"
              src={data.toggle.img}
            />
          </div>
        ) : (
          data.toggle.icon
        )}
        {data.toggle.title}
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={`dropdown-menu dropdown-menu-end ${hasSpace ? "" : "py-0"}`}
      >
        {data.header && (
          <Fragment>
            <Dropdown.Header className="d-flex align-items-center py-3">
              <h5 className="text-body mb-0 me-auto">{data.header.title}</h5>
              {data.header.icon}
            </Dropdown.Header>
            <Dropdown.Divider className={`${hasSpace ? "" : "m-0"}`} />
          </Fragment>
        )}
        <PerfectScrollbar
          options={{ suppressScrollX: true, suppressScrollY: !isScrollale }}
          className="dropdown-notifications-list scrollable-container"
        >
          {data.items.map((item, index) => {
            const arr = Array.isArray(item) ? item : [item];
            return (
              <Fragment key={index}>
                {arr.map((arrItem, arrIndex) =>
                  !arrItem.msg ? (
                    <Dropdown.Item key={arrIndex} onClick={arrItem.onClick}>
                      {arrItem.img ? (
                        <img
                          alt=""
                          className="h-auto rounded-circle"
                          src={arrItem.img}
                        />
                      ) : (
                        arrItem.icon
                      )}
                      {arrItem.title}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item
                      key={arrIndex}
                      onClick={arrItem.onClick}
                      className={`w-100 ${hasSpace ? "" : "m-0 p-3"}`}
                    >
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar">
                            {arrItem.img ? (
                              <img
                                alt=""
                                className="h-auto rounded-circle"
                                src={arrItem.img}
                              />
                            ) : arrItem.icon ? (
                              <span className="avatar-initial rounded-circle bg-label-success">
                                {arrItem.icon}
                              </span>
                            ) : (
                              <span className="avatar-initial rounded-circle bg-label-success">
                                {getFirstLetters(arrItem.title)}
                              </span>
                            )}
                          </div>
                        </div>
                        {arrItem.date ? (
                          <div className="flex-grow-1">
                            <h6 className="mb-2">{arrItem.title}</h6>
                            <p className="mb-1">{arrItem.msg}</p>
                            <small className="text-muted">{arrItem.date}</small>
                          </div>
                        ) : (
                          <div className="flex-grow-1">
                            <h6 className="fw-semibold d-block mb-1">
                              {arrItem.title}
                            </h6>
                            <small className="text-muted">{arrItem.msg}</small>
                          </div>
                        )}
                      </div>
                    </Dropdown.Item>
                  )
                )}
                {index !== data.items.length - 1 && hasDivider && (
                  <Dropdown.Divider className={`${hasSpace ? "" : "m-0"}`} />
                )}
              </Fragment>
            );
          })}
        </PerfectScrollbar>
        {data.footer && (
          <div className="dropdown-menu-footer border-top">
            <Dropdown.Item className="d-flex justify-content-center text-primary p-2 h-px-40 mb-1 align-items-center">
              {data.footer.title}
            </Dropdown.Item>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropdown;
