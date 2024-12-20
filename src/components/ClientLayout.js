"use client";

import Header from './Header';
import Menu from './Menu';
import ConfirmProvider from "./ConfirmModalComponent";

export default function ClientLayout({ children }) {
    return (
        <>
            <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
                <div className="layout-container">
                    <Header/>
                    <div className="layout-page">
                        <div className="content-wrapper">
                            <Menu/>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <div className="layout-overlay layout-menu-toggle"></div>
            <div className="drag-target"></div>
            <ConfirmProvider />
        </>
    );
}
