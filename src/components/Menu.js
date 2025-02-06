import Button from "./Button";
import {usePathname} from "next/navigation";
import {useState} from "react";

const Menu = () => {
    const pathname = usePathname();
    const [activePath, setActivePath] = useState([]);
    const menuItems = [
        {
            path: '/product/',
            label: 'محصولات',
            icon: <i className="menu-icon tf-icons ti ti-box"></i>,
            childes: [
                {
                    regex: /^\/product$/,
                    path: '/product',
                    label: 'لیست محصولات',
                    icon: <i className="menu-icon tf-icons ti ti-list"></i>,
                },
                {
                    regex: /^\/product\/save(\/*)(\d*)$/,
                    path: '/product/save',
                    label: 'افزودن محصول',
                    icon: <i className="menu-icon tf-icons ti ti-plus"></i>,
                }
            ]
        },
        {
            path: '/category/',
            label: 'دسته بندی ها',
            icon: <i className="menu-icon tf-icons ti ti-layout-grid-add"></i>,
            childes: [
                {
                    regex: /^\/category$/,
                    path: '/category',
                    label: 'لیست دسته بندی ها',
                    icon: <i className="menu-icon tf-icons ti ti-list"></i>,
                },
                {
                    regex: /^\/category\/save(\/*)(\d*)$/,
                    path: '/category/save',
                    label: 'افزودن دسته بندی',
                    icon: <i className="menu-icon tf-icons ti ti-plus"></i>,
                }
            ]
        },
        {
            path: '/listid/',
            label: 'مقادیر',
            icon: <i className="menu-icon tf-icons ti ti-file-text"></i>,
            childes: [
                {
                    regex: /^\/listid$/,
                    path: '/listid',
                    label: 'لیست مقادیر',
                    icon: <i className="menu-icon tf-icons ti ti-list"></i>,
                },
                {
                    regex: /^\/listid\/save(\/*)(\d*)$/,
                    path: '/listid/save',
                    label: 'افزودن مقدار',
                    icon: <i className="menu-icon tf-icons ti ti-plus"></i>,
                }
            ]
        },
    ]

    const renderMenu = (menuItems, prevPath = []) => (
        menuItems.map((menuItem, key) => {
            const currentPath = [...prevPath, menuItem.path];
                console.log('currentPath', menuItem.regex, pathname, menuItem.regex && menuItem.path.match(menuItem.regex), currentPath)
            if (menuItem.regex && pathname.match(menuItem.regex)) {
                !activePath.length && setActivePath(currentPath)
            }
            return <li key={key} className={`menu-item ${activePath.includes(menuItem.path) ? 'active' : ''}`}>
                <Button href={pathname !== menuItem.path && !menuItem.childes ? menuItem.path : null} className={`w-100 menu-link ${menuItem.childes?.length ? 'menu-toggle' : ''}`}>
                    {menuItem.icon}
                    <div data-i18n="Pages">{menuItem.label}</div>
                </Button>
                {menuItem.childes?.length ?
                    <ul className="menu-sub">
                        {renderMenu(menuItem.childes, currentPath)}
                    </ul>
                    : null}
            </li>
        }))
    return (
        <aside
            className="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0"
            id="layout-menu"
        >
            <div className="container-xxl d-flex h-100">
                <ul className="menu-inner">
                    {renderMenu(menuItems)}
                </ul>
            </div>
        </aside>
    );
};

export default Menu;
