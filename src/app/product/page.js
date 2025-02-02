"use client";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import DataTable from "../../components/DataTable";
import {IconCamera, IconEdit, IconTrash} from "@tabler/icons-react";
import ClientLayout from "../../components/ClientLayout";
import React, {useState} from "react";
import Link from "next/link";
import {confirm} from "../../components/ConfirmModalComponent";
import {baseApiAuth} from "../../api/baseApi";

const ListProductPage = () => {

    const deleteProduct = async (id) => {
        const requestUrl = `/api2/product/${id}/`;
        // setFormDisabled(true);
        try {
            const response = await baseApiAuth
                .delete(requestUrl)
            return [true, response.data];
        } catch (err) {
            console.error("Error fetching tags:", err);
            return [false, err]
        } finally {
            // setFormDisabled(false);
        }
    }

    const handleDelete = async (id) => {
        const result = await confirm({});
        console.log('result', result);

        if (result) {
            console.log('')
            const [status, results] = await deleteProduct(id)
            console.log(status, results)
            if (status)
                console.log("Item deleted!");
        } else {
            console.log("Action canceled.");
        }
    };

    const columns = [
        {
            search_fields: ['part_number_en', 'part_number_fa', 'part_number_bz'],
            width: '40',
            title: "عنوان محصول",
            render: (data, type, row) => {
                return <div className="d-flex justify-content-start align-items-center product-name">
                    <div className="avatar-wrapper">
                        <div className="avatar avatar me-2 rounded-2 bg-label-secondary">
                            {row.images[0]
                                ? <img src={row.images[0]} alt={row.part_number_en} className="rounded-2"/>
                                : <div
                                    className="bg-secondary-subtle d-flex justify-content-center align-items-center card-img card-body p-0">
                                    <IconCamera size={24}/>
                                </div>
                            }
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
            render: (data, type, row) => data + " ءتء",
        },
        {
            width: '15',
            title: "عملیات",
            render: (data, type, row) => {
                return (
                    <div className="d-flex gap-2">
                        <Link href={`/product/save/${row.id}`}><IconEdit size={20}/></Link>
                        <IconTrash role={'button'} onClick={()=>handleDelete(row.id)} size={20}/>
                    </div>
                );
            },
        },
    ];
    const [fields, setFields] = useState({});

    const updateFields = (attribute, value, opr) => {
        const extraData = typeof value === "object"
            ? {
                value: value.id,
                value_str: (value.value || value.label || value.name || value.title_en),
                opr: opr
            } : {
                value: value,
                opr: opr
            }

        setFields(fields => ({
            ...fields,
            [attribute]: {...fields[attribute], ...extraData}
        }))
    }

    return (
        <ClientLayout>

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
                                    attribute_value: fields.status?.value,
                                    attribute_value_str: fields.status?.value_str
                                }}
                                onChange={(value) => updateFields('status', value, '=')}
                            />
                        </div>
                        <div>
                            <DynamicAttributeField
                                data={{
                                    attribute_name_en: "category",
                                    attribute_name_fa: "دسته بندی",
                                    attr_type: {
                                        type: "select_2",
                                        url: "/api2/myapp-category/",
                                    },
                                    attribute_value: fields.category?.value,
                                    attribute_value_str: fields.category?.value_str
                                }}
                                onChange={(value) => updateFields('category', value, '=')}
                            />
                        </div>
                        {/*<div>*/}
                        {/*    <DynamicAttributeField*/}
                        {/*        data={{*/}
                        {/*            attribute_name_en: "status",*/}
                        {/*            attribute_name_fa: "وضعیت انبار",*/}
                        {/*            attr_type: {*/}
                        {/*                type: "list",*/}
                        {/*                choices: [{id: 1, name}]*/}
                        {/*            },*/}
                        {/*            attribute_value: fields.category,*/}
                        {/*        }}*/}
                        {/*        onChange={(value) => updateFields('limit', value, '>')}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                    <DataTable columns={columns} fields={fields}/>
                </div>
            </div>
        </ClientLayout>

    );
};

export default ListProductPage;
