const Menu = () => {
  return (
    <aside
      className="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0"
      id="layout-menu"
    >
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
                    <a
                      className="menu-link"
                      href="/product/save/"
                      target="_blank"
                    >
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
  );
};

export default Menu;
