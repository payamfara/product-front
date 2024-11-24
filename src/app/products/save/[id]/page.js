"use client"
import { Fragment, useState, useEffect } from "react";
import Select2 from '../../../../components/Select2Component';
import TagifyComponent from '../../../../components/TagifyComponent';
import DropzoneComponent from '../../../../components/DropzoneComponent';
import QuillEditorComponent from '../../../../components/QuillEditorComponent';
import DynamicAttributeField from '../../../../components/DynamicAttributeField';
import axios from "axios";
import { useParams } from "next/navigation";

const CreateProductPage = () => {
    const [partNumberIsManual, setPartNumberIsManual] = useState({});
    const [partNumberEn, setPartNumberEn] = useState({});
    const [partNumberFa, setPartNumberFa] = useState({});
    const [partNumberBz, setPartNumberBz] = useState({});
    const [status, setStatus] = useState({});
    const [category, setCategory] = useState({});
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');
    const [attrs, setAttrs] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const { id = "" } = params;
    useEffect(() => {
        const requestUrl = `http://localhost:8000/products/save/${id}`
        axios.get(requestUrl)
            .then((res) => {
                console.log(res);
                
                setPartNumberIsManual(res.data?.part_number_is_manual)
                setPartNumberEn(res.data?.part_number_en)
                setPartNumberFa(res.data?.part_number_fa)
                setPartNumberBz(res.data?.part_number_bz)
                setStatus(res.data?.status)
                setCategory(res.data?.category)
                setTags(res.data?.tags)
                setImages(res.data?.images)
                setDescription(res.data?.description)
                setAttrs(res.data?.attrs)
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching tags:', err);
                setLoading(false);
            })
    }, [])

    if (loading) {
        console.log('dd1');

        return <div>Loading...</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target; 
        const formData = new FormData(form); 
        formData.forEach((value, key) => {
            console.log(value, key);
        })
        const requestUrl = `http://localhost:8000/products/save/${id}`
        axios.post(requestUrl, formData)
        .then((res) => {
            console.log(res);
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
                                    افزودن محصول
                                </h4>
                                <form action={`http://localhost:8000/products/save/${id}`} onSubmit={handleSubmit} className="app-ecommerce">
                                    {/* Add Product */}
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                                        <div className="d-flex flex-column justify-content-center">
                                            <h4 className="mb-1 mt-3">یک محصول جدید اضافه کنید</h4>
                                            <p className="text-muted">سفارش هایی که در سراسر فروشگاه شما ثبت می شود</p>
                                        </div>
                                        <div className="d-flex align-content-center flex-wrap gap-3">
                                            <div className="d-flex gap-3">
                                                <button className="btn btn-label-secondary">حذف تغییرات</button>
                                                <button className="btn btn-label-primary">ذخیره پیش نویس</button>
                                            </div>
                                            <button className="btn btn-primary" type="submit">انتشار محصول</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {/* First colum */}
                                        <div className="col-12 col-lg-8">
                                            {/* Product Information */}
                                            <div className="card mb-4">
                                                <div className="card-header">
                                                    <h5 className="card-tile mb-0">اطلاعات محصول</h5>
                                                </div>
                                                <div className="card-body">
                                                    {/* Category */}
                                                    {/* <div className="mb-3 col ecommerce-select2-dropdown">
                                                        <label className="form-label mb-1 d-flex justify-content-between align-items-center" htmlFor="category-org">
                                                            <span>دسته</span>
                                                            <a className="fw-medium" href="javascript:void(0);">اضافه کردن دسته جدید</a>
                                                        </label>
                                                        <select className="select2 form-select" data-placeholder="انتخاب دسته" id="category-org">
                                                            <option value="">دسته را انتخاب کنید</option>
                                                            <option value="Household">خانواده</option>
                                                            <option value="Management">مدیریت</option>
                                                            <option value="Electronics">الکترونیک</option>
                                                            <option value="Office">دفتر</option>
                                                            <option value="Automotive">خودرو</option>
                                                        </select>
                                                    </div> */}
                                                    <div className="mb-3 col ecommerce-select2-dropdown">
                                                        <label className="form-label mb-1 d-flex justify-content-between align-items-center" htmlFor="category-org">
                                                            <span>دسته</span>
                                                            <a className="fw-medium" href="javascript:void(0);">اضافه کردن دسته جدید</a>
                                                        </label>
                                                        <Select2
                                                            name={'category'}
                                                            asyncUrl="http://localhost:8000/ajax/category-choices/"
                                                            isAsync={true}
                                                            placeholder="انتخاب دسته"
                                                            onChange={(vals) => { console.log(vals) }}
                                                            defaultValue={category}
                                                        />
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col">
                                                            <label className="form-label" htmlFor="ecommerce-product-sku">کد محصول</label>
                                                            <input aria-label="محصول SKU" className="form-control"
                                                                id="ecommerce-product-sku" name="productSku" placeholder="SKU"
                                                                type="number" />
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label" htmlFor="ecommerce-product-barcode">بارکد</label>
                                                            <input aria-label="بارکد محصول" className="form-control"
                                                                id="ecommerce-product-barcode" name="productBarcode"
                                                                placeholder="0123-4567" type="text" />
                                                        </div>
                                                    </div>
                                                    {/* Description */}
                                                    <div>
                                                        <label className="form-label">توضیح (اختیاری)</label>
                                                        {/* <div className="form-control p-0 pt-1">
                                                            <div className="comment-toolbar border-0 border-bottom">
                                                                <div className="d-flex justify-content-start">
                                                                    <span className="ql-formats me-0">
                                                                        <button className="ql-bold"></button>
                                                                        <button className="ql-italic"></button>
                                                                        <button className="ql-underline"></button>
                                                                        <button className="ql-list" value="ordered"></button>
                                                                        <button className="ql-list" value="bullet"></button>
                                                                        <button className="ql-link"></button>
                                                                        <button className="ql-image"></button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="comment-editor border-0 pb-4" id="ecommerce-category-description"></div>
                                                        </div> */}
                                                        <QuillEditorComponent
                                                            id="description"
                                                            name="description"
                                                            value={description}
                                                            toolbarOptions={[
                                                                'bold', 'italic', 'underline',
                                                                { 'list': 'ordered' }, { 'list': 'bullet' },
                                                                'link', 'image', 'gallery'
                                                            ]}
                                                            placeholder="متن خود را وارد کنید..."
                                                            apiSaveImagesUrl="http://localhost:8000/api/save_images/products/"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* /Product Information */}
                                            {/* Media */}
                                            <DropzoneComponent uploadedFiles={images} uploadUrl={"http://localhost:8000/api/save_images/products/"} />
                                            {/* /Media */}
                                            {/* Variants */}
                                            <div id="category_attrs" className="card mb-4">
                                                <div className="card-header">
                                                    <h5 className="card-title mb-0">ویژگی های دسته بندی</h5>
                                                </div>
                                                <div id="category_attrs_items" className="gap-3 d-flex flex-column card-body">
                                                {attrs.map(item=>(
                                                  <DynamicAttributeField data={item} />
                                                ))}
                                                </div>
                                            </div>
                                            <div id="variant_attrs" className="card mb-4">
                                                <div className="card-header">
                                                    <h5 className="card-title mb-0">ویژگی های وریانت</h5>
                                                </div>
                                                <div id="variant_attrs_items" className="card-body mxn-2 row row-cols-3">
                                                </div>
                                            </div>
                                            {/* /Variants */}
                                            {/* Inventory */}
                                            <div className="card mb-4">
                                                <div className="card-header">
                                                    <h5 className="card-title mb-0">سایر موارد</h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        {/* Navigation */}
                                                        <div className="col-12 col-md-4 mx-auto card-separator">
                                                            <div className="d-flex justify-content-between flex-column mb-3 mb-md-0 pe-md-3">
                                                                <ul className="nav nav-align-left nav-pills flex-column">
                                                                    <li className="nav-item">
                                                                        <button className="nav-link py-2 active"
                                                                            data-bs-target="#restock" data-bs-toggle="tab">
                                                                            <i className="ti ti-box me-2"></i>
                                                                            <span className="align-middle">انبار</span>
                                                                        </button>
                                                                    </li>
                                                                    <li className="nav-item">
                                                                        <button className="nav-link py-2" data-bs-target="#shipping"
                                                                            data-bs-toggle="tab">
                                                                            <i className="ti ti-car me-2"></i>
                                                                            <span className="align-middle">حمل و نقل</span>
                                                                        </button>
                                                                    </li>
                                                                    <li className="nav-item">
                                                                        <button className="nav-link py-2"
                                                                            data-bs-target="#global-delivery"
                                                                            data-bs-toggle="tab">
                                                                            <i className="ti ti-world me-2"></i>
                                                                            <span className="align-middle">ارسال بین‌الملل</span>
                                                                        </button>
                                                                    </li>
                                                                    <li className="nav-item">
                                                                        <button className="nav-link py-2" data-bs-target="#attributes"
                                                                            data-bs-toggle="tab">
                                                                            <i className="ti ti-link me-2"></i>
                                                                            <span className="align-middle">سایر ویژگی‌ها</span>
                                                                        </button>
                                                                    </li>
                                                                    <li className="nav-item">
                                                                        <button className="nav-link py-2" data-bs-target="#advanced"
                                                                            data-bs-toggle="tab">
                                                                            <i className="ti ti-lock me-2"></i>
                                                                            <span className="align-middle">پیشرفته</span>
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        {/* /Navigation */}
                                                        {/* Options */}
                                                        <div className="col-12 col-md-8 pt-4 pt-md-0">
                                                            <div className="tab-content p-0 ps-md-3">
                                                                {/* Restock Tab */}
                                                                <div className="tab-pane fade show active" id="restock" role="tabpanel">
                                                                    <h5>مدیریت انبار</h5>
                                                                    <label className="form-label" htmlFor="ecommerce-product-stock">افزودن
                                                                        موجودی انبار</label>
                                                                    <div className="row mb-3 g-3 pe-md-5">
                                                                        <div className="col-12 col-sm-9">
                                                                            <input aria-label="کمیت" className="form-control"
                                                                                id="ecommerce-product-stock" name="limit2"
                                                                                placeholder="مقدار" type="number" />
                                                                        </div>
                                                                        <div className="col-12 col-sm-3">
                                                                            <button className="btn btn-primary align-items-center">
                                                                                <i className="ti ti-check me-2 ti-xs"></i>
                                                                                تایید
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <p className="mb-2">
                                                                            <span className="h6">موجودی محصول:</span>
                                                                            <span>54</span>
                                                                        </p>
                                                                        <p className="mb-2">
                                                                            <span className="h6">درحال ارسال:</span>
                                                                            <span>390</span>
                                                                        </p>
                                                                        <p className="mb-2">
                                                                            <span className="h6">آخرین بروزرسانی:</span>
                                                                            <span>24 آبان 1402</span>
                                                                        </p>
                                                                        <p className="mb-2">
                                                                            <span className="h6">موجودی کل:</span>
                                                                            <span>2430</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {/* Shipping Tab */}
                                                                <div className="tab-pane fade" id="shipping" role="tabpanel">
                                                                    <h5 className="mb-4">روش ارسال محصول</h5>
                                                                    <div>
                                                                        <div className="form-check mb-4">
                                                                            <input className="form-check-input" id="seller"
                                                                                name="shippingType" type="radio" />
                                                                            <label className="form-check-label" htmlFor="seller">
                                                                                <span className="fw-medium d-block mb-1">توسط فروشنده</span>
                                                                                <small>تحویل توسط فروشنده و پیک.
                                                                                    <br />
                                                                                    هر گونه آسیب یا تاخیر در ارسال شامل خسارت می
                                                                                    شود.
                                                                                </small>
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check mb-5">
                                                                            <input defaultChecked className="form-check-input" id="companyName"
                                                                                name="shippingType" type="radio" />
                                                                            <label className="form-check-label" htmlFor="companyName">
                                                                                <span className="fw-medium d-block mb-1">ارسال توسط شرکت شما
                                                                                    <span className="badge rounded-2 badge-warning bg-label-warning fs-tiny py-1 ms-2 border border-warning">پیشنهادی</span>
                                                                                </span>
                                                                                <small>ارسال محصول شما، مسئولیت ماست.
                                                                                    <br />
                                                                                    ما با دریافت هزینه ای ناچیز، فرآیند تحویل را
                                                                                    برای شما انجام خواهیم داد.
                                                                                </small>
                                                                            </label>
                                                                        </div>
                                                                        <p className="mb-0"> برای جزئیات بیشتر به
                                                                            <a href="javascript:void(0);">شرایط و ضوابط تحویل</a>
                                                                            مراجعه کنید
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {/* Global Delivery Tab */}
                                                                <div className="tab-pane fade" id="global-delivery" role="tabpanel">
                                                                    <h5 className="mb-4">ارسال بین‌الملل</h5>
                                                                    {/* Worldwide delivery */}
                                                                    <div className="form-check mb-3">
                                                                        <input className="form-check-input" id="worldwide"
                                                                            name="globalDel" type="radio" />
                                                                        <label className="form-check-label" htmlFor="worldwide">
                                                                            <span className="fw-medium mb-1 d-block">تحویل در سراسر جهان</span>
                                                                            <small>فقط با روش ارسال موجود است:
                                                                                <a href="javascript:void(0);">با نام شرکت تکمیل شده
                                                                                    است</a>
                                                                            </small>
                                                                        </label>
                                                                    </div>
                                                                    {/* Global delivery */}
                                                                    <div className="form-check mb-3">
                                                                        <input defaultChecked className="form-check-input" name="globalDel"
                                                                            type="radio" />
                                                                        <label className="form-check-label w-75 pe-5"
                                                                            htmlFor="country-selected">
                                                                            <span className="fw-medium d-block mb-1">کشورهای منتخب</span>
                                                                            <input className="form-control" id="country-selected"
                                                                                placeholder="نام کشور را تایپ کنید" type="text" />
                                                                        </label>
                                                                    </div>
                                                                    {/* Local delivery */}
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" id="local" name="globalDel"
                                                                            type="radio" />
                                                                        <label className="form-check-label" htmlFor="local">
                                                                            <span className="fw-medium mb-1 d-block">تحویل محلی</span>
                                                                            <small>تحویل به کشور محل اقامت شما:
                                                                                <a href="javascript:void(0);">تغییر آدرس پروفایل</a>
                                                                            </small>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                {/* Attributes Tab */}
                                                                <div className="tab-pane fade" id="attributes" role="tabpanel">
                                                                    <h5 className="mb-4">سایر ویژگی‌ها</h5>
                                                                    <div>
                                                                        {/* Fragile Product */}
                                                                        <div className="form-check mb-3">
                                                                            <input className="form-check-input" id="fragile"
                                                                                type="checkbox" value="fragile" />
                                                                            <label className="form-check-label" htmlFor="fragile">
                                                                                <span className="fw-medium">محصول شکننده</span>
                                                                            </label>
                                                                        </div>
                                                                        {/* Biodegradable */}
                                                                        <div className="form-check mb-3">
                                                                            <input className="form-check-input" id="biodegradable"
                                                                                type="checkbox" value="biodegradable" />
                                                                            <label className="form-check-label" htmlFor="biodegradable">
                                                                                <span className="fw-medium">قابل تجزیه زیستی</span>
                                                                            </label>
                                                                        </div>
                                                                        {/* Frozen Product */}
                                                                        <div className="form-check mb-3">
                                                                            <input defaultChecked className="form-check-input" type="checkbox"
                                                                                value="frozen" />
                                                                            <label className="form-check-label w-75 pe-5" htmlFor="frozen">
                                                                                <span className="fw-medium mb-1 d-block">محصول منجمد</span>
                                                                                <input className="form-control" id="frozen"
                                                                                    placeholder="حداکثر دمای مجاز"
                                                                                    type="number" />
                                                                            </label>
                                                                        </div>
                                                                        {/* Exp Date */}
                                                                        <div className="form-check mb-4">
                                                                            <input defaultChecked className="form-check-input" id="expDate"
                                                                                type="checkbox" value="expDate" />
                                                                            <label className="form-check-label w-75 pe-5"
                                                                                htmlFor="date-input">
                                                                                <span className="fw-medium mb-1 d-block">تاریخ انقضای محصول</span>
                                                                                <input className="product-date form-control"
                                                                                    id="date-input" type="date" />
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* {/* /Attributes Tab Advanced Tab */}
                                                                <div className="tab-pane fade" id="advanced" role="tabpanel">
                                                                    <h5 className="mb-4">پیشرفته</h5>
                                                                    <div className="row">
                                                                        {/* Product Id Type */}
                                                                        <div className="col">
                                                                            <label className="form-label" htmlFor="product-id">
                                                                                <span className="mb-1 h6">نوع شناسه محصول</span>
                                                                            </label>
                                                                            <select className="select2 form-select"
                                                                                data-placeholder="ISBN" id="product-id">
                                                                                <option value="">ISBN</option>
                                                                                <option value="ISBN">ISBN</option>
                                                                                <option value="UPC">UPC</option>
                                                                                <option value="EAN">EAN</option>
                                                                                <option value="JAN">JAN</option>
                                                                            </select>
                                                                        </div>
                                                                        {/* Product Id */}
                                                                        <div className="col">
                                                                            <label className="form-label" htmlFor="product-id-1">
                                                                                <span className="mb-1 h6">شناسه محصول</span>
                                                                            </label>
                                                                            <input className="form-control" id="product-id-1"
                                                                                placeholder="شماره شابک" type="number" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* /Advanced Tab */}
                                                            </div>
                                                        </div>
                                                        {/* /Option */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* /Inventory */}
                                        </div>
                                        {/* {/* /Second column Second column */}
                                        <div className="col-12 col-lg-4">
                                            {/* Pricing Card */}
                                            <div className="card mb-4">
                                                <div className="card-header">
                                                    <h5 className="card-title mb-0">قیمت گذاری</h5>
                                                </div>
                                                <div className="card-body">
                                                    {/* Base Price */}
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="price">قیمت پایه</label>
                                                        <input aria-label="قیمت محصول" className="form-control" id="price" name="price" placeholder="قیمت" type="number" />
                                                    </div>

                                                    {/* Discounted Price */}
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="ecommerce-product-discount-price">قیمت با
                                                            تخفیف</label>
                                                        <input aria-label="محصول قیمت با تخفیف" className="form-control"
                                                            id="ecommerce-product-discount-price" name="productDiscountedPrice"
                                                            placeholder="قیمت با تخفیف" type="number" />
                                                    </div>
                                                    {/* Charge tax check box */}
                                                    <div className="form-check mb-2">
                                                        <input defaultChecked className="form-check-input" id="price-charge-tax"
                                                            type="checkbox" value="" />
                                                        <label className="form-label" htmlFor="price-charge-tax"> دارای مالیات</label>
                                                    </div>
                                                    {/* Instock switch */}
                                                    <div className="d-flex justify-content-between align-items-center border-top pt-3">
                                                        <h6 className="mb-0">موجود در انبار</h6>
                                                        <div className="w-25 d-flex justify-content-end">
                                                            <label className="switch switch-primary switch-sm me-4 pe-2">
                                                                <input defaultChecked className="switch-input" type="checkbox" />
                                                                <span className="switch-toggle-slider">
                                                                    <span className="switch-on">
                                                                        <span className="switch-off"></span>
                                                                    </span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* {/* /Pricing Card Organize Card */}
                                            <div className="card mb-4">
                                                <div className="card-header">
                                                    <h5 className="card-title mb-0">جزئیات</h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="d-flex flex-column gap-3 border border-dashed p-3 mb-3">
                                                        {/* Part number manual */}
                                                        <div className="form-check m-0">
                                                            <input
                                                                type="checkbox"
                                                                id={'part_number_is_manual'}
                                                                name={'part_number_is_manual'}
                                                                className="form-check-input"
                                                                defaultChecked={!!partNumberIsManual}
                                                            />
                                                            <label class="form-label" for="part_number_is_manual">پارت نامبر دستی</label>
                                                        </div>
                                                        {/* Part number en */}
                                                        <div>
                                                            <label class="form-label" for="part_number_en">پارت نامبر انگلیسی</label>
                                                            <input
                                                                id={'part_number_en'}
                                                                name={'part_number_en'}
                                                                className="form-control"
                                                            />
                                                            <span id="help_part_number_en" class="fs-tiny form-label"></span>
                                                        </div>
                                                        {/* Part number fa */}
                                                        <div>
                                                            <label class="form-label" for="part_number_fa">پارت نامبر فارسی</label>
                                                            <input
                                                                id={'part_number_fa'}
                                                                name={'part_number_fa'}
                                                                className="form-control"
                                                            />
                                                            <span id="help_part_number_fa" class="fs-tiny form-label"></span>
                                                        </div>
                                                        {/* Part number bz */}
                                                        <div>
                                                            <label class="form-label" for="part_number_bz">پارت نامبر بازاری</label>
                                                            <input
                                                                id={'part_number_bz'}
                                                                name={'part_number_bz'}
                                                                className="form-control"
                                                            />
                                                            <span id="help_part_number_bz" class="fs-tiny form-label"></span>
                                                        </div>
                                                    </div>
                                                    {/* Status */}
                                                    {/* <div className="mb-3 col ecommerce-select2-dropdown">
                                                        <label className="form-label mb-1" htmlFor="status-org">وضعیت</label>
                                                        <select className="select2 form-select" data-placeholder="وضعیت انتشار" id="status-org">
                                                            <option value="">انتخاب وضعیت</option>
                                                            <option value="Published">منتشر شده</option>
                                                            <option value="Scheduled">انتشار زمان‌دار</option>
                                                            <option value="Inactive">غیر فعال</option>
                                                        </select>
                                                    </div> */}
                                                    <div className="mb-3 col ecommerce-select2-dropdown">
                                                        <label className="form-label mb-1" htmlFor="status-org">وضعیت</label>
                                                        <Select2
                                                            name={'status'}
                                                            asyncUrl="http://localhost:8000/ajax/status-choices/" 
                                                            isAsync={true}
                                                            placeholder="وضعیت انتشار"
                                                            defaultValue={status}
                                                            onChange={(vals) => { console.log(vals) }}
                                                        />
                                                    </div>
                                                    {/* Tags */}
                                                    {/* <div className="mb-3">
                                                        <label className="form-label mb-1" htmlFor="ecommerce-product-tags">برچسب ها</label>
                                                        <input aria-label="برچسب های محصول" className="form-control" id="ecommerce-product-tags" name="ecommerce-product-tags" value="عادی,تخفیف دار,ویژه" />
                                                    </div> */}
                                                    <div className="mb-3">
                                                        <label className="form-label mb-1" htmlFor="ecommerce-product-tags">برچسب ها</label>
                                                        <TagifyComponent
                                                            asyncUrl="http://localhost:8000/ajax/tags/"
                                                            placeholder="Search for tags..."
                                                            onChange={(tags) => { console.log(tags); }}
                                                            defaultValue={tags}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* /Organize Card */}
                                        </div>
                                        {/* /Second column */}
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

export default CreateProductPage;