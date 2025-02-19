"use client";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import DataTable from "../../components/DataTable";
import {IconCamera, IconEdit, IconTrash} from "@tabler/icons-react";
import ClientLayout from "../../components/ClientLayout";
import React, {useState} from "react";
import Link from "next/link";
import {confirm} from "../../components/ConfirmModalComponent";
import {baseApiAuth} from "../../api/baseApi";
import DataTable2 from "../../components/DataTable2";
import {mediaUrl} from "../../utils/funcs";
import DataTable3 from "../../components/DataTable3";

const ListProductPage = () => {

    const deleteProduct = async (id) => {
        const requestUrl = `/api2/listid/${id}/`;
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
            if (status) {
                setFields(fields => ({
                    ...fields,
                    is_delete: id,
                }))
            }
        } else {
            console.log("Action canceled.");
        }
    };

    const columns = [
        {
            search_fields: ['title_en'],
            width: '40',
            title: "عنوان کلید مقدار",
            render: (data, type, row) => {
                return <div className="d-flex justify-content-start align-items-center product-name">
                    <div className="avatar-wrapper">
                        <div className="avatar avatar me-2 rounded-2 bg-label-secondary">
                            {row.image
                                ? <img src={mediaUrl(row.image)} alt={row.title_en} className="rounded-2"/>
                                : <div
                                    className="bg-secondary-subtle d-flex justify-content-center align-items-center card-img card-body p-0">
                                    <IconCamera size={24}/>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <h6 className="text-body text-nowrap mb-0">{row.title_en}</h6>
                    </div>
                </div>;
            },
        },
        {
            search_fields: ['id'],
            width: '15',
            title: "کد کلید مقدار",
            data: "id"
        },
        {
            width: '15',
            title: "عملیات",
            render: (data, type, row) => {
                return (
                    <div className="d-flex gap-2">
                        <Link href={`/listid/save/${row.id}`}><IconEdit size={20}/></Link>
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
            [attribute]: {...fields[attribute], ...extraData},
            is_delete: false,
        }))
    }

    return (
        <ClientLayout>

            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="py-3 mb-4">
                    <span className="text-muted fw-light"> صفحه اصلی / </span>
                    لیست کلید مقدار ها
                </h4>
                <div className="card">
                    <div className="card-header row row-cols-3 gy-3 flex-wrap">
                        <h5 className="card-title col-12">لیست کلید مقدار ها</h5>
                    </div>
                    <DataTable3 columns={columns} fields={fields}/>
                </div>
            </div>
        </ClientLayout>

    );
};

export default ListProductPage;
