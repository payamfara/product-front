"use client"
import { Fragment, useState, useEffect, useRef } from "react";
import Select2 from '../../../../components/Select2Component';
import { useParams } from "next/navigation";
import { baseApiAuth } from '../../../../api/baseApi';
import AttributeComponent from './components/AttributeComponent';

const CreateCategoryPage = () => {
    const attributeComponentRef = useRef(null);
    const [pageData, setPageData] = useState({});
    const [pageStruct, setPageStruct] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const { id = "" } = params;


    useEffect(() => {
        baseApiAuth.get(`/category/?get_structure`)
            .then((res) => {
                console.log('resSt', res.data);
                baseApiAuth.get(`/category/${id}`)
                    .then((res) => {
                        console.log('res', res.data);
                        
                        setPageData(res.data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.error('Error fetching data:', err);
                        setLoading(false);
                    })
                setPageStruct(res.data);
            })
            .catch((err) => {
                console.error('Error fetching structure:', err);
            })
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = pageData;
        data['category_attrs'] = attributeComponentRef.current.getValues();
        console.log(data);

        const url = `/category/${id}/`
        baseApiAuth.post(url, data)
        .then((res) => {
            console.log('ress', res);
        })
        .catch((err) => {
            console.error('Error fetching tags:', err);
        })

    }
    return (
        <Fragment>
            {/* Layout wrapper */}
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    {/* Menu */}

                    {/* / Menu */}
                    {/* Layout container */}
                    <div className="layout-page">
                        {/* Navbar */}
                        <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                            id="layout-navbar">
                            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                                <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                                    <i className="ti ti-menu-2 ti-sm"></i>
                                </a>
                            </div>
                            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                                {/* Search */}
                                <div className="navbar-nav align-items-center">
                                    <div className="nav-item navbar-search-wrapper mb-0">
                                        <a className="nav-item nav-link search-toggler d-flex align-items-center px-0"
                                            href="javascript:void(0);">
                                            <i className="ti ti-search ti-md me-2 h-mirror"></i>
                                            <span className="d-none d-md-inline-block text-muted">جستجو (/+Ctrl)</span>
                                        </a>
                                    </div>
                                </div>
                                {/* /Search */}
                                <ul className="navbar-nav flex-row align-items-center ms-auto">
                                    {/* Language */}
                                    <li className="nav-item dropdown-language dropdown me-2 me-xl-0">
                                        <a className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown"
                                            href="javascript:void(0);">
                                            <i className="ti ti-language rounded-circle ti-md"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <a className="dropdown-item" data-language="fa" data-text-direction="rtl"
                                                    href="javascript:void(0);">
                                                    <span className="align-middle">فارسی</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" data-language="en" data-text-direction="ltr"
                                                    href="javascript:void(0);">
                                                    <span className="align-middle">انگلیسی</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" data-language="fr" data-text-direction="ltr"
                                                    href="javascript:void(0);">
                                                    <span className="align-middle">فرانسوی</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" data-language="ar" data-text-direction="rtl"
                                                    href="javascript:void(0);">
                                                    <span className="align-middle">عربي</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" data-language="de" data-text-direction="ltr"
                                                    href="javascript:void(0);">
                                                    <span className="align-middle">آلمانی</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* Language */}
                                    {/* Style Switcher */}
                                    <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
                                        <a className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown"
                                            href="javascript:void(0);">
                                            <i className="ti ti-md"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
                                            <li>
                                                <a className="dropdown-item" data-theme="light" href="javascript:void(0);">
                                                    <span className="align-middle">
                                                        <i className="ti ti-sun me-2"></i>
                                                        روز
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" data-theme="dark" href="javascript:void(0);">
                                                    <span className="align-middle">
                                                        <i className="ti ti-moon me-2"></i>
                                                        شب
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" data-theme="system" href="javascript:void(0);">
                                                    <span className="align-middle">
                                                        <i className="ti ti-device-desktop me-2"></i>
                                                        سیستم
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* / Style Switche */}
                                    {/* Quick links  */}
                                    <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
                                        <a aria-expanded="false" className="nav-link dropdown-toggle hide-arrow"
                                            data-bs-auto-close="outside" data-bs-toggle="dropdown" href="javascript:void(0);">
                                            <i className="ti ti-layout-grid-add ti-md"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end py-0">
                                            <div className="dropdown-menu-header border-bottom">
                                                <div className="dropdown-header d-flex align-items-center py-3">
                                                    <h5 className="text-body mb-0 me-auto">میانبرها</h5>
                                                    <a className="dropdown-shortcuts-add text-body" data-bs-placement="top"
                                                        data-bs-toggle="tooltip" href="javascript:void(0)" title="افزودن میانبر">
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
                                                        <a className="stretched-link mb-0" href="app-calendar.html">تقویم</a>
                                                        <small className="text-muted mb-0">قرارهای ملاقات</small>
                                                    </div>
                                                    <div className="dropdown-shortcuts-item col">
                                                        <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                                                            <i className="ti ti-file-invoice fs-4"></i>
                                                        </span>
                                                        <a className="stretched-link mb-0" href="app-invoice-list.html">صورتحساب‌</a>
                                                        <small className="text-muted mb-0">مدیریت پرداخت‌ها</small>
                                                    </div>
                                                </div>
                                                <div className="row row-bordered overflow-visible g-0">
                                                    <div className="dropdown-shortcuts-item col">
                                                        <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                                                            <i className="ti ti-users fs-4"></i>
                                                        </span>
                                                        <a className="stretched-link mb-0" href="app-user-list.html">مشتریان</a>
                                                        <small className="text-muted mb-0">مدیریت کاربران</small>
                                                    </div>
                                                    <div className="dropdown-shortcuts-item col">
                                                        <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                                                            <i className="ti ti-lock fs-4"></i>
                                                        </span>
                                                        <a className="stretched-link mb-0" href="app-access-roles.html">سطح دسترسی</a>
                                                        <small className="text-muted mb-0">موارد امنیتی</small>
                                                    </div>
                                                </div>
                                                <div className="row row-bordered overflow-visible g-0">
                                                    <div className="dropdown-shortcuts-item col">
                                                        <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                                                            <i className="ti ti-chart-bar fs-4"></i>
                                                        </span>
                                                        <a className="stretched-link mb-0" href="index.html">داشبورد</a>
                                                        <small className="text-muted mb-0">گزارش آماری</small>
                                                    </div>
                                                    <div className="dropdown-shortcuts-item col">
                                                        <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                                                            <i className="ti ti-settings fs-4"></i>
                                                        </span>
                                                        <a className="stretched-link mb-0" href="pages-account-settings-account.html">تنظیمات</a>
                                                        <small className="text-muted mb-0">مدیریت سیستم</small>
                                                    </div>
                                                </div>
                                                <div className="row row-bordered overflow-visible g-0">
                                                    <div className="dropdown-shortcuts-item col">
                                                        <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                                                            <i className="ti ti-help fs-4"></i>
                                                        </span>
                                                        <a className="stretched-link mb-0" href="pages-faq.html">مرکز پشتیبانی</a>
                                                        <small className="text-muted mb-0">سوالات متداول و راهنما</small>
                                                    </div>
                                                    <div className="dropdown-shortcuts-item col">
                                                        <span className="dropdown-shortcuts-icon rounded-circle mb-2 mt-1">
                                                            <i className="ti ti-square fs-4"></i>
                                                        </span>
                                                        <a className="stretched-link mb-0" href="modal-examples.html">مُـدال‌ها</a>
                                                        <small className="text-muted mb-0">پاپ‌آپ‌های کاربردی</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    {/* Quick links */}
                                    {/* Notification */}
                                    <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
                                        <a aria-expanded="false" className="nav-link dropdown-toggle hide-arrow"
                                            data-bs-auto-close="outside" data-bs-toggle="dropdown" href="javascript:void(0);">
                                            <i className="ti ti-bell ti-md"></i>
                                            <span className="badge bg-danger rounded-pill badge-notifications">5</span>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end py-0">
                                            <li className="dropdown-menu-header border-bottom">
                                                <div className="dropdown-header d-flex align-items-center py-3">
                                                    <h5 className="text-body mb-0 me-auto">اعلانات</h5>
                                                    <a className="dropdown-notifications-all text-body" data-bs-placement="top"
                                                        data-bs-toggle="tooltip" href="javascript:void(0)" title="همه خوانده شده">
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
                                                                    <img className="h-auto rounded-circle"
                                                                        src="../../assets/img/avatars/1.png" />
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <h6 className="mb-2">تبریک به شما 🎉</h6>
                                                                <p className="mb-1">نشان برترین فروشنده ماه رو گرفتید</p>
                                                                <small className="text-muted">الان</small>
                                                            </div>
                                                            <div className="flex-shrink-0 dropdown-notifications-actions">
                                                                <a className="dropdown-notifications-read" href="javascript:void(0)">
                                                                    <span className="badge badge-dot"></span>
                                                                </a>
                                                                <a className="dropdown-notifications-archive" href="javascript:void(0)">
                                                                    <span className="ti ti-x"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item list-group-item-action dropdown-notifications-item">
                                                        <div className="d-flex">
                                                            <div className="flex-shrink-0 me-3">
                                                                <div className="avatar">
                                                                    <span className="avatar-initial rounded-circle bg-label-danger">ن‌م</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <h6 className="mb-2">نوید محمدزاده</h6>
                                                                <p className="mb-1">درخواست شمارا پذیرفت.</p>
                                                                <small className="text-muted">1 ساعت قبل</small>
                                                            </div>
                                                            <div className="flex-shrink-0 dropdown-notifications-actions">
                                                                <a className="dropdown-notifications-read" href="javascript:void(0)">
                                                                    <span className="badge badge-dot"></span>
                                                                </a>
                                                                <a className="dropdown-notifications-archive" href="javascript:void(0)">
                                                                    <span className="ti ti-x"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                                                        <div className="d-flex">
                                                            <div className="flex-shrink-0 me-3">
                                                                <div className="avatar">
                                                                    <img className="h-auto rounded-circle"
                                                                        src="../../assets/img/avatars/2.png" />
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <h6 className="mb-2">پیام جدید از بهاره ✉️</h6>
                                                                <p className="mb-1">شما یک پیام جدید از بهاره افشاری دارید</p>
                                                                <small className="text-muted">12 ساعت قبل</small>
                                                            </div>
                                                            <div className="flex-shrink-0 dropdown-notifications-actions">
                                                                <a className="dropdown-notifications-read" href="javascript:void(0)">
                                                                    <span className="badge badge-dot"></span>
                                                                </a>
                                                                <a className="dropdown-notifications-archive" href="javascript:void(0)">
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
                                                                <a className="dropdown-notifications-read" href="javascript:void(0)">
                                                                    <span className="badge badge-dot"></span>
                                                                </a>
                                                                <a className="dropdown-notifications-archive" href="javascript:void(0)">
                                                                    <span className="ti ti-x"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                                                        <div className="d-flex">
                                                            <div className="flex-shrink-0 me-3">
                                                                <div className="avatar">
                                                                    <img className="h-auto rounded-circle"
                                                                        src="../../assets/img/avatars/9.png" />
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <h6 className="mb-2">اپلیکیشن بروزرسانی شد 🚀</h6>
                                                                <p className="mb-1">پروژه شما باموفقیت آپدیت شد.</p>
                                                                <small className="text-muted">دیروز</small>
                                                            </div>
                                                            <div className="flex-shrink-0 dropdown-notifications-actions">
                                                                <a className="dropdown-notifications-read" href="javascript:void(0)">
                                                                    <span className="badge badge-dot"></span>
                                                                </a>
                                                                <a className="dropdown-notifications-archive" href="javascript:void(0)">
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
                                                                <a className="dropdown-notifications-read" href="javascript:void(0)">
                                                                    <span className="badge badge-dot"></span>
                                                                </a>
                                                                <a className="dropdown-notifications-archive" href="javascript:void(0)">
                                                                    <span className="ti ti-x"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                                                        <div className="d-flex">
                                                            <div className="flex-shrink-0 me-3">
                                                                <div className="avatar">
                                                                    <img className="h-auto rounded-circle"
                                                                        src="../../assets/img/avatars/5.png" />
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <h6 className="mb-2">ارسال درخواست همکاری</h6>
                                                                <p className="mb-1">حسام درخواست همکاری فرستاد</p>
                                                                <small className="text-muted">1 هفته قبل</small>
                                                            </div>
                                                            <div className="flex-shrink-0 dropdown-notifications-actions">
                                                                <a className="dropdown-notifications-read" href="javascript:void(0)">
                                                                    <span className="badge badge-dot"></span>
                                                                </a>
                                                                <a className="dropdown-notifications-archive" href="javascript:void(0)">
                                                                    <span className="ti ti-x"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item list-group-item-action dropdown-notifications-item">
                                                        <div className="d-flex">
                                                            <div className="flex-shrink-0 me-3">
                                                                <div className="avatar">
                                                                    <img className="h-auto rounded-circle"
                                                                        src="../../assets/img/avatars/6.png" />
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <h6 className="mb-2">پیام جدید از ترانه</h6>
                                                                <p className="mb-1">شما یک پیام جدید دارید</p>
                                                                <small className="text-muted">1 ماه قبل</small>
                                                            </div>
                                                            <div className="flex-shrink-0 dropdown-notifications-actions">
                                                                <a className="dropdown-notifications-read" href="javascript:void(0)">
                                                                    <span className="badge badge-dot"></span>
                                                                </a>
                                                                <a className="dropdown-notifications-archive" href="javascript:void(0)">
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
                                                                <a className="dropdown-notifications-read" href="javascript:void(0)">
                                                                    <span className="badge badge-dot"></span>
                                                                </a>
                                                                <a className="dropdown-notifications-archive" href="javascript:void(0)">
                                                                    <span className="ti ti-x"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="dropdown-menu-footer border-top">
                                                <a className="dropdown-item d-flex justify-content-center text-primary p-2 h-px-40 mb-1 align-items-center"
                                                    href="javascript:void(0);">
                                                    نمایش همه اعلانات
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* Notification */}
                                    {/* User */}
                                    <li className="nav-item navbar-dropdown dropdown-user dropdown">
                                        <a className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown"
                                            href="javascript:void(0);">
                                            <div className="avatar avatar-online">
                                                <img className="h-auto rounded-circle" src="../../assets/img/avatars/1.png" />
                                            </div>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <a className="dropdown-item" href="pages-account-settings-account.html">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div className="avatar avatar-online">
                                                                <img className="h-auto rounded-circle"
                                                                    src="../../assets/img/avatars/1.png" />
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
                                    {/* User */}
                                </ul>
                            </div>
                            {/* Search Small Screens */}
                            <div className="navbar-search-wrapper search-input-wrapper d-none">
                                <input aria-label="جستجو..." className="form-control search-input container-xxl border-0"
                                    placeholder="جستجو..." type="text" />
                                <i className="ti ti-x ti-sm search-toggler cursor-pointer"></i>
                            </div>
                        </nav>
                        {/* / Navbar */}
                        {/* Content wrapper */}
                        <div className="content-wrapper">
                            {/* Content */}
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <h4 className="py-3 mb-0">
                                    <span className="text-muted fw-light">تجارت الکترونیک /</span>
                                    افزودن دسته بندی
                                </h4>
                                <form action={`http://192.168.1.21:8000/categorys/save/${id}`} onSubmit={handleSubmit} className="app-ecommerce">
                                    {/* Add category */}
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                                        <div className="d-flex flex-column justify-content-center">
                                            <h4 className="mb-1 mt-3">یک دسته بندی جدید اضافه کنید</h4>
                                            <p className="text-muted">سفارش هایی که در سراسر فروشگاه شما ثبت می شود</p>
                                        </div>
                                        <div className="d-flex align-content-center flex-wrap gap-3">
                                            <div className="d-flex gap-3">
                                                <button className="btn btn-label-secondary">حذف تغییرات</button>
                                                <button className="btn btn-label-primary">ذخیره پیش نویس</button>
                                            </div>
                                            <button className="btn btn-primary" type="submit">انتشار دسته بندی</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {/* First colum */}
                                        <div className="col-12 col-lg-8">
                                            {/* category Information */}
                                            <div className="card mb-4">
                                                <div className="card-header">
                                                    <h5 className="card-tile mb-0">اطلاعات دسته بندی</h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3 col ecommerce-select2-dropdown">
                                                        <label className="form-label mb-1 d-flex justify-content-between align-items-center" htmlFor="parent-org">
                                                            <span>دسته بندی والد</span>
                                                            <a className="fw-medium" href="javascript:void(0);">اضافه کردن دسته جدید</a>
                                                        </label>
                                                        <Select2
                                                            name={'parent'}
                                                            asyncUrl="http://192.168.1.80:2020/api2/category/"
                                                            isAsync={true}
                                                            placeholder="انتخاب دسته"
                                                            onChange={(vals) => { console.log(vals) }}
                                                            defaultValue={{'id': pageData.parent, 'value': pageData.parent_str}}
                                                        />
                                                    </div>
                                             
                                                </div>
                                            </div>
                                            {/* /category Information */}
                                        </div>
                                        {/* {/* /Second column Second column */}
                                        <div className="col-12 col-lg-4">
                                            {/* {/* /Pricing Card Organize Card */}
                                            <div className="card mb-4">
                                                <div className="card-header">
                                                    <h5 className="card-title mb-0">جزئیات</h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="d-flex flex-column gap-3 border border-dashed p-3 mb-3">
                                                        {/* Part number en */}
                                                        <div>
                                                            <label className="form-label" htmlFor="value_en">مقدار انگلیسی</label>
                                                            <input
                                                                id={'value_en'}
                                                                name={'value_en'}
                                                                className="form-control"
                                                                defaultValue={pageData.value_en}
                                                            />
                                                            <span id="help_value_en" className="fs-tiny form-label"></span>
                                                        </div>
                                                        {/* Part number fa */}
                                                        <div>
                                                            <label className="form-label" htmlFor="value_fa">مقدار فارسی</label>
                                                            <input
                                                                id={'value_fa'}
                                                                name={'value_fa'}
                                                                className="form-control"
                                                                defaultValue={pageData.value_fa}
                                                            />
                                                            <span id="value_fa" className="fs-tiny form-label"></span>
                                                        </div>
                                                        {/* Part number bz */}
                                                        <div>
                                                            <label className="form-label" htmlFor="value_bz">مقدار بازاری</label>
                                                            <input
                                                                id={'value_bz'}
                                                                name={'value_bz'}
                                                                className="form-control"
                                                                defaultValue={pageData.value_bz}
                                                            />
                                                            <span id="help_value_bz" className="fs-tiny form-label"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* /Organize Card */}
                                        </div>
                                        {/* /Second column */}
                                        <div className="col-12">
                                            <AttributeComponent ref={attributeComponentRef} struct={pageStruct.category_attrs} inputs={pageData.category_attrs} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* {/* / Content Footer */}
                            <footer className="content-footer footer bg-footer-theme">
                                <div className="container-xxl">
                                    <div className="footer-container d-flex align-items-center justify-content-between py-2 flex-md-row flex-column">
                                        <div>
                                            ©
                                            {/* <script>
                                                document.write(new Date().getFullYear());
                                            </script> */}
                                            , ارائه شده توسط
                                            <span className="text-danger byte-hover">بایت ‌مَستر</span>
                                            در سایت
                                            <a className="fw-medium" href="#support" target="_blank">راستچین</a>
                                        </div>
                                        <div className="d-none d-lg-inline-block">
                                            <a className="footer-link me-4" href="#support" target="_blank">لایسنس</a>
                                            <a className="footer-link me-4" href="#support" target="_blank">قالب‌های بیشتر</a>
                                            <a className="footer-link me-4"
                                                href="https://demos.pixinvent.com/vuexy-html-admin-template/documentation/"
                                                target="_blank">مستندات</a>
                                            <a className="footer-link d-none d-sm-inline-block" href="#support-theme" target="_blank">پشتیبانی</a>
                                        </div>
                                    </div>
                                </div>
                            </footer>
                            {/* / Footer */}

                            <div className="content-backdrop fade"></div>
                        </div>
                        {/* Content wrapper */}
                    </div>
                    {/* / Layout page */}
                </div>

                {/* Overlay */}
                <div className="layout-overlay layout-menu-toggle"></div>

                {/* Drag Target Area To SlideIn Menu On Small Screens */}
                <div className="drag-target"></div>
            </div>
        </Fragment>
    );
}
export default CreateCategoryPage;