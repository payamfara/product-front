import { Dropdown } from "react-bootstrap";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const DropdownNotification = ({items}) => {
  return (
    <Dropdown className="dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
      <Dropdown.Toggle
        variant=""
        className={`nav-link d-flex gap-1 h-100 no-caret`}
        id="dropdown-custom"
      >
        <i className="ti ti-bell ti-md"></i>
        <span className="badge bg-danger rounded-pill badge-notifications">5</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-end py-0">
        <li className="dropdown-menu-header border-bottom">
          <div className="dropdown-header d-flex align-items-center py-3">
            <h5 className="text-body mb-0 me-auto">اعلانات</h5>
            <a
              className="dropdown-notifications-all text-body"
              data-bs-placement="top"
              data-bs-toggle="tooltip"
              role="button"
              title="همه خوانده شده"
            >
              <i className="ti ti-mail-opened fs-4"></i>
            </a>
          </div>
        </li>
        <PerfectScrollbar options={{ suppressScrollX: true }}  className="dropdown-notifications-list scrollable-container">
          <ul className="list-group list-group-flush">
            {/* {items.map(item=>{
                <li className="list-group-item list-group-item-action dropdown-notifications-item">
                <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                    <div className="avatar">
                        <img
                        alt
                        className="h-auto rounded-circle"
                        src={item.img}
                        />
                    </div>
                    </div>
                    <div className="flex-grow-1">
                    <h6 className="mb-2">{item.title}</h6>
                    <p className="mb-1">{item.msg}</p>
                    <small className="text-muted">{item.date}</small>
                    </div>
                    <div className="flex-shrink-0 dropdown-notifications-actions">
                    <a
                        className="dropdown-notifications-read"
                        role="button"
                    >
                        <span className="badge badge-dot"></span>
                    </a>
                    <a
                        className="dropdown-notifications-archive"
                        role="button"
                        onClick={()=>handleDelete(index)}
                    >
                        <span className="ti ti-x"></span>
                    </a>
                    </div>
                </div>
                </li>

            })} */}
            <li className="list-group-item list-group-item-action dropdown-notifications-item">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar">
                    <img
                      alt
                      className="h-auto rounded-circle"
                      src="/images/1.png"
                    />
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-2">تبریک به شما 🎉</h6>
                  <p className="mb-1">نشان برترین فروشنده ماه رو گرفتید</p>
                  <small className="text-muted">الان</small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <a
                    className="dropdown-notifications-read"
                    role="button"
                  >
                    <span className="badge badge-dot"></span>
                  </a>
                  <a
                    className="dropdown-notifications-archive"
                    role="button"
                  >
                    <span className="ti ti-x"></span>
                  </a>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar">
                    <span className="avatar-initial rounded-circle bg-label-danger">
                      ن‌م
                    </span>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-2">نوید محمدزاده</h6>
                  <p className="mb-1">درخواست شمارا پذیرفت.</p>
                  <small className="text-muted">1 ساعت قبل</small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <a
                    className="dropdown-notifications-read"
                    role="button"
                  >
                    <span className="badge badge-dot"></span>
                  </a>
                  <a
                    className="dropdown-notifications-archive"
                    role="button"
                  >
                    <span className="ti ti-x"></span>
                  </a>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar">
                    <img
                      alt
                      className="h-auto rounded-circle"
                      src="/images/1.png"
                    />
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-2">پیام جدید از بهاره ✉️</h6>
                  <p className="mb-1">شما یک پیام جدید از بهاره افشاری دارید</p>
                  <small className="text-muted">12 ساعت قبل</small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <a
                    className="dropdown-notifications-read"
                    role="button"
                  >
                    <span className="badge badge-dot"></span>
                  </a>
                  <a
                    className="dropdown-notifications-archive"
                    role="button"
                  >
                    <span className="ti ti-x"></span>
                  </a>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar">
                    <span className="avatar-initial rounded-circle bg-label-success">
                      <i className="ti ti-shopping-cart"></i>
                    </span>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-2">ایول! سفارش جدید داری 🛒</h6>
                  <p className="mb-1">شرکت یلدا سفارشی جدید ثبت کرد</p>
                  <small className="text-muted">امروز</small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <a
                    className="dropdown-notifications-read"
                    role="button"
                  >
                    <span className="badge badge-dot"></span>
                  </a>
                  <a
                    className="dropdown-notifications-archive"
                    role="button"
                  >
                    <span className="ti ti-x"></span>
                  </a>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar">
                    <img
                      alt
                      className="h-auto rounded-circle"
                      src="/images/1.png"
                    />
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-2">اپلیکیشن بروزرسانی شد 🚀</h6>
                  <p className="mb-1">پروژه شما باموفقیت آپدیت شد.</p>
                  <small className="text-muted">دیروز</small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <a
                    className="dropdown-notifications-read"
                    role="button"
                  >
                    <span className="badge badge-dot"></span>
                  </a>
                  <a
                    className="dropdown-notifications-archive"
                    role="button"
                  >
                    <span className="ti ti-x"></span>
                  </a>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar">
                    <span className="avatar-initial rounded-circle bg-label-success">
                      <i className="ti ti-chart-pie"></i>
                    </span>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-2">گزارش ماهانه دردسترس است</h6>
                  <p className="mb-1">گزارش درآمد ماه شهریور آماده است</p>
                  <small className="text-muted">2 روز قبل</small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <a
                    className="dropdown-notifications-read"
                    role="button"
                  >
                    <span className="badge badge-dot"></span>
                  </a>
                  <a
                    className="dropdown-notifications-archive"
                    role="button"
                  >
                    <span className="ti ti-x"></span>
                  </a>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar">
                    <img
                      alt
                      className="h-auto rounded-circle"
                      src="/images/1.png"
                    />
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-2">ارسال درخواست همکاری</h6>
                  <p className="mb-1">حسام درخواست همکاری فرستاد</p>
                  <small className="text-muted">1 هفته قبل</small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <a
                    className="dropdown-notifications-read"
                    role="button"
                  >
                    <span className="badge badge-dot"></span>
                  </a>
                  <a
                    className="dropdown-notifications-archive"
                    role="button"
                  >
                    <span className="ti ti-x"></span>
                  </a>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar">
                    <img
                      alt
                      className="h-auto rounded-circle"
                      src="/images/1.png"
                    />
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-2">پیام جدید از ترانه</h6>
                  <p className="mb-1">شما یک پیام جدید دارید</p>
                  <small className="text-muted">1 ماه قبل</small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <a
                    className="dropdown-notifications-read"
                    role="button"
                  >
                    <span className="badge badge-dot"></span>
                  </a>
                  <a
                    className="dropdown-notifications-archive"
                    role="button"
                  >
                    <span className="ti ti-x"></span>
                  </a>
                </div>
              </div>
            </li>
            <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar">
                    <span className="avatar-initial rounded-circle bg-label-warning">
                      <i className="ti ti-alert-triangle"></i>
                    </span>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-2">میزان مصرف CPU بالاست</h6>
                  <p className="mb-1">درصد استفاده از CPU درحال حاضر 90%</p>
                  <small className="text-muted">1 ماه قبل</small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <a
                    className="dropdown-notifications-read"
                    role="button"
                  >
                    <span className="badge badge-dot"></span>
                  </a>
                  <a
                    className="dropdown-notifications-archive"
                    role="button"
                  >
                    <span className="ti ti-x"></span>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </PerfectScrollbar >
        <li className="dropdown-menu-footer border-top">
          <a
            className="dropdown-item d-flex justify-content-center text-primary p-2 h-px-40 mb-1 align-items-center"
            role="button"
          >
            نمایش همه اعلانات
          </a>
        </li>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownNotification;