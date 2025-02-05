import Link from "next/link";
import RippleButton from "./RippleButton/RippleButton";

const Menu = () => {
    return (
        <aside
            className="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0"
            id="layout-menu"
        >
            <div className="container-xxl d-flex h-100">
                <ul className="menu-inner">
                    <li className="menu-item active">
                        <button className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons ti ti-box"></i>
                            <div data-i18n="Pages">محصولات</div>
                        </button>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <Link href="/product/" className="menu-link">
                                    <i className="menu-icon tf-icons ti ti-list"></i>
                                    <div data-i18n="Front Pages">لیست محصولات</div>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link href="/product/save/" className="menu-link">
                                    <i className="menu-icon tf-icons ti ti-plus"></i>
                                    <div data-i18n="Pricing">افزودن محصول</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <button className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons ti ti-layout-grid-add"></i>
                            <div data-i18n="Pages">دسته بندی ها</div>
                        </button>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <Link className="menu-link" href="/category/">
                                    <i className="menu-icon tf-icons ti ti-list"></i>
                                    <div data-i18n="Front Pages">لیست دسته بندی ها</div>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link
                                    className="menu-link"
                                    href="/category/save/"
                                >
                                    <i className="menu-icon tf-icons ti ti-plus"></i>
                                    <div data-i18n="Pricing">افزودن دسته بندی</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <button className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons ti ti-file-text"></i>
                            <div data-i18n="Pages">مقادیر</div>
                        </button>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <Link className="menu-link" href="/listid/">
                                    <i className="menu-icon tf-icons ti ti-list"></i>
                                    <div data-i18n="Front Pages">لیست مقادیر</div>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link
                                    className="menu-link"
                                    href="/listid/save/"
                                >
                                    <i className="menu-icon tf-icons ti ti-plus"></i>
                                    <div data-i18n="Pricing">افزودن مقادیر</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Menu;
