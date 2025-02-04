"use client";

import Header from './Header';
import Menu from './Menu';
import ConfirmProvider from "./ConfirmModalComponent";
import Toast from "../utils/funcs";
import {useEffect, useRef} from "react";

export default function ClientLayout({ children }) {
    const isFirst = useRef(true);
    useEffect(() => {
        if (!isFirst.current) return
        isFirst.current = false;
        const msg = localStorage.getItem('msg');
        if (msg) {
            Toast.success(msg)
            localStorage.removeItem('msg');
        }
    }, []);
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
