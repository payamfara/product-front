"use client";
import React, {useEffect, useState} from "react";
import CustomDropdown from "./CustomDropdown";
import {
    IconPrinter,
    IconFile,
    IconCopy,
    IconPlus,
    IconDownload, IconChevronDown, IconChevronUp,
} from "@tabler/icons-react";
import RippleButton from "../components/RippleButton/RippleButton";
import DynamicAttributeField from "./DynamicAttributeField";
import {baseApiAuth} from "../api/baseApi";
import Spinner from "./Spinner";
import CustomPagination from "./CustomPagination";
import Link from "next/link";

const DataTable = ({fields, columns}) => {
    const [pageData, setPageData] = useState([]);
    const [search, setSearch] = useState({
        page_size: {value: 10, opr: '='},
        page: {value: 1, opr: '='},
        q: {value: '', opr: '='},
        order_by: {value: '-pk', opr: '='},
    });
    const [loading, setLoading] = useState(true);
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const oprItems = [
        {id: '*', value: '*'},
        {id: '=', value: '='},
        {id: '>', value: '>'},
        {id: '<', value: '<'},
    ]
    const pageSizeItems = [
        {id: 10, value: 10},
        {id: 20, value: 20},
        {id: 50, value: 50},
        {id: 70, value: 70},
        {id: 100, value: 100},
    ]
    const btnItems = {
        toggle: {
            title: "گرفتن خروجی",
            icon: <IconDownload size={18}/>,
            variant: "light",
        },
        items: [
            {
                title: "چاپ",
                icon: <IconPrinter className={'d-inline-block me-2'} size={20}/>,
                // onClick: () => $("#btnPrint").click(),
            },
            {
                title: "Csv",
                icon: <IconFile className={'d-inline-block me-2'} size={20}/>,
                // onClick: () => $("#btnCsv").click(),
            },
            {
                title: "کپی",
                icon: <IconCopy className={'d-inline-block me-2'} size={20}/>,
                // onClick: () => $("#btnCopy").click(),
            },
        ],
    };

    const valueOprMap = (attribute, opr) => {
        switch (opr) {
            case ">":
                return `${attribute}__gt`;
            case "<":
                return `${attribute}__lt`;
            case "=":
                return `${attribute}`;
            default:
                return `${attribute}__icontains`;
        }
    }

    const fetchProducts = async () => {
        try {
            const prepareQueryParams = Object.fromEntries(Object.entries(search).map(([attribute, valueObj]) => [valueOprMap(attribute, valueObj.opr), valueObj.value]));
            const queryParams = new URLSearchParams(prepareQueryParams).toString();
            const requestUrl = `/api2/product/`
            const response = await baseApiAuth.get(`${requestUrl}?${queryParams}`);
            return response.data || [];
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }

    };

    useEffect(() => {
        if (fields) {
            setSearch((prevSearch) => ({
                ...prevSearch,
                ...fields
            }));
        }
    }, [fields]);

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

    const handleSearchChange = (searchFields, value, opr) => {
        setSearch((prev) => {
            const updatedFields = searchFields.reduce((acc, field) => {
                acc[field] = {
                    value: value !== undefined ? value : prev[field]?.value,
                    opr: opr !== undefined ? opr : prev[field]?.opr,
                };
                if (field !== 'page')
                    acc['page'] = {...prev['page'], value: 1};
                if (field === 'order_by')
                    if (prev['order_by'].value === value)
                        acc['order_by'] = {...prev['order_by'], value: `-${value}`};
                    else
                        acc['order_by'] = {...prev['order_by'], value: value};
                return acc;
            }, {});

            return {
                ...prev,
                ...updatedFields,
            };
        });
        setLoading(true);
    };

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <DynamicAttributeField
                    data={{
                        attribute_name_en: "q",
                        attribute_name_fa: "جستجو محصول",
                        attr_type: {type: "string"},
                        attribute_value: search.q.value,
                    }}
                    onChange={(value) => handleSearchChange(["q"], value)}
                />
                <div className="d-flex gap-3">
                    <div>
                        <select
                            className={'h-100 form-select'}
                            name={'page_size'}
                            value={search.page_size.value}
                            onChange={(e) => handleSearchChange(["page_size"], e.target.value)}
                        >
                            {pageSizeItems.map((item, index) => (
                                <option key={index} value={item.id}>{item.value}</option>
                            ))}
                        </select>
                    </div>
                    <CustomDropdown hasSpace data={btnItems}/>
                    <Link href={'/product/save/'}>
                        <RippleButton
                            className="h-100 d-flex align-items-center gap-1 z-1 btn btn-primary p-1 px-4"
                            title="Add Product"
                        >
                            <IconPlus size={18}/>
                            افزودن محصول
                        </RippleButton>
                    </Link>
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
                            col.search_fields ?
                                <th role={'button'}
                                    onClick={(e) => e.target === e.currentTarget && handleSearchChange(['order_by'], col.search_fields[0])} key={index}
                                    className={'position-relative align-middle'}>
                                    {search.order_by.value === col.search_fields[0]
                                        ? <IconChevronUp
                                            className={'position-absolute top-0 translate-middle start-50 border rounded-pill bg-white'}
                                            size={18}/>
                                        : search.order_by.value === `-${col.search_fields[0]}`
                                            ? <IconChevronDown
                                                className={'position-absolute top-0 translate-middle start-50 border rounded-pill bg-white'}
                                                size={18}/>
                                            : undefined
                                    }
                                    <div className={'position-relative'}>
                                        <DynamicAttributeField
                                            data={{
                                                attribute_name_en: col.search_fields[0],
                                                attribute_name_fa: col.title,
                                                attribute_placeholder: 'جستجو ...',
                                                attr_type: {type: "string"},
                                                attribute_value: search[col.search_fields[0]]?.value,
                                            }}
                                            onChange={(value) => handleSearchChange(col.search_fields, value, undefined)}
                                        />
                                        <select
                                            className={'position-absolute top-0 end-0 mn-1 form-select rounded-pill select-sm lh-lg'}
                                            value={search[col.search_fields[0]]?.opr}
                                            onChange={(e) => handleSearchChange(col.search_fields, undefined, e.target.value)}
                                        >
                                            {oprItems.map((item, index) => (
                                                <option key={index} value={item.id}>{item.value}</option>
                                            ))}
                                        </select>
                                    </div>
                                </th>
                                : <th key={index} className={'align-middle'}>{col.title}</th>
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
                    </tr> : !pageData.count ? <tr>
                        <td colSpan={columns.length} className={'text-center border-0 pt-4'}>
                            <div style={{minWidth: "100%"}}>
                                هیچ آیتمی برای نمایش وجود ندارد
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
                    {console.log(pageData)}
                    <div>نمایش {Math.min((search.page.value - 1) * search.page_size.value + 1, pageData.count)} تا {Math.min(search.page.value * search.page_size.value, pageData.count)} از {pageData.count}</div>
                    <CustomPagination
                        currentPage={search.page.value}
                        totalPages={pageData.total_pages}
                        onPageChange={(value) => handleSearchChange(['page'], value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default DataTable;
