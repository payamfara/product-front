"use client";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-bs5";
import React, {useEffect, useState} from "react";
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
import {baseApiAuth} from "../api/baseApi";
import Spinner from "./Spinner";
import CustomPagination from "./CustomPagination";

const DataTable = ({data, columns}) => {
    const [pageData, setPageData] = useState([]);
    const [search, setSearch] = useState({
        page_size: 7,
        page: 1,
        q: '',
    });
    const [loading, setLoading] = useState(true);
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const pageSizeItems = [
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
            const queryParams = new URLSearchParams(search).toString();
            const requestUrl = `/api2/product/`
            const response = await baseApiAuth.get(`${requestUrl}?${queryParams}`);
            return response.data || [];
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }

    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);


    useEffect(() => {
        setLoading(true);
        fetchProducts().then((data) => {
            setPageData(data);
            setLoading(false);
        });
    }, [debouncedSearch]);

    const handleSearchChange = (attribute, value) => {
        if (attribute === "q") {

        }
        setSearch((prev) => ({
            ...prev,
            [attribute]: value,
        }));
        setLoading(true);
    };
    const handlePageChange = (handlePageFunction) => {
        setPageData(pageData=>({...pageData, current_page: handlePageFunction(pageData.current_page)}));
    };
    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <DynamicAttributeField
                    data={{
                        attribute_name_en: "q",
                        attribute_name_fa: "جستجو محصول",
                        attr_type: {type: "string"},
                        attribute_value: search.q,
                    }}
                    onChange={(value) => handleSearchChange("q", value)}
                />
                <div className="d-flex gap-3">
                    <div>
                        <select
                            className={'h-100 form-select'}
                            name={'page_size'}
                        >
                            {pageSizeItems.map((item, index) => (
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
                    <colgroup>
                        {columns.map((column, index) => (
                            <col key={index} className={`col-${column.width}`}/>
                        ))}
                    </colgroup>
                    <thead className="border-top">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className={'align-middle'}>
                                {col.search_fields ? <DynamicAttributeField
                                    data={{
                                        attribute_name_en: col.data,
                                        attribute_name_fa: col.title,
                                        attribute_placeholder: 'جستجو ...',
                                        attr_type: {type: "string"},
                                        attribute_value: search[col.data],
                                    }}
                                    onChange={(value) => handleSearchChange(col.data, value)}
                                /> : col.title}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? <tr>
                        <td colSpan={columns.length} className={'text-center border-0 pt-4'}>
                            <div style={{minWidth: "100%"}}>
                                <Spinner/>
                            </div>
                        </td>
                    </tr> : pageData.results.map((row, rowIndex) =>
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
                <div className="d-flex row-cols-auto justify-content-between align-items-center">
                    <div>نمایش {((search.page - 1) * search.page_size) + 1} تا {search.page * search.page_size} از {pageData.total_pages * search.page_size}</div>
                    <CustomPagination
                        currentPage={pageData.current_page}
                        totalPages={pageData.total_pages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default DataTable;
