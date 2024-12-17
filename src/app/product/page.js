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

const ListProductPage = () => {
  const columns = [
    {
      title: "محصول",
      render: (data, type, row) => {
        return `<div class="d-flex justify-content-start align-items-center product-name">
          <div class="avatar-wrapper">
            <div class="avatar avatar me-2 rounded-2 bg-label-secondary">
              <img src="${row.images[0]}" alt="${row.part_number_en}" class="rounded-2">
            </div>
          </div>
          <div class="d-flex flex-column">
            <h6 class="text-body text-nowrap mb-0">${row.part_number_en}</h6>
            <small class="text-muted text-truncate d-none d-sm-block">${row.part_number_fa}</small>
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
            <IconEdit onClick size={16} />
            <IconTrash onClick size={16} />
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
    { 'label': 'روز', 'icon': <i class="ti ti-sun me-2"></i>, onClick: () => btnPrint.click() },
    { 'label': 'شب', 'icon': <i class="ti ti-moon me-2"></i>, onClick: () => btnCsv.click() },
    { 'label': 'سیستم', 'icon': <i class="ti ti-device-desktop me-2"></i>, onClick: () => btnCopy.click() },
  ]


  return (
    <Fragment>
      <div class="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
        <div class="layout-container">
          <nav class="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme" id="layout-navbar">
            <div class="container-xxl">
              <div class="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4">
                <a class="app-brand-link gap-2" href="index.html">
                  <span class="app-brand-logo demo">
                    <img src='/logo-sm.svg' />
                  </span>
                  <span class="app-brand-text demo menu-text fw-bold">میکرومدرن</span>
                </a>
                <a class="layout-menu-toggle menu-link text-large ms-auto d-xl-none" href="javascript:void(0);">
                  <i class="ti ti-x ti-sm align-middle"></i>
                </a>
              </div>
              <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                  <i class="ti ti-menu-2 ti-sm"></i>
                </a>
              </div>
              <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                <ul class="navbar-nav flex-row align-items-center ms-auto">
                  <CustomDropdown noCaret icon={<i class="ti ti-md ti-sun"></i>} items={items} />

                  <li class="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
                    <a class="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown" href="javascript:void(0);">
                      <i class="ti ti-md ti-sun"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end dropdown-styles">
                      <li>
                        <a class="dropdown-item" data-theme="light" href="javascript:void(0);">
                          <span class="align-middle">
                            <i class="ti ti-sun me-2"></i>
                            روز
                          </span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" data-theme="dark" href="javascript:void(0);">
                          <span class="align-middle">
                            <i class="ti ti-moon me-2"></i>
                            شب
                          </span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" data-theme="system" href="javascript:void(0);">
                          <span class="align-middle">
                            <i class="ti ti-device-desktop me-2"></i>
                            سیستم
                          </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
                    <a aria-expanded="false" class="nav-link dropdown-toggle hide-arrow" data-bs-auto-close="outside" data-bs-toggle="dropdown" href="javascript:void(0);">
                      <i class="ti ti-bell ti-md"></i>
                      <span class="badge bg-danger rounded-pill badge-notifications">5</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end py-0">
                      <li class="dropdown-menu-header border-bottom">
                        <div class="dropdown-header d-flex align-items-center py-3">
                          <h5 class="text-body mb-0 me-auto">اعلانات</h5>
                          <a class="dropdown-notifications-all text-body" data-bs-placement="top" data-bs-toggle="tooltip" href="javascript:void(0)" title="همه خوانده شده">
                            <i class="ti ti-mail-opened fs-4"></i>
                          </a>
                        </div>
                      </li>
                      <li class="dropdown-notifications-list scrollable-container">
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item list-group-item-action dropdown-notifications-item">
                            <div class="d-flex">
                              <div class="flex-shrink-0 me-3">
                                <div class="avatar">
                                  <img alt class="h-auto rounded-circle" src="/images/1.png" />
                                </div>
                              </div>
                              <div class="flex-grow-1">
                                <h6 class="mb-2">تبریک به شما 🎉</h6>
                                <p class="mb-1">نشان برترین فروشنده ماه رو گرفتید</p>
                                <small class="text-muted">الان</small>
                              </div>
                              <div class="flex-shrink-0 dropdown-notifications-actions">
                                <a class="dropdown-notifications-read" href="javascript:void(0)">
                                  <span class="badge badge-dot"></span>
                                </a>
                                <a class="dropdown-notifications-archive" href="javascript:void(0)">
                                  <span class="ti ti-x"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li class="list-group-item list-group-item-action dropdown-notifications-item">
                            <div class="d-flex">
                              <div class="flex-shrink-0 me-3">
                                <div class="avatar">
                                  <span class="avatar-initial rounded-circle bg-label-danger">ن‌م</span>
                                </div>
                              </div>
                              <div class="flex-grow-1">
                                <h6 class="mb-2">نوید محمدزاده</h6>
                                <p class="mb-1">درخواست شمارا پذیرفت.</p>
                                <small class="text-muted">1 ساعت قبل</small>
                              </div>
                              <div class="flex-shrink-0 dropdown-notifications-actions">
                                <a class="dropdown-notifications-read" href="javascript:void(0)">
                                  <span class="badge badge-dot"></span>
                                </a>
                                <a class="dropdown-notifications-archive" href="javascript:void(0)">
                                  <span class="ti ti-x"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                            <div class="d-flex">
                              <div class="flex-shrink-0 me-3">
                                <div class="avatar">
                                  <img alt class="h-auto rounded-circle" src="../../assets/img/avatars/2.png" />
                                </div>
                              </div>
                              <div class="flex-grow-1">
                                <h6 class="mb-2">پیام جدید از بهاره ✉️</h6>
                                <p class="mb-1">شما یک پیام جدید از بهاره افشاری دارید</p>
                                <small class="text-muted">12 ساعت قبل</small>
                              </div>
                              <div class="flex-shrink-0 dropdown-notifications-actions">
                                <a class="dropdown-notifications-read" href="javascript:void(0)">
                                  <span class="badge badge-dot"></span>
                                </a>
                                <a class="dropdown-notifications-archive" href="javascript:void(0)">
                                  <span class="ti ti-x"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li class="list-group-item list-group-item-action dropdown-notifications-item">
                            <div class="d-flex">
                              <div class="flex-shrink-0 me-3">
                                <div class="avatar">
                                  <span class="avatar-initial rounded-circle bg-label-success">
                                    <i class="ti ti-shopping-cart"></i>
                                  </span>
                                </div>
                              </div>
                              <div class="flex-grow-1">
                                <h6 class="mb-2">ایول! سفارش جدید داری 🛒</h6>
                                <p class="mb-1">شرکت یلدا سفارشی جدید ثبت کرد</p>
                                <small class="text-muted">امروز</small>
                              </div>
                              <div class="flex-shrink-0 dropdown-notifications-actions">
                                <a class="dropdown-notifications-read" href="javascript:void(0)">
                                  <span class="badge badge-dot"></span>
                                </a>
                                <a class="dropdown-notifications-archive" href="javascript:void(0)">
                                  <span class="ti ti-x"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                            <div class="d-flex">
                              <div class="flex-shrink-0 me-3">
                                <div class="avatar">
                                  <img alt class="h-auto rounded-circle" src="../../assets/img/avatars/9.png" />
                                </div>
                              </div>
                              <div class="flex-grow-1">
                                <h6 class="mb-2">اپلیکیشن بروزرسانی شد 🚀</h6>
                                <p class="mb-1">پروژه شما باموفقیت آپدیت شد.</p>
                                <small class="text-muted">دیروز</small>
                              </div>
                              <div class="flex-shrink-0 dropdown-notifications-actions">
                                <a class="dropdown-notifications-read" href="javascript:void(0)">
                                  <span class="badge badge-dot"></span>
                                </a>
                                <a class="dropdown-notifications-archive" href="javascript:void(0)">
                                  <span class="ti ti-x"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                            <div class="d-flex">
                              <div class="flex-shrink-0 me-3">
                                <div class="avatar">
                                  <span class="avatar-initial rounded-circle bg-label-success">
                                    <i class="ti ti-chart-pie"></i>
                                  </span>
                                </div>
                              </div>
                              <div class="flex-grow-1">
                                <h6 class="mb-2">گزارش ماهانه دردسترس است</h6>
                                <p class="mb-1">گزارش درآمد ماه شهریور آماده است</p>
                                <small class="text-muted">2 روز قبل</small>
                              </div>
                              <div class="flex-shrink-0 dropdown-notifications-actions">
                                <a class="dropdown-notifications-read" href="javascript:void(0)">
                                  <span class="badge badge-dot"></span>
                                </a>
                                <a class="dropdown-notifications-archive" href="javascript:void(0)">
                                  <span class="ti ti-x"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                            <div class="d-flex">
                              <div class="flex-shrink-0 me-3">
                                <div class="avatar">
                                  <img alt class="h-auto rounded-circle" src="../../assets/img/avatars/5.png" />
                                </div>
                              </div>
                              <div class="flex-grow-1">
                                <h6 class="mb-2">ارسال درخواست همکاری</h6>
                                <p class="mb-1">حسام درخواست همکاری فرستاد</p>
                                <small class="text-muted">1 هفته قبل</small>
                              </div>
                              <div class="flex-shrink-0 dropdown-notifications-actions">
                                <a class="dropdown-notifications-read" href="javascript:void(0)">
                                  <span class="badge badge-dot"></span>
                                </a>
                                <a class="dropdown-notifications-archive" href="javascript:void(0)">
                                  <span class="ti ti-x"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li class="list-group-item list-group-item-action dropdown-notifications-item">
                            <div class="d-flex">
                              <div class="flex-shrink-0 me-3">
                                <div class="avatar">
                                  <img alt class="h-auto rounded-circle" src="../../assets/img/avatars/6.png" />
                                </div>
                              </div>
                              <div class="flex-grow-1">
                                <h6 class="mb-2">پیام جدید از ترانه</h6>
                                <p class="mb-1">شما یک پیام جدید دارید</p>
                                <small class="text-muted">1 ماه قبل</small>
                              </div>
                              <div class="flex-shrink-0 dropdown-notifications-actions">
                                <a class="dropdown-notifications-read" href="javascript:void(0)">
                                  <span class="badge badge-dot"></span>
                                </a>
                                <a class="dropdown-notifications-archive" href="javascript:void(0)">
                                  <span class="ti ti-x"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                          <li class="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                            <div class="d-flex">
                              <div class="flex-shrink-0 me-3">
                                <div class="avatar">
                                  <span class="avatar-initial rounded-circle bg-label-warning">
                                    <i class="ti ti-alert-triangle"></i>
                                  </span>
                                </div>
                              </div>
                              <div class="flex-grow-1">
                                <h6 class="mb-2">میزان مصرف CPU بالاست</h6>
                                <p class="mb-1">درصد استفاده از CPU درحال حاضر 90%</p>
                                <small class="text-muted">1 ماه قبل</small>
                              </div>
                              <div class="flex-shrink-0 dropdown-notifications-actions">
                                <a class="dropdown-notifications-read" href="javascript:void(0)">
                                  <span class="badge badge-dot"></span>
                                </a>
                                <a class="dropdown-notifications-archive" href="javascript:void(0)">
                                  <span class="ti ti-x"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li class="dropdown-menu-footer border-top">
                        <a class="dropdown-item d-flex justify-content-center text-primary p-2 h-px-40 mb-1 align-items-center" href="javascript:void(0);">
                          نمایش همه اعلانات
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item navbar-dropdown dropdown-user dropdown">
                    <a class="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown" href="javascript:void(0);">
                      <div class="avatar avatar-online">
                        <img alt class="h-auto rounded-circle" src="/images/1.png" />
                      </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li>
                        <a class="dropdown-item" href="pages-account-settings-account.html">
                          <div class="d-flex">
                            <div class="flex-shrink-0 me-3">
                              <div class="avatar avatar-online">
                                <img alt class="h-auto rounded-circle" src="/images/1.png" />
                              </div>
                            </div>
                            <div class="flex-grow-1">
                              <span class="fw-semibold d-block mb-1">نوید محمدزاده</span>
                              <small class="text-muted">مدیرکل</small>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <div class="dropdown-divider"></div>
                      </li>
                      <li>
                        <a class="dropdown-item" href="pages-profile-user.html">
                          <i class="ti ti-user-check me-2 ti-sm"></i>
                          <span class="align-middle">پروفایل من</span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="pages-account-settings-account.html">
                          <i class="ti ti-settings me-2 ti-sm"></i>
                          <span class="align-middle">تنظیمات</span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="pages-account-settings-billing.html">
                          <span class="d-flex align-items-center align-middle">
                            <i class="flex-shrink-0 ti ti-credit-card me-2 ti-sm"></i>
                            <span class="flex-grow-1 align-middle">خریدها</span>
                            <span class="flex-shrink-0 badge badge-center rounded-pill bg-label-danger w-px-20 h-px-20">2
                            </span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <div class="dropdown-divider"></div>
                      </li>
                      <li>
                        <a class="dropdown-item" href="pages-faq.html">
                          <i class="ti ti-help me-2 ti-sm"></i>
                          <span class="align-middle">سوالات متداول</span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="pages-pricing.html">
                          <i class="ti ti-currency-dollar me-2 ti-sm"></i>
                          <span class="align-middle">قیمت گذاری</span>
                        </a>
                      </li>
                      <li>
                        <div class="dropdown-divider"></div>
                      </li>
                      <li>
                        <a class="dropdown-item" href="auth-login-cover.html" target="_blank">
                          <i class="ti ti-logout me-2 ti-sm"></i>
                          <span class="align-middle">خروج از حساب</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="navbar-search-wrapper search-input-wrapper container-xxl d-none">
                <input aria-label="جستجو..." class="form-control search-input border-0" placeholder="جستجو..." type="text" />
                <i class="ti ti-x ti-sm search-toggler cursor-pointer"></i>
              </div>
            </div>
          </nav>
          <div class="layout-page">
            <div class="content-wrapper">
              <aside class="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0" id="layout-menu">
                <div class="container-xxl d-flex h-100">
                  <ul class="menu-inner">
                    <li class="menu-item">
                      <a class="menu-link menu-toggle" href="javascript:void(0)">
                        <i class="menu-icon tf-icons ti ti-file"></i>
                        <div data-i18n="Pages">صفحات سایت</div>
                      </a>
                      <ul class="menu-sub">
                        <li class="menu-item">
                          <a class="menu-link menu-toggle" href="javascript:void(0);">
                            <i class="menu-icon tf-icons ti ti-box"></i>
                            <div data-i18n="Front Pages">محصولات</div>
                          </a>
                          <ul class="menu-sub">
                            <li class="menu-item">
                              <a class="menu-link" href="/product/" target="_blank">
                                <div data-i18n="Landing">لیست محصولات</div>
                              </a>
                            </li>
                            <li class="menu-item">
                              <a class="menu-link" href="/product/save/" target="_blank">
                                <div data-i18n="Pricing">افزودن محصول</div>
                              </a>
                            </li>
                            <li class="menu-item">
                              <a class="menu-link" href="/category/" target="_blank">
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
