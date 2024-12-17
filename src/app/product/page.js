"use client";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import { Fragment, useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { baseApiAuth } from "../../api/baseApi";
import CustomLoading from "../../components/Loading";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { createRoot } from "react-dom/client";
import { IconBox } from "@tabler/icons-react";
import CustomDropdown from "@/src/components/Dropdown";
import DropdownNotification from "@/src/components/DropdownNotification";

const ListProductPage = () => {
  const columns = [
    {
      title: "محصول",
      render: (data, type, row) => {
        return `<div className="d-flex justify-content-start align-items-center product-name">
          <div className="avatar-wrapper">
            <div className="avatar avatar me-2 rounded-2 bg-label-secondary">
              <img src="${row.images[0]}" alt="${row.part_number_en}" className="rounded-2">
            </div>
          </div>
          <div className="d-flex flex-column">
            <h6 className="text-body text-nowrap mb-0">${row.part_number_en}</h6>
            <small className="text-muted text-truncate d-none d-sm-block">${row.part_number_fa}</small>
          </div>
        </div>`;
      },
    },
    { title: "دسته بندی", data: "category_str" },
    { title: "کد محصول", data: "id" },
    {
      title: "قیمت",
      data: "price",
      render: (data, type, row) => data + " تومان",
    },
    {
      title: "عملیات",
      render: (data, type, row) => {
        const container = document.createElement("div");
        container.className = "d-flex gap-2";

        const root = createRoot(container);
        root.render(
          <Fragment>
            <IconEdit size={16} />
            <IconTrash size={16} />
          </Fragment>
        );

        return container;
      },
    },
  ];

  const [data, setData] = useState([]);
  const fetchProducts = async () => {
    const requestUrl = `/api2/product/`;
    const response = await baseApiAuth.get(requestUrl);
    const results = response.data.results;
    return results;
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts();
      console.log("data", data);

      setData(data);
    };
    loadData();
  }, []);

  if (!data.length) {
    return <CustomLoading />;
  }

  const items = [
    { 'label': 'روز', 'icon': <i className="ti ti-sun me-2"></i>, onClick: () => btnPrint.click() },
    { 'label': 'شب', 'icon': <i className="ti ti-moon me-2"></i>, onClick: () => btnCsv.click() },
    { 'label': 'سیستم', 'icon': <i className="ti ti-device-desktop me-2"></i>, onClick: () => btnCopy.click() },
  ]


  return (
    <Fragment>
      <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
        <div className="layout-container">
          <nav className="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme" id="layout-navbar">
            <div className="container-xxl">
              <div className="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4">
                <a className="app-brand-link gap-2" href="index.html">
                  <span className="app-brand-logo demo">
                    <img alt="logo" src='/logo-sm.svg' />
                  </span>
                  <span className="app-brand-text demo menu-text fw-bold">میکرومدرن</span>
                </a>
                <a className="layout-menu-toggle menu-link text-large ms-auto d-xl-none" href="javascript:void(0);">
                  <i className="ti ti-x ti-sm align-middle"></i>
                </a>
              </div>
              <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                  <i className="ti ti-menu-2 ti-sm"></i>
                </a>
              </div>
              <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  <li className="nav-item">
                    <CustomDropdown toggleClass="nav-link no-caret" icon={<i className="ti ti-md ti-sun"></i>} items={items} />
                  </li>
                  <li className="nav-item">
                    <DropdownNotification />
                  </li>
                  <li className="nav-item navbar-dropdown dropdown-user dropdown">
                    <a className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown" href="javascript:void(0);">
                      <div className="avatar avatar-online">
                        <img className="h-auto rounded-circle" src="/images/1.png" />
                      </div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="pages-account-settings-account.html">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar avatar-online">
                                <img className="h-auto rounded-circle" src="/images/1.png" />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <span className="fw-semibold d-block mb-1">نوید محمدزاده</span>
                              <small className="text-muted">مدیرکل</small>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <div className="dropdown-divider"></div>
                      </li>
                      <li>
                        <a className="dropdown-item" href="pages-profile-user.html">
                          <i className="ti ti-user-check me-2 ti-sm"></i>
                          <span className="align-middle">پروفایل من</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="pages-account-settings-account.html">
                          <i className="ti ti-settings me-2 ti-sm"></i>
                          <span className="align-middle">تنظیمات</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="pages-account-settings-billing.html">
                          <span className="d-flex align-items-center align-middle">
                            <i className="flex-shrink-0 ti ti-credit-card me-2 ti-sm"></i>
                            <span className="flex-grow-1 align-middle">خریدها</span>
                            <span className="flex-shrink-0 badge badge-center rounded-pill bg-label-danger w-px-20 h-px-20">2
                            </span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <div className="dropdown-divider"></div>
                      </li>
                      <li>
                        <a className="dropdown-item" href="pages-faq.html">
                          <i className="ti ti-help me-2 ti-sm"></i>
                          <span className="align-middle">سوالات متداول</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="pages-pricing.html">
                          <i className="ti ti-currency-dollar me-2 ti-sm"></i>
                          <span className="align-middle">قیمت گذاری</span>
                        </a>
                      </li>
                      <li>
                        <div className="dropdown-divider"></div>
                      </li>
                      <li>
                        <a className="dropdown-item" href="auth-login-cover.html" target="_blank">
                          <i className="ti ti-logout me-2 ti-sm"></i>
                          <span className="align-middle">خروج از حساب</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="navbar-search-wrapper search-input-wrapper container-xxl d-none">
                <input aria-label="جستجو..." className="form-control search-input border-0" placeholder="جستجو..." type="text" />
                <i className="ti ti-x ti-sm search-toggler cursor-pointer"></i>
              </div>
            </div>
          </nav>
          <div className="layout-page">
            <div className="content-wrapper">
              <aside className="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0" id="layout-menu">
                <div className="container-xxl d-flex h-100">
                  <ul className="menu-inner">
                    <li className="menu-item">
                      <a className="menu-link menu-toggle" href="javascript:void(0)">
                        <i className="menu-icon tf-icons ti ti-file"></i>
                        <div data-i18n="Pages">صفحات سایت</div>
                      </a>
                      <ul className="menu-sub">
                        <li className="menu-item">
                          <a className="menu-link menu-toggle" href="javascript:void(0);">
                            <i className="menu-icon tf-icons ti ti-box"></i>
                            <div data-i18n="Front Pages">محصولات</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a className="menu-link" href="/product/" target="_blank">
                                <div data-i18n="Landing">لیست محصولات</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="/product/save/" target="_blank">
                                <div data-i18n="Pricing">افزودن محصول</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="/category/" target="_blank">
                                <div data-i18n="Payment">دسته بندی</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </aside>
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="py-3 mb-4">
                  <span className="text-muted fw-light"> صفحه اصلی / </span>
                  لیست محصولات
                </h4>
                <div className="card">
                  <div className="card-header d-flex flex-wrap row-cols-3">
                    <h5 className="card-title mb-0 col-12">لیست محصولات</h5>
                    <div className="p-2">
                      <DynamicAttributeField
                        data={{
                          attribute_name_en: "status",
                          attribute_name_fa: "وضعیت",
                          attr_type: {
                            type: "select_2",
                            url: "/api2/myapp-choice/?title=status",
                          },
                        }}
                      />
                    </div>
                    <div className="p-2">
                      <DynamicAttributeField
                        data={{
                          attribute_name_en: "category",
                          attribute_name_fa: "دسته بندی",
                          attr_type: {
                            type: "select_2",
                            url: "/api2/myapp-category/?",
                          },
                        }}
                      />
                    </div>
                    <div className="p-2">
                      <DynamicAttributeField
                        data={{
                          attribute_name_en: "status",
                          attribute_name_fa: "وضعیت انبار",
                          attr_type: {
                            type: "select_2",
                            url: "/api2/myapp-category/?",
                          },
                        }}
                      />
                    </div>
                  </div>
                  <DataTable data={data} columns={columns} />
                </div>
              </div>
              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
      <div className="drag-target"></div>
    </Fragment>
  );
};

export default ListProductPage;
