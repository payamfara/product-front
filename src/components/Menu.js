import Link from "next/link";

const Menu = () => {
    return (
        <aside
            className="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0"
            id="layout-menu"
        >
            <div className="container-xxl d-flex h-100">
                <ul className="menu-inner">
                    <li className="menu-item active">
                        <a className="menu-link menu-toggle" role="button">
                            <i className="menu-icon tf-icons ti ti-box"></i>
                            <div data-i18n="Pages">محصولات</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <Link className="menu-link" href="/product/">
                                    <i className="menu-icon tf-icons ti ti-list"></i>
                                    <div data-i18n="Front Pages">لیست محصولات</div>
                                </Link>
                                <Link
                                    className="menu-link"
                                    href="/product/save/"
                                >
                                    <i className="menu-icon tf-icons ti ti-plus"></i>
                                    <div data-i18n="Pricing">افزودن محصول</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <a className="menu-link menu-toggle" role="button">
                            <i className="menu-icon tf-icons ti ti-layout-grid-add"></i>
                            <div data-i18n="Pages">دسته بندی ها</div>
                        </a>
                        <ul className="menu-sub">
                        <li className="menu-item">
                                <Link className="menu-link" href="/product/">
                                    <i className="menu-icon tf-icons ti ti-list"></i>
                                    <div data-i18n="Front Pages">لیست دسته بندی ها</div>
                                </Link>
                                <Link
                                    className="menu-link"
                                    href="/product/save/"
                                >
                                    <i className="menu-icon tf-icons ti ti-plus"></i>
                                    <div data-i18n="Pricing">افزودن دسته بندی</div>
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
