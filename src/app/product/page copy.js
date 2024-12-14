"use client";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import RippleButton from "@/src/components/RippleButton/RippleButton";
import { Fragment } from "react";
import { FaDownload, FaFileExport, FaPlus } from "react-icons/fa";

const ListProductPage = () => {
  return (
    <Fragment>
      <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
        <div className="layout-container">
          <nav
            className="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div className="container-xxl">
              <div className="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4">
                <a className="app-brand-link gap-2" href="index.html">
                  <span className="app-brand-logo demo">
                    <svg
                      fill="none"
                      height="22"
                      viewBox="0 0 32 22"
                      width="32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                        fill="#7367F0"
                        fillRule="evenodd"
                      />
                      <path
                        clipRule="evenodd"
                        d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                        fill="#161616"
                        fillRule="evenodd"
                        opacity="0.06"
                      />
                      <path
                        clipRule="evenodd"
                        d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                        fill="#161616"
                        fillRule="evenodd"
                        opacity="0.06"
                      />
                      <path
                        clipRule="evenodd"
                        d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                        fill="#7367F0"
                        fillRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="app-brand-text demo menu-text fw-bold">
                    Vuexy
                  </span>
                </a>
                <a
                  className="layout-menu-toggle menu-link text-large ms-auto d-xl-none"
                  href="javascript:void(0);"
                >
                  <i className="ti ti-x ti-sm align-middle"></i>
                </a>
              </div>
              <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a
                  className="nav-item nav-link px-0 me-xl-4"
                  href="javascript:void(0)"
                >
                  <i className="ti ti-menu-2 ti-sm"></i>
                </a>
              </div>
              <div
                className="navbar-nav-right d-flex align-items-center"
                id="navbar-collapse"
              >
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  <li className="nav-item dropdown-language dropdown me-2 me-xl-0">
                    <a
                      className="nav-link dropdown-toggle hide-arrow"
                      data-bs-toggle="dropdown"
                      href="javascript:void(0);"
                    >
                      <i className="ti ti-language rounded-circle ti-md"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a
                          className="dropdown-item"
                          data-language="fa"
                          data-text-direction="rtl"
                          href="javascript:void(0);"
                        >
                          <span className="align-middle">فارسی</span>
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          data-language="en"
                          data-text-direction="ltr"
                          href="javascript:void(0);"
                        >
                          <span className="align-middle">انگلیسی</span>
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          data-language="fr"
                          data-text-direction="ltr"
                          href="javascript:void(0);"
                        >
                          <span className="align-middle">فرانسوی</span>
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          data-language="ar"
                          data-text-direction="rtl"
                          href="javascript:void(0);"
                        >
                          <span className="align-middle">عربي</span>
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          data-language="de"
                          data-text-direction="ltr"
                          href="javascript:void(0);"
                        >
                          <span className="align-middle">آلمانی</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item navbar-search-wrapper me-2 me-xl-0">
                    <a
                      className="nav-link search-toggler"
                      href="javascript:void(0);"
                    >
                      <i className="ti ti-search ti-md"></i>
                    </a>
                  </li>

                  <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
                    <a
                      aria-expanded="false"
                      className="nav-link dropdown-toggle hide-arrow"
                      data-bs-auto-close="outside"
                      data-bs-toggle="dropdown"
                      href="javascript:void(0);"
                    >
                      <i className="ti ti-layout-grid-add ti-md"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end py-0">
                      <div className="dropdown-menu-header border-bottom">
                        <div className="dropdown-header d-flex align-items-center py-3">
                          <h5 className="text-body mb-0 me-auto">میانبرها</h5>
                          <a
                            className="dropdown-shortcuts-add text-body"
                            data-bs-placement="top"
                            data-bs-toggle="tooltip"
                            href="javascript:void(0)"
                            title="افزودن میانبر"
                          >
                            <i className="ti ti-sm ti-apps"></i>
                          </a>
                        </div>
                      </div>
                      <div className="dropdown-shortcuts-list scrollable-container">
                        <div className="row row-bordered overflow-visible g-0">
                          <div className="dropdown-shortcuts-item col">
                            <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                              <i className="ti ti-calendar fs-4"></i>
                            </span>
                            <a
                              className="stretched-link mb-0"
                              href="app-calendar.html"
                            >
                              تقویم
                            </a>
                            <small className="text-muted mb-0">
                              قرارهای ملاقات
                            </small>
                          </div>
                          <div className="dropdown-shortcuts-item col">
                            <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                              <i className="ti ti-file-invoice fs-4"></i>
                            </span>
                            <a
                              className="stretched-link mb-0"
                              href="app-invoice-list.html"
                            >
                              صورتحساب‌
                            </a>
                            <small className="text-muted mb-0">
                              مدیریت پرداخت‌ها
                            </small>
                          </div>
                        </div>
                        <div className="row row-bordered overflow-visible g-0">
                          <div className="dropdown-shortcuts-item col">
                            <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                              <i className="ti ti-users fs-4"></i>
                            </span>
                            <a
                              className="stretched-link mb-0"
                              href="app-user-list.html"
                            >
                              مشتریان
                            </a>
                            <small className="text-muted mb-0">
                              مدیریت کاربران
                            </small>
                          </div>
                          <div className="dropdown-shortcuts-item col">
                            <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                              <i className="ti ti-lock fs-4"></i>
                            </span>
                            <a
                              className="stretched-link mb-0"
                              href="app-access-roles.html"
                            >
                              سطح دسترسی
                            </a>
                            <small className="text-muted mb-0">موارد امنیتی</small>
                          </div>
                        </div>
                        <div className="row row-bordered overflow-visible g-0">
                          <div className="dropdown-shortcuts-item col">
                            <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                              <i className="ti ti-chart-bar fs-4"></i>
                            </span>
                            <a className="stretched-link mb-0" href="index.html">
                              داشبورد
                            </a>
                            <small className="text-muted mb-0">گزارش آماری</small>
                          </div>
                          <div className="dropdown-shortcuts-item col">
                            <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                              <i className="ti ti-settings fs-4"></i>
                            </span>
                            <a
                              className="stretched-link mb-0"
                              href="pages-account-settings-account.html"
                            >
                              تنظیمات
                            </a>
                            <small className="text-muted mb-0">مدیریت سیستم</small>
                          </div>
                        </div>
                        <div className="row row-bordered overflow-visible g-0">
                          <div className="dropdown-shortcuts-item col">
                            <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                              <i className="ti ti-help fs-4"></i>
                            </span>
                            <a
                              className="stretched-link mb-0"
                              href="pages-faq.html"
                            >
                              مرکز پشتیبانی
                            </a>
                            <small className="text-muted mb-0">
                              سوالات متداول و راهنما
                            </small>
                          </div>
                          <div className="dropdown-shortcuts-item col">
                            <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                              <i className="ti ti-square fs-4"></i>
                            </span>
                            <a
                              className="stretched-link mb-0"
                              href="modal-examples.html"
                            >
                              مُـدال‌ها
                            </a>
                            <small className="text-muted mb-0">
                              پاپ‌آپ‌های کاربردی
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
                    <a
                      aria-expanded="false"
                      className="nav-link dropdown-toggle hide-arrow"
                      data-bs-auto-close="outside"
                      data-bs-toggle="dropdown"
                      href="javascript:void(0);"
                    >
                      <i className="ti ti-bell ti-md"></i>
                      <span className="badge bg-danger rounded-pill badge-notifications">
                        5
                      </span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end py-0">
                      <li className="dropdown-menu-header border-bottom">
                        <div className="dropdown-header d-flex align-items-center py-3">
                          <h5 className="text-body mb-0 me-auto">اعلانات</h5>
                          <a
                            className="dropdown-notifications-all text-body"
                            data-bs-placement="top"
                            data-bs-toggle="tooltip"
                            href="javascript:void(0)"
                            title="همه خوانده شده"
                          >
                            <i className="ti ti-mail-opened fs-4"></i>
                          </a>
                        </div>
                      </li>
                      <li className="dropdown-notifications-list scrollable-container">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item list-group-item-action dropdown-notifications-item">
                            <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar">
                                  <img
                                    className="h-auto rounded-circle"
                                    src="../../assets/img/avatars/1.png"
                                  />
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="mb-2">تبریک به شما 🎉</h6>
                                <p className="mb-1">
                                  نشان برترین فروشنده ماه رو گرفتید
                                </p>
                                <small className="text-muted">الان</small>
                              </div>
                              <div className="flex-shrink-0 dropdown-notifications-actions">
                                <a
                                  className="dropdown-notifications-read"
                                  href="javascript:void(0)"
                                >
                                  <span className="badge badge-dot"></span>
                                </a>
                                <a
                                  className="dropdown-notifications-archive"
                                  href="javascript:void(0)"
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
                                  href="javascript:void(0)"
                                >
                                  <span className="badge badge-dot"></span>
                                </a>
                                <a
                                  className="dropdown-notifications-archive"
                                  href="javascript:void(0)"
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
                                    className="h-auto rounded-circle"
                                    src="../../assets/img/avatars/2.png"
                                  />
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="mb-2">پیام جدید از بهاره ✉️</h6>
                                <p className="mb-1">
                                  شما یک پیام جدید از بهاره افشاری دارید
                                </p>
                                <small className="text-muted">12 ساعت قبل</small>
                              </div>
                              <div className="flex-shrink-0 dropdown-notifications-actions">
                                <a
                                  className="dropdown-notifications-read"
                                  href="javascript:void(0)"
                                >
                                  <span className="badge badge-dot"></span>
                                </a>
                                <a
                                  className="dropdown-notifications-archive"
                                  href="javascript:void(0)"
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
                                <p className="mb-1">
                                  شرکت یلدا سفارشی جدید ثبت کرد
                                </p>
                                <small className="text-muted">امروز</small>
                              </div>
                              <div className="flex-shrink-0 dropdown-notifications-actions">
                                <a
                                  className="dropdown-notifications-read"
                                  href="javascript:void(0)"
                                >
                                  <span className="badge badge-dot"></span>
                                </a>
                                <a
                                  className="dropdown-notifications-archive"
                                  href="javascript:void(0)"
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
                                    className="h-auto rounded-circle"
                                    src="../../assets/img/avatars/9.png"
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
                                  href="javascript:void(0)"
                                >
                                  <span className="badge badge-dot"></span>
                                </a>
                                <a
                                  className="dropdown-notifications-archive"
                                  href="javascript:void(0)"
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
                                <p className="mb-1">
                                  گزارش درآمد ماه شهریور آماده است
                                </p>
                                <small className="text-muted">2 روز قبل</small>
                              </div>
                              <div className="flex-shrink-0 dropdown-notifications-actions">
                                <a
                                  className="dropdown-notifications-read"
                                  href="javascript:void(0)"
                                >
                                  <span className="badge badge-dot"></span>
                                </a>
                                <a
                                  className="dropdown-notifications-archive"
                                  href="javascript:void(0)"
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
                                    className="h-auto rounded-circle"
                                    src="../../assets/img/avatars/5.png"
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
                                  href="javascript:void(0)"
                                >
                                  <span className="badge badge-dot"></span>
                                </a>
                                <a
                                  className="dropdown-notifications-archive"
                                  href="javascript:void(0)"
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
                                    className="h-auto rounded-circle"
                                    src="../../assets/img/avatars/6.png"
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
                                  href="javascript:void(0)"
                                >
                                  <span className="badge badge-dot"></span>
                                </a>
                                <a
                                  className="dropdown-notifications-archive"
                                  href="javascript:void(0)"
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
                                <p className="mb-1">
                                  درصد استفاده از CPU درحال حاضر 90%
                                </p>
                                <small className="text-muted">1 ماه قبل</small>
                              </div>
                              <div className="flex-shrink-0 dropdown-notifications-actions">
                                <a
                                  className="dropdown-notifications-read"
                                  href="javascript:void(0)"
                                >
                                  <span className="badge badge-dot"></span>
                                </a>
                                <a
                                  className="dropdown-notifications-archive"
                                  href="javascript:void(0)"
                                >
                                  <span className="ti ti-x"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown-menu-footer border-top">
                        <a
                          className="dropdown-item d-flex justify-content-center text-primary p-2 h-px-40 mb-1 align-items-center"
                          href="javascript:void(0);"
                        >
                          نمایش همه اعلانات
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item navbar-dropdown dropdown-user dropdown">
                    <a
                      className="nav-link dropdown-toggle hide-arrow"
                      data-bs-toggle="dropdown"
                      href="javascript:void(0);"
                    >
                      <div className="avatar avatar-online">
                        <img
                          className="h-auto rounded-circle"
                          src="../../assets/img/avatars/1.png"
                        />
                      </div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a
                          className="dropdown-item"
                          href="pages-account-settings-account.html"
                        >
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar avatar-online">
                                <img
                                  className="h-auto rounded-circle"
                                  src="../../assets/img/avatars/1.png"
                                />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <span className="fw-semibold d-block mb-1">
                                نوید محمدزاده
                              </span>
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
                        <a
                          className="dropdown-item"
                          href="pages-account-settings-account.html"
                        >
                          <i className="ti ti-settings me-2 ti-sm"></i>
                          <span className="align-middle">تنظیمات</span>
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="pages-account-settings-billing.html"
                        >
                          <span className="d-flex align-items-center align-middle">
                            <i className="flex-shrink-0 ti ti-credit-card me-2 ti-sm"></i>
                            <span className="flex-grow-1 align-middle">خریدها</span>
                            <span className="flex-shrink-0 badge badge-center rounded-pill bg-label-danger w-px-20 h-px-20">
                              2
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
                        <a
                          className="dropdown-item"
                          href="auth-login-cover.html"
                          target="_blank"
                        >
                          <i className="ti ti-logout me-2 ti-sm"></i>
                          <span className="align-middle">خروج از حساب</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="navbar-search-wrapper search-input-wrapper container-xxl d-none">
                <input
                  aria-label="جستجو..."
                  className="form-control search-input border-0"
                  placeholder="جستجو..."
                  type="text"
                />
                <i className="ti ti-x ti-sm search-toggler cursor-pointer"></i>
              </div>
            </div>
          </nav>
          <div className="layout-page">
            <div className="content-wrapper">
              <aside
                className="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0"
                id="layout-menu"
              >
                <div className="container-xxl d-flex h-100">
                  <ul className="menu-inner">
                    <li className="menu-item">
                      <a
                        className="menu-link menu-toggle"
                        href="javascript:void(0)"
                      >
                        <i className="menu-icon tf-icons ti ti-smart-home"></i>
                        <div data-i18n="Dashboards">داشبورد‌ها</div>
                      </a>
                      <ul className="menu-sub">
                        <li className="menu-item">
                          <a className="menu-link" href="index.html">
                            <i className="menu-icon tf-icons ti ti-chart-pie-2"></i>
                            <div data-i18n="Analytics">آمار و گزارشات</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a className="menu-link" href="dashboards-crm.html">
                            <i className="menu-icon tf-icons ti ti-3d-cube-sphere"></i>
                            <div data-i18n="CRM">ارتباط با مشتری (CRM)</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link"
                            href="app-ecommerce-dashboard.html"
                          >
                            <i className="menu-icon tf-icons ti ti-shopping-cart"></i>
                            <div data-i18n="eCommerce">تجارت الکترونیک</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link"
                            href="app-logistics-dashboard.html"
                          >
                            <i className="menu-icon tf-icons ti ti-truck"></i>
                            <div data-i18n="Logistics">حمل و نقل</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link"
                            href="app-academy-dashboard.html"
                          >
                            <i className="menu-icon tf-icons ti ti-book"></i>
                            <div data-i18n="Academy">آکادمی</div>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item">
                      <a
                        className="menu-link menu-toggle"
                        href="javascript:void(0)"
                      >
                        <i className="menu-icon tf-icons ti ti-layout-sidebar"></i>
                        <div data-i18n="Layouts">طرح‌ها</div>
                      </a>
                      <ul className="menu-sub">
                        <li className="menu-item">
                          <a className="menu-link" href="layouts-without-menu.html">
                            <i className="menu-icon tf-icons ti ti-menu-2"></i>
                            <div data-i18n="Without menu">بدون منو</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link"
                            href="../vertical-menu-template/"
                            target="_blank"
                          >
                            <i className="menu-icon tf-icons ti ti-layout-distribute-vertical"></i>
                            <div data-i18n="Vertical">عمودی</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a className="menu-link" href="layouts-fluid.html">
                            <i className="menu-icon tf-icons ti ti-maximize"></i>
                            <div data-i18n="Fluid">محتوای تمام عرض</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a className="menu-link" href="layouts-container.html">
                            <i className="menu-icon tf-icons ti ti-arrows-maximize"></i>
                            <div data-i18n="Container">دربرگیرنده</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a className="menu-link" href="layouts-blank.html">
                            <i className="menu-icon tf-icons ti ti-square"></i>
                            <div data-i18n="Blank">خالی</div>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item">
                      <a
                        className="menu-link menu-toggle"
                        href="javascript:void(0)"
                      >
                        <i className="menu-icon tf-icons ti ti-layout-grid-add"></i>
                        <div data-i18n="Apps">برنامه‌ها</div>
                      </a>
                      <ul className="menu-sub">
                        <li className="menu-item">
                          <a className="menu-link" href="app-email.html">
                            <i className="menu-icon tf-icons ti ti-mail"></i>
                            <div data-i18n="Email">ایمیل</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a className="menu-link" href="app-chat.html">
                            <i className="menu-icon tf-icons ti ti-messages"></i>
                            <div data-i18n="Chat">پیامرسان</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-calendar"></i>
                            <div data-i18n="Calendar">تقویم</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a className="menu-link" href="app-calendar.html">
                                <div data-i18n="Gregorian Calendar">
                                  تقویم میلادی
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="app-calendar-jalali.html"
                              >
                                <div data-i18n="Solar Calendar">تقویم شمسی</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a className="menu-link" href="app-kanban.html">
                            <i className="menu-icon tf-icons ti ti-layout-kanban"></i>
                            <div data-i18n="Kanban">گردش‌کار</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-shopping-cart"></i>
                            <div data-i18n="eCommerce">تجارت الکترونیک</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="app-ecommerce-dashboard.html"
                              >
                                <div data-i18n="Dashboard">داشبورد</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link menu-toggle"
                                href="javascript:void(0);"
                              >
                                <div data-i18n="Products">محصولات</div>
                              </a>
                              <ul className="menu-sub">
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-ecommerce-product-list.html"
                                  >
                                    <div data-i18n="Product List">
                                      لیست محصولات
                                    </div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-ecommerce-product-add.html"
                                  >
                                    <div data-i18n="Add Product">
                                      افزودن محصول
                                    </div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-ecommerce-category-list.html"
                                  >
                                    <div data-i18n="Category List">
                                      دسته‌بندی
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link menu-toggle"
                                href="javascript:void(0);"
                              >
                                <div data-i18n="Order">سفارش</div>
                              </a>
                              <ul className="menu-sub">
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-ecommerce-order-list.html"
                                  >
                                    <div data-i18n="Order List">لیست سفارش</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-ecommerce-order-details.html"
                                  >
                                    <div data-i18n="Order Details">
                                      جزئیات سفارش
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link menu-toggle"
                                href="javascript:void(0);"
                              >
                                <div data-i18n="Customer">مشتریان</div>
                              </a>
                              <ul className="menu-sub">
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-ecommerce-customer-all.html"
                                  >
                                    <div data-i18n="All Customers">
                                      لیست مشتریان
                                    </div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link menu-toggle"
                                    href="javascript:void(0);"
                                  >
                                    <div data-i18n="Customer Details">
                                      نمایش مشتری
                                    </div>
                                  </a>
                                  <ul className="menu-sub">
                                    <li className="menu-item">
                                      <a
                                        className="menu-link"
                                        href="app-ecommerce-customer-details-overview.html"
                                      >
                                        <div data-i18n="Overview">مرور‌کلی</div>
                                      </a>
                                    </li>
                                    <li className="menu-item">
                                      <a
                                        className="menu-link"
                                        href="app-ecommerce-customer-details-security.html"
                                      >
                                        <div data-i18n="Security">امنیت</div>
                                      </a>
                                    </li>
                                    <li className="menu-item">
                                      <a
                                        className="menu-link"
                                        href="app-ecommerce-customer-details-billing.html"
                                      >
                                        <div data-i18n="Address & Billing">
                                          آدرس و صورتحساب
                                        </div>
                                      </a>
                                    </li>
                                    <li className="menu-item">
                                      <a
                                        className="menu-link"
                                        href="app-ecommerce-customer-details-notifications.html"
                                      >
                                        <div data-i18n="Notifications">
                                          اعلانات
                                        </div>
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="app-ecommerce-manage-reviews.html"
                              >
                                <div data-i18n="Manage Reviews">
                                  مدیریت بازخوردها
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="app-ecommerce-referral.html"
                              >
                                <div data-i18n="Referrals">باشگاه مشتریان</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link menu-toggle"
                                href="javascript:void(0);"
                              >
                                <div data-i18n="Settings">تنظیمات</div>
                              </a>
                              <ul className="menu-sub">
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-ecommerce-settings-detail.html"
                                  >
                                    <div data-i18n="Store Details">فروشگاه</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-ecommerce-settings-payments.html"
                                  >
                                    <div data-i18n="Payments">پرداخت‌ها</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-ecommerce-settings-checkout.html"
                                  >
                                    <div data-i18n="Checkout">ثبت سفارش</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-ecommerce-settings-shipping.html"
                                  >
                                    <div data-i18n="Shipping & Delivery">
                                      حمل و نقل
                                    </div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-ecommerce-settings-locations.html"
                                  >
                                    <div data-i18n="Locations">آدرس‌ها</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-ecommerce-settings-notifications.html"
                                  >
                                    <div data-i18n="Notifications">
                                      نوتیفیکیشن
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-book"></i>
                            <div data-i18n="Academy">آکادمی</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="app-academy-dashboard.html"
                              >
                                <div data-i18n="Dashboard">داشبورد</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="app-academy-course.html"
                              >
                                <div data-i18n="My Course">دوره‌ها</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="app-academy-course-details.html"
                              >
                                <div data-i18n="Course Details">یک دوره</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-truck"></i>
                            <div data-i18n="Logistics">حمل و نقل</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="app-logistics-dashboard.html"
                              >
                                <div data-i18n="Dashboard">داشبورد</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="app-logistics-fleet.html"
                              >
                                <div data-i18n="Fleet">ناوگان</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-file-dollar"></i>
                            <div data-i18n="Invoice">صورتحساب</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a className="menu-link" href="app-invoice-list.html">
                                <div data-i18n="List">لیست</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="app-invoice-preview.html"
                              >
                                <div data-i18n="Preview">پیش‌فاکتور</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="app-invoice-edit.html">
                                <div data-i18n="Edit">ویرایش</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="app-invoice-add.html">
                                <div data-i18n="Add">افزودن</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-users"></i>
                            <div data-i18n="Users">کاربران</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a className="menu-link" href="app-user-list.html">
                                <div data-i18n="List">لیست</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link menu-toggle"
                                href="javascript:void(0);"
                              >
                                <div data-i18n="View">نمایش</div>
                              </a>
                              <ul className="menu-sub">
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-user-view-account.html"
                                  >
                                    <div data-i18n="Account">حساب</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-user-view-security.html"
                                  >
                                    <div data-i18n="Security">امنیت</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-user-view-billing.html"
                                  >
                                    <div data-i18n="Billing & Plans">
                                      اشتراک و روش‌پرداخت
                                    </div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-user-view-notifications.html"
                                  >
                                    <div data-i18n="Notifications">اعلانات</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="app-user-view-connections.html"
                                  >
                                    <div data-i18n="Connections">
                                      سایرحساب‌ها
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-settings"></i>
                            <div data-i18n="Roles & Permissions">
                              نقش و سطح دسترسی
                            </div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a className="menu-link" href="app-access-roles.html">
                                <div data-i18n="Roles">نقش‌ها</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="app-access-permission.html"
                              >
                                <div data-i18n="Permission">دسترسی‌ها</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item">
                      <a
                        className="menu-link menu-toggle"
                        href="javascript:void(0)"
                      >
                        <i className="menu-icon tf-icons ti ti-file"></i>
                        <div data-i18n="Pages">صفحات</div>
                      </a>
                      <ul className="menu-sub">
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-files"></i>
                            <div data-i18n="Front Pages">صفحات سایت</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="../front-pages/landing-page.html"
                                target="_blank"
                              >
                                <div data-i18n="Landing">لندینگ</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="../front-pages/pricing-page.html"
                                target="_blank"
                              >
                                <div data-i18n="Pricing">قیمت گذاری</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="../front-pages/payment-page.html"
                                target="_blank"
                              >
                                <div data-i18n="Payment">پرداخت</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="../front-pages/checkout-page.html"
                                target="_blank"
                              >
                                <div data-i18n="Checkout">ثبت سفارش</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="../front-pages/help-center-landing.html"
                                target="_blank"
                              >
                                <div data-i18n="Help Center">مرکز پشتیبانی</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="../front-pages/help-center-article.html"
                                target="_blank"
                              >
                                <div data-i18n="Help Learn">صقحه آموزش</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-user-circle"></i>
                            <div data-i18n="User Profile">پروفایل حرفه‌ای</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="pages-profile-user.html"
                              >
                                <div data-i18n="Profile">پروفایل</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="pages-profile-teams.html"
                              >
                                <div data-i18n="Teams">گروه‌ها</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="pages-profile-projects.html"
                              >
                                <div data-i18n="Projects">پروژه‌ها</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="pages-profile-connections.html"
                              >
                                <div data-i18n="Connections">همکاران</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-settings"></i>
                            <div data-i18n="Account Settings">تنظیمات حساب</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="pages-account-settings-account.html"
                              >
                                <div data-i18n="Account">حساب</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="pages-account-settings-security.html"
                              >
                                <div data-i18n="Security">امنیت</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="pages-account-settings-billing.html"
                              >
                                <div data-i18n="Billing & Plans">
                                  اشتراک و ‌پرداخت
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="pages-account-settings-notifications.html"
                              >
                                <div data-i18n="Notifications">اعلانات</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="pages-account-settings-connections.html"
                              >
                                <div data-i18n="Connections">ارتباطات</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a className="menu-link" href="pages-faq.html">
                            <i className="menu-icon tf-icons ti ti-help"></i>
                            <div data-i18n="FAQ">سؤالات متداول</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a className="menu-link" href="pages-pricing.html">
                            <i className="menu-icon tf-icons ti ti-diamond"></i>
                            <div data-i18n="Pricing">قیمت گذاری</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-3d-cube-sphere"></i>
                            <div data-i18n="Misc">دیگر صفحات</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="pages-misc-error.html"
                                target="_blank"
                              >
                                <div data-i18n="Error">خطا</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="pages-misc-under-maintenance.html"
                                target="_blank"
                              >
                                <div data-i18n="Under Maintenance">
                                  دردست تعمیر
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="pages-misc-comingsoon.html"
                                target="_blank"
                              >
                                <div data-i18n="Coming Soon">به زودی</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="pages-misc-not-authorized.html"
                                target="_blank"
                              >
                                <div data-i18n="Not Authorized">غیرمجاز</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-lock"></i>
                            <div data-i18n="Authentications">احراز هویت</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a
                                className="menu-link menu-toggle"
                                href="javascript:void(0);"
                              >
                                <div data-i18n="Login">ورود</div>
                              </a>
                              <ul className="menu-sub">
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="auth-login-basic.html"
                                    target="_blank"
                                  >
                                    <div data-i18n="Basic">پایه</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="auth-login-cover.html"
                                    target="_blank"
                                  >
                                    <div data-i18n="Cover">کاور</div>
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link menu-toggle"
                                href="javascript:void(0);"
                              >
                                <div data-i18n="Register">عضویت</div>
                              </a>
                              <ul className="menu-sub">
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="auth-register-basic.html"
                                    target="_blank"
                                  >
                                    <div data-i18n="Basic">پایه</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="auth-register-cover.html"
                                    target="_blank"
                                  >
                                    <div data-i18n="Cover">کاور</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="auth-register-multisteps.html"
                                    target="_blank"
                                  >
                                    <div data-i18n="Multi-steps">
                                      چند مرحله‌ای
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link menu-toggle"
                                href="javascript:void(0);"
                              >
                                <div data-i18n="Verify Email">تأیید ایمیل</div>
                              </a>
                              <ul className="menu-sub">
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="auth-verify-email-basic.html"
                                    target="_blank"
                                  >
                                    <div data-i18n="Basic">پایه</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="auth-verify-email-cover.html"
                                    target="_blank"
                                  >
                                    <div data-i18n="Cover">کاور</div>
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link menu-toggle"
                                href="javascript:void(0);"
                              >
                                <div data-i18n="Reset Password">ریست پسورد</div>
                              </a>
                              <ul className="menu-sub">
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="auth-reset-password-basic.html"
                                    target="_blank"
                                  >
                                    <div data-i18n="Basic">پایه</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="auth-reset-password-cover.html"
                                    target="_blank"
                                  >
                                    <div data-i18n="Cover">کاور</div>
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link menu-toggle"
                                href="javascript:void(0);"
                              >
                                <div data-i18n="Forgot Password">
                                  فراموشی پسورد
                                </div>
                              </a>
                              <ul className="menu-sub">
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="auth-forgot-password-basic.html"
                                    target="_blank"
                                  >
                                    <div data-i18n="Basic">پایه</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="auth-forgot-password-cover.html"
                                    target="_blank"
                                  >
                                    <div data-i18n="Cover">کاور</div>
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link menu-toggle"
                                href="javascript:void(0);"
                              >
                                <div data-i18n="Two Steps">
                                  تایید دومرحله‌ای
                                </div>
                              </a>
                              <ul className="menu-sub">
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="auth-two-steps-basic.html"
                                    target="_blank"
                                  >
                                    <div data-i18n="Basic">پایه</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="auth-two-steps-cover.html"
                                    target="_blank"
                                  >
                                    <div data-i18n="Cover">کاور</div>
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-forms"></i>
                            <div data-i18n="Wizard Examples">چند مرحله‌ای</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="wizard-ex-checkout.html"
                              >
                                <div data-i18n="Checkout">ثبت سفارش</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="wizard-ex-property-listing.html"
                              >
                                <div data-i18n="Property Listing">
                                  درخواست ملک
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="wizard-ex-create-deal.html"
                              >
                                <div data-i18n="Create Deal">ایجاد معامله</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a className="menu-link" href="modal-examples.html">
                            <i className="menu-icon tf-icons ti ti-square"></i>
                            <div data-i18n="Modal Examples">
                              نمونه های مُدال
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item">
                      <a
                        className="menu-link menu-toggle"
                        href="javascript:void(0)"
                      >
                        <i className="menu-icon tf-icons ti ti-toggle-left"></i>
                        <div data-i18n="Components">امکانات</div>
                      </a>
                      <ul className="menu-sub">
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-id"></i>
                            <div data-i18n="Cards">کارت‌ها</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a className="menu-link" href="cards-basic.html">
                                <div data-i18n="Basic">پایه</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="cards-advance.html">
                                <div data-i18n="Advance">پیشرفته</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="cards-statistics.html">
                                <div data-i18n="Statistics">آمار</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="cards-analytics.html">
                                <div data-i18n="Analytics">آنالیز</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="cards-actions.html">
                                <div data-i18n="Actions">عملیات</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0)"
                          >
                            <i className="menu-icon tf-icons ti ti-color-swatch"></i>
                            <div data-i18n="User interface">رابط کاربری</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a className="menu-link" href="ui-accordion.html">
                                <div data-i18n="Accordion">آکاردئون</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-alerts.html">
                                <div data-i18n="Alerts">هشدارها</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-badges.html">
                                <div data-i18n="Badges">برچسب‌ها</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-buttons.html">
                                <div data-i18n="Buttons">کلیدها</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-carousel.html">
                                <div data-i18n="Carousel">اسلایدر</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-collapse.html">
                                <div data-i18n="Collapse">بازشونده</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-dropdowns.html">
                                <div data-i18n="Dropdowns">پاپ‌آپ منو</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-footer.html">
                                <div data-i18n="Footer">فـوتر</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-list-groups.html">
                                <div data-i18n="List Groups">لیست گروهی</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-modals.html">
                                <div data-i18n="Modals">مُدال‌ها</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-navbar.html">
                                <div data-i18n="Navbar">تولبار</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-offcanvas.html">
                                <div data-i18n="Offcanvas">کشوی کناری</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="ui-pagination-breadcrumbs.html"
                              >
                                <div data-i18n="Pagination & Breadcrumbs">
                                  صفحه‌بندی و مسیر
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-progress.html">
                                <div data-i18n="Progress">نوار پیشرفت</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-spinners.html">
                                <div data-i18n="Spinners">لودینگ‌ها</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-tabs-pills.html">
                                <div data-i18n="Tabs & Pills">
                                  تب‌ها و برگ‌ها
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-toasts.html">
                                <div data-i18n="Toasts">توئستر</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="ui-tooltips-popovers.html"
                              >
                                <div data-i18n="Tooltips & Popovers">
                                  پاپ‌آپ راهنما
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="ui-typography.html">
                                <div data-i18n="Typography">تایپوگرافی</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0)"
                          >
                            <i className="menu-icon tf-icons ti ti-components"></i>
                            <div data-i18n="Extended UI">طراحی سفارشی</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="extended-ui-avatar.html"
                              >
                                <div data-i18n="Avatar">آواتار</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="extended-ui-blockui.html"
                              >
                                <div data-i18n="BlockUI">قفل صفحه</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="extended-ui-drag-and-drop.html"
                              >
                                <div data-i18n="Drag & Drop">
                                  کشیدن و رهاکردن
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="extended-ui-media-player.html"
                              >
                                <div data-i18n="Media Player">مدیاپلیر</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="extended-ui-perfect-scrollbar.html"
                              >
                                <div data-i18n="Perfect Scrollbar">
                                  نوار اسکرول
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="extended-ui-star-ratings.html"
                              >
                                <div data-i18n="Star Ratings">
                                  امتیاز ستاره‌ای
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="extended-ui-sweetalert2.html"
                              >
                                <div data-i18n="SweetAlert2">
                                  پاپ‌آپ SweetAlert2
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="extended-ui-text-divider.html"
                              >
                                <div data-i18n="Text Divider">جداکننده</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link menu-toggle"
                                href="javascript:void(0);"
                              >
                                <div data-i18n="Timeline">خط زمانی</div>
                              </a>
                              <ul className="menu-sub">
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="extended-ui-timeline-basic.html"
                                  >
                                    <div data-i18n="Basic">پایه</div>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    className="menu-link"
                                    href="extended-ui-timeline-fullscreen.html"
                                  >
                                    <div data-i18n="Fullscreen">تمام صفحه</div>
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="extended-ui-tour.html">
                                <div data-i18n="Tour">تور راهنما</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="extended-ui-treeview.html"
                              >
                                <div data-i18n="Treeview">نمای درختی</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="extended-ui-misc.html">
                                <div data-i18n="Miscellaneous">سایرموارد</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0)"
                          >
                            <i className="menu-icon tf-icons ti ti-brand-tabler"></i>
                            <div data-i18n="Icons">آیکن‌ها</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a className="menu-link" href="icons-tabler.html">
                                <div data-i18n="Tabler">آیکن‌های Tabler</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="icons-font-awesome.html"
                              >
                                <div data-i18n="Fontawesome">
                                  آیکن‌های Fontawesome
                                </div>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item">
                      <a
                        className="menu-link menu-toggle"
                        href="javascript:void(0)"
                      >
                        <i className="menu-icon tf-icons ti ti-forms"></i>
                        <div data-i18n="Forms">فرم ها</div>
                      </a>
                      <ul className="menu-sub">
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-toggle-left"></i>
                            <div data-i18n="Form Elements">المان‌های فرم</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="forms-basic-inputs.html"
                              >
                                <div data-i18n="Basic Inputs">
                                  اینپوت‌های پایه
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="forms-input-groups.html"
                              >
                                <div data-i18n="Input groups">اینپوت گروپ</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="forms-custom-options.html"
                              >
                                <div data-i18n="Custom Options">
                                  گزینه‌های سفارشی
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="forms-editors.html">
                                <div data-i18n="Editors">ویرایشگر متن</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="forms-file-upload.html"
                              >
                                <div data-i18n="File Upload">آپلود فایل</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="forms-pickers.html">
                                <div data-i18n="Pickers">
                                  انتخابگر تاریخ و رنگ
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="forms-pickers-jalali.html"
                              >
                                <div data-i18n="Solar Date Pickers">
                                  انتخابگر تاریخ شمسی
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="forms-selects.html">
                                <div data-i18n="Select & Tags">
                                  انتخابگر گزینه
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="forms-sliders.html">
                                <div data-i18n="Sliders">انتخابگر بازه</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="forms-switches.html">
                                <div data-i18n="Switches">سوئیچ‌ها</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="forms-extras.html">
                                <div data-i18n="Extras">سایر موارد</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-layout-navbar"></i>
                            <div data-i18n="Form Layouts">طرح بندی فرم</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="form-layouts-vertical.html"
                              >
                                <div data-i18n="Vertical Form">فرم عمودی</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="form-layouts-horizontal.html"
                              >
                                <div data-i18n="Horizontal Form">فرم افقی</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="form-layouts-sticky.html"
                              >
                                <div data-i18n="Sticky Actions">
                                  سربرگ چسبنده
                                </div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-text-wrap-disabled"></i>
                            <div data-i18n="Form Wizard">فرم مرحله‌ای</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="form-wizard-numbered.html"
                              >
                                <div data-i18n="Numbered">شماره‌دار</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="form-wizard-icons.html"
                              >
                                <div data-i18n="Icons">آیکن‌ها</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a className="menu-link" href="form-validation.html">
                            <i className="menu-icon tf-icons ti ti-checkbox"></i>
                            <div data-i18n="Form Validation">
                              اعتبارسنجی فرم
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item">
                      <a
                        className="menu-link menu-toggle"
                        href="javascript:void(0)"
                      >
                        <i className="menu-icon tf-icons ti ti-layout-grid"></i>
                        <div data-i18n="Tables">جداول</div>
                      </a>
                      <ul className="menu-sub">
                        <li className="menu-item">
                          <a className="menu-link" href="tables-basic.html">
                            <i className="menu-icon tf-icons ti ti-table"></i>
                            <div data-i18n="Tables">جداول پایه</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-layout-grid"></i>
                            <div data-i18n="Datatables">جداول داده‌ای</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="tables-datatables-basic.html"
                              >
                                <div data-i18n="Basic">پایه</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="tables-datatables-advanced.html"
                              >
                                <div data-i18n="Advanced">پیشرفته</div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a
                                className="menu-link"
                                href="tables-datatables-extensions.html"
                              >
                                <div data-i18n="Extensions">ویژگی‌های خاص</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item">
                      <a
                        className="menu-link menu-toggle"
                        href="javascript:void(0)"
                      >
                        <i className="menu-icon tf-icons ti ti-chart-bar"></i>
                        <div data-i18n="Charts & Maps">نمودارها و نقشه‌ها</div>
                      </a>
                      <ul className="menu-sub">
                        <li className="menu-item">
                          <a
                            className="menu-link menu-toggle"
                            href="javascript:void(0);"
                          >
                            <i className="menu-icon tf-icons ti ti-chart-pie"></i>
                            <div data-i18n="Charts">نمودارها</div>
                          </a>
                          <ul className="menu-sub">
                            <li className="menu-item">
                              <a className="menu-link" href="charts-apex.html">
                                <div data-i18n="Apex Charts">
                                  نمودارهای Apex
                                </div>
                              </a>
                            </li>
                            <li className="menu-item">
                              <a className="menu-link" href="charts-chartjs.html">
                                <div data-i18n="ChartJS">نمودارهای JS</div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item">
                          <a className="menu-link" href="maps-leaflet.html">
                            <i className="menu-icon tf-icons ti ti-map"></i>
                            <div data-i18n="Leaflet Maps">نقشه‌های Leaflet</div>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item">
                      <a
                        className="menu-link menu-toggle"
                        href="javascript:void(0)"
                      >
                        <i className="menu-icon tf-icons ti ti-box-multiple"></i>
                        <div data-i18n="Misc">سایر</div>
                      </a>
                      <ul className="menu-sub">
                        <li className="menu-item">
                          <a className="menu-link" href="#support" target="_blank">
                            <i className="menu-icon tf-icons ti ti-lifebuoy"></i>
                            <div data-i18n="Support">پشتیبانی</div>
                          </a>
                        </li>
                        <li className="menu-item">
                          <a
                            className="menu-link"
                            href="https://demos.pixinvent.com/vuexy-html-admin-template/documentation/"
                            target="_blank"
                          >
                            <i className="menu-icon tf-icons ti ti-file-description"></i>
                            <div data-i18n="Documentation">مستندات</div>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </aside>
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="py-3 mb-4">
                  <span className="text-muted fw-light">تجارت الکترونیک /</span>
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
                            url: "/api2/myapp-category/?",
                          },
                        }}
                      />
                    </div>
                    <div className="p-2">
                      <DynamicAttributeField
                        data={{
                          attribute_name_en: "status",
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
                    <hr className="col-12" />
                    <div className="p-2 offset-3 col-4">
                      <DynamicAttributeField
                        data={{
                          attribute_name_en: "search",
                          attribute_name_fa: "جستجو",
                          attr_type: {
                            type: "string",
                          },
                        }}
                      />
                    </div>
                    <div className="p-2 col-1">
                      <DynamicAttributeField
                        data={{
                          attribute_name_en: "",
                          attribute_name_fa: "",
                          attr_type: {
                            type: "list",
                            default: {id: 7, value: 7},
                            choice: [
                                {id: 7, value: 7},
                                {id: 10, value: 10},
                                {id: 20, value: 20},
                                {id: 50, value: 50},
                                {id: 70, value: 70},
                                {id: 100, value: 100},
                            ]
                          },
                        }}
                      />
                    </div>
                    <div className="p-2 col-2">
                      <RippleButton 
                        className={`d-flex align-items-center gap-1 w-100 h-100 z-1 btn btn-lg btn-secondary p-1`}
                        title="Export"
                      >
                        <FaDownload />
                        گرفتن خروجی
                      </RippleButton>
                    </div>
                    <div className="p-2 col-2">
                      <RippleButton 
                        className={`d-flex align-items-center gap-1 w-100 h-100 z-1 btn btn-lg btn-primary p-1`}
                        title="Add Product"
                      >
                        <FaPlus />
                         افزودن محصول 
                      </RippleButton>
                    </div>
                  </div>
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
