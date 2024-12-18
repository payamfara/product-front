"use client";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import {Fragment, useState, useEffect} from "react";
import DataTable from "../../components/DataTable";
import {baseApiAuth} from "../../api/baseApi";
import CustomLoading from "../../components/Loading";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {createRoot} from "react-dom/client";
import Menu from '@/src/components/Menu';
import Header from '@/src/components/Header';

const ListProductPage = () => {
    const columns = [
        {
            search_fields: ['part_number_en', 'part_number_fa', 'part_number_bz'],
            width: '40',
            title: "عنوان محصول",
            render: (data, type, row) => {
                return <div className="d-flex justify-content-start align-items-center product-name">
                    <div className="avatar-wrapper">
                        <div className="avatar avatar me-2 rounded-2 bg-label-secondary">
                            <img src={row.images[0]} alt={row.part_number_en} className="rounded-2"/>
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <h6 className="text-body text-nowrap mb-0">{row.part_number_en}</h6>
                        <small className="text-muted text-truncate d-none d-sm-block">{row.part_number_fa}</small>
                    </div>
                </div>;
            },
        },
        {
            search_fields: ['category__title_en', 'category__title_fa', 'category__title_bz'],
            width: '15',
            title: "دسته بندی",
            data: "category_str"
        },
        {
            search_fields: ['id'],
            width: '15',
            title: "کد محصول",
            data: "id"
        },
        {
            search_fields: ['price'],
            width: '15',
            title: "قیمت",
            data: "price",
            render: (data, type, row) => data + " تومان",
        },
        {
            width: '15',
            title: "عملیات",
            render: (data, type, row) => {
                return (
                    <div className="d-flex gap-2">
                        <IconEdit size={16} />
                        <IconTrash size={16} />
                    </div>
                );
            },
        },
    ];

    return (
        <Fragment>
            <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
                <div className="layout-container">
                    <Header/>
                    <div className="layout-page">
                        <div className="content-wrapper">
                            <Menu/>
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <h4 className="py-3 mb-4">
                                    <span className="text-muted fw-light"> صفحه اصلی / </span>
                                    لیست محصولات
                                </h4>
                                <div className="card">
                                    <div className="card-header row row-cols-3 gy-3 flex-wrap">
                                        <h5 className="card-title col-12">لیست محصولات</h5>
                                        <div>
                                            <DynamicAttributeField
                                                data={{
                                                    attribute_name_en: "status",
                                                    attribute_name_fa: "وضعیت",
                                                    attr_type: {
                                                        type: "select_2",
                                                        url: "/api2/myapp-choice/?title=status",
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <DynamicAttributeField
                                                data={{
                                                    attribute_name_en: "category",
                                                    attribute_name_fa: "دسته بندی",
                                                    attr_type: {
                                                        type: "select_2",
                                                        url: "/api2/myapp-category/?",
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div>
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
                                    </div>
                                    <DataTable columns={columns}/>
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
