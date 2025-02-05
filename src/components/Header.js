import {Fragment} from "react";
import CustomDropdown from "./CustomDropdown";
import Cookies from "js-cookie";
import Link from "next/link";


const Header = () => {
    const styleSwitcherItems = {
        toggle: {
            className: "nav-link no-caret",
            variant: "",
            icon: <i className="ti ti-md ti-sun"></i>,
        },
        items: [
            {
                title: "روز",
                icon: <i className="ti ti-sun me-2"></i>,
                onClick: () => btnPrint.click(),
            },
            {
                title: "شب",
                icon: <i className="ti ti-moon me-2"></i>,
                onClick: () => btnCsv.click(),
            },
            {
                title: "سیستم",
                icon: <i className="ti ti-device-desktop me-2"></i>,
                onClick: () => btnCopy.click(),
            },
        ],
    };
    const notificationItems = {
        header: {
            icon: <i className="ti ti-mail-opened fs-4"></i>,
            title: "اعلانات",
        },
        footer: {
            title: "نمایش همه اعلانات",
        },
        toggle: {
            className: "nav-link no-caret",
            variant: "",
            icon: (
                <Fragment>
                    <i className="ti ti-bell ti-md"></i>
                    <span className="badge bg-danger rounded-pill badge-notifications">
            5
          </span>
                </Fragment>
            ),
        },
        items: [
            {
                img: "/images/1.png",
                title: "تبریک به شما 🎉",
                msg: "نشان برترین فروشنده ماه رو گرفتید",
                date: "الان",
            },
            {
                img: "",
                title: "نوید محمدزاده",
                msg: "درخواست شمارا پذیرفت.",
                date: "1 ساعت قبل",
            },
            {
                icon: <i className="ti ti-shopping-cart"></i>,
                title: "ایول! سفارش جدید داری 🛒",
                msg: "شرکت یلدا سفارشی جدید ثبت کرد.",
                date: "امروز",
            },
            {
                icon: <i className="ti ti-shopping-cart"></i>,
                title: "ایول! سفارش جدید داری 🛒",
                msg: "شرکت یلدا سفارشی جدید ثبت کرد.",
                date: "امروز",
            },
            {
                icon: <i className="ti ti-shopping-cart"></i>,
                title: "ایول! سفارش جدید داری 🛒",
                msg: "شرکت یلدا سفارشی جدید ثبت کرد.",
                date: "امروز",
            },
        ],
    };
    const profileItems = {
        toggle: {
            className: "nav-link no-caret",
            variant: "",
            img: "/images/1.png",
        },
        items: [
            {
                img: "/images/1.png",
                title: "نوید محمدزاده",
                msg: "مدیرکل",
            },
            [
                {
                    icon: <i className="ti ti-user-check me-2 ti-sm"></i>,
                    title: "پروفایل من",
                },
                {
                    icon: <i className="ti ti-settings me-2 ti-sm"></i>,
                    title: "تنظیمات",
                },
            ],
            {
                icon: <i className="ti ti-logout me-2 ti-sm"></i>,
                title: "خروج از حساب",
                onClick: () => {
                    Cookies.remove('authToken');
                    window.location.reload();
                },
            },
        ],
    };

    return (
        <nav
            className="layout-navbar navbar navbar-expand-md align-items-center bg-navbar-theme"
            id="layout-navbar"
        >
            <div className="container-xxl">
                <div className="navbar-brand app-brand demo d-none d-md-flex py-0 me-4">
                    <Link className="app-brand-link gap-2" href={'/'}>
                        <span className="app-brand-logo demo">
                          <img alt="logo" src="/logo-sm.svg"/>
                        </span>
                        <span className="app-brand-text demo menu-text fw-bold">
                          میکـرومـدرن
                        </span>
                    </Link>
                    <button
                        className="layout-menu-toggle menu-link text-large ms-auto d-md-none"
                    >
                        <i className="ti ti-x ti-sm align-middle"></i>
                    </button>
                </div>
                <div className="layout-menu-toggle navbar-nav align-items-md-center me-3 me-md-0 d-md-none">
                    <button
                        className="nav-item nav-link px-0 me-md-4"
                    >
                        <i className="ti ti-menu-2 ti-sm"></i>
                    </button>
                </div>
                <div
                    className="navbar-nav-right d-flex align-items-center"
                    id="navbar-collapse"
                >
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        <li className="nav-item">
                            <CustomDropdown hasSpace data={styleSwitcherItems}/>
                        </li>
                        <li className="nav-item dropdown-notifications navbar-dropdown">
                            <CustomDropdown hasDivider isScrollale data={notificationItems}/>
                        </li>
                        <li className="nav-item navbar-dropdown dropdown-user">
                            <CustomDropdown hasDivider hasSpace data={profileItems}/>
                        </li>
                    </ul>
                </div>
                <div className="navbar-search-wrapper search-input-wrapper container-xmd d-none">
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
    );
};

export default Header;