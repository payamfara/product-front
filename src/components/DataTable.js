"use client";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-bs5";
import React, {useEffect, useState, useRef} from "react";
import $ from "jquery";
import CustomDropdown from "./CustomDropdown";
import {
    IconPrinter,
    IconFile,
    IconCopy,
    IconPlus,
    IconDownload,
} from "@tabler/icons-react";
import RippleButton from "../components/RippleButton/RippleButton";
import DynamicAttributeField from "./DynamicAttributeField";
import CustomLoading from "./Loading";
import {baseApiAuth} from "../api/baseApi";

const DataTable = ({data, columns}) => {
    const tableRef = useRef(null);
    const [pageData, setPageData] = useState([]);
    const [search, setSearch] = useState({
        num: 7,
        page: 1,
    });
    const [loading, setLoading] = useState(true);

    const numItems = [
        {id: 7, value: 7},
        {id: 10, value: 10},
        {id: 20, value: 20},
        {id: 50, value: 50},
        {id: 70, value: 70},
        {id: 100, value: 100},
    ]
    const btnItems = {
        toggle: {
            title: "گرفتن خروجی",
            icon: <IconDownload size={16}/>,
            variant: "light",
        },
        items: [
            {
                title: "چاپ",
                icon: <IconPrinter size={16}/>,
                onClick: () => $("#btnPrint").click(),
            },
            {
                title: "Csv",
                icon: <IconFile size={16}/>,
                onClick: () => $("#btnCsv").click(),
            },
            {
                title: "کپی",
                icon: <IconCopy size={16}/>,
                onClick: () => $("#btnCopy").click(),
            },
        ],
    };

    const fetchProducts = async () => {
        try {
            const response = await baseApiAuth.get(`/api2/product/`);
            return response.data || [];
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    };

    useEffect(() => {
        if (loading) {
            fetchProducts().then((data) => {
                setPageData(data);
                setLoading(false);
            });
        }
    }, [pageData, columns, loading]);

    const handleSearchChange = (attribute, value) => {
        setSearch((prev) => ({
            ...prev,
            [attribute]: value,
        }));
        setLoading(true);
    };

    if (loading) {
        return <CustomLoading/>;
    }

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <DynamicAttributeField
                    data={{
                        attribute_name_en: "term",
                        attribute_name_fa: "جستجو محصول",
                        attr_type: {type: "string"},
                        attribute_value: search["term"],
                    }}
                    onChange={(value) => handleSearchChange("term", value)}
                />
                <div className="d-flex gap-3">
                    <div>
                        <select
                            className={'h-100 form-select'}
                            name={'term'}
                        >
                            {numItems.map((item, index) => (
                                <option key={index} value={item.id}>{item.value}</option>
                            ))}
                        </select>
                    </div>
                    <CustomDropdown data={btnItems}/>
                    <RippleButton
                        className="d-flex align-items-center gap-1 z-1 btn btn-primary p-1 px-4"
                        title="Add Product"
                    >
                        <IconPlus size={16}/>
                        افزودن محصول
                    </RippleButton>
                </div>
            </div>
            <div className="">
                <table
                    className="mb-3 table table-hover"
                >
                    <thead className="border-top">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {pageData.map((row, rowIndex) =>
                        <tr key={rowIndex}>
                            {columns.map((col, index) => {
                                return (
                                    <td key={index}>
                                        {col.render
                                            ? col.render(col.data ? row[col.data] : "", col.type, row)
                                            : row[col.data]
                                        }
                                    </td>
                                )
                            })}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <div className="row justify-content-between align-items-center">
                    <div>نمایش {((search.page - 1) * search.num) + 1} تا {search.page * search.num}</div>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
