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
import CustomPagination from "./CustomPagination";
import Link from "next/link";
import Loading from "./Loading";

const DataTable = ({fields, columns, shouldRefresh}) => {
    const [data, setData] = useState({
        pageData: {},
        search: {
            parent: {value: 1, opr: '='},
            page_size: {value: 20, opr: '='},
            page: {value: 1, opr: '='},
            search_q: {value: '', opr: '='},
            order_by: {value: '-pk', opr: '='},
        }
    });
    const [changeLoading, setChangeLoading] = useState(true);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [debouncedSearch, setDebouncedSearch] = useState();

    const oprItems = [
        {id: '*', value: '*'},
        {id: '=', value: '='},
        {id: '>', value: '>'},
        {id: '<', value: '<'},
    ]
    const pageSizeItems = [
        {id: 2, value: 2},
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
            const prepareQueryParams = Object.fromEntries(Object.entries(data.search).map(([attribute, valueObj]) => [valueOprMap(attribute, valueObj.opr), valueObj.value]));
            const queryParams = new URLSearchParams(prepareQueryParams).toString();
            const requestUrl = `/api2/category/`
            const response = await baseApiAuth.get(`${requestUrl}?${queryParams}`);
            return response.data || [];
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }

    };

    useEffect(() => {
        setData((data) => ({
            ...data,
            pageData: {
                ...data.pageData,
                results: []
            },
            search: {
                ...data.search,
                ...fields
            }
        }));
    }, [fields]);

    useEffect(() => {
        setChangeLoading(true);
        const timer = setTimeout(() => {
            setDebouncedSearch(data.search);
            setChangeLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [data.search, shouldRefresh]);

    useEffect(() => {
        if (!debouncedSearch) return;
        setFetchLoading(true);
        fetchProducts().then((resData) => {
            console.log('resData', resData);
            setData(data => ({
                ...data,
                pageData: {
                    ...resData,
                    results: [
                        ...data.pageData.results || [],
                        ...resData.results
                    ],
                }
            }));
            setFetchLoading(false);
        });
    }, [debouncedSearch]);

    const handleSearchChange = (searchFields, value, opr) => {
        setData((data) => {
            const prevSearch = data.search;
            const updates = {};
            const updatedFields = searchFields.reduce((acc, field) => {
                acc[field] = {
                    value: value !== undefined ? value : prevSearch[field]?.value,
                    opr: opr !== undefined ? opr : prevSearch[field]?.opr,
                };
                if (field !== 'page') {
                    updates['pageData'] = {
                        ...data.pageData,
                        results: []
                    }
                    acc['page'] = {...prevSearch['page'], value: 1};
                }
                if (field === 'order_by')
                    if (prevSearch['order_by'].value === value)
                        acc['order_by'] = {...prevSearch['order_by'], value: `-${value}`};
                    else
                        acc['order_by'] = {...prevSearch['order_by'], value: value};
                return acc;
            }, {});

            return {
                ...data,
                ...updates,
                search: {
                    ...prevSearch,
                    ...updatedFields,
                },
            };
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchLoading]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            if (!fetchLoading && !changeLoading && data.pageData.current_page !== data.pageData.total_pages) {
                handleSearchChange(['page'], data.pageData.current_page + 1)
            }
        }
    };

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <DynamicAttributeField
                    data={{
                        attribute_name_en: "search_q",
                        attribute_name_fa: "جستجو دسته بندی",
                        attr_type: {type: "string"},
                        attribute_value: data.search.search_q.value,
                    }}
                    onChange={(value) => handleSearchChange(["search_q"], value)}
                />
                <div className="d-flex gap-3">
                    <div>
                        <select
                            className={'h-100 form-select'}
                            name={'page_size'}
                            value={data.search.page_size.value}
                            onChange={(e) => handleSearchChange(["page_size"], e.target.value)}
                        >
                            {pageSizeItems.map((item, index) => (
                                <option key={index} value={item.id}>{item.value}</option>
                            ))}
                        </select>
                    </div>
                    <CustomDropdown hasSpace data={btnItems}/>
                    <Link href={'/category/save/'}>
                        <RippleButton
                            className="h-100 d-flex align-items-center gap-1 z-1 btn btn-primary p-1 px-4"
                            title="Add Category"
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
                                    onClick={(e) => e.target === e.currentTarget && handleSearchChange(['order_by'], col.search_fields[0])}
                                    key={index}
                                    className={'position-relative align-middle'}>
                                    {data.search.order_by.value === col.search_fields[0]
                                        ? <IconChevronUp
                                            className={'position-absolute top-0 translate-middle start-50 border rounded-pill bg-white'}
                                            size={18}/>
                                        : data.search.order_by.value === `-${col.search_fields[0]}`
                                            ? <IconChevronDown
                                                className={'position-absolute top-0 translate-middle start-50 border rounded-pill bg-white'}
                                                size={18}/>
                                            : undefined
                                    }
                                    {col.title}
                                    {/*<div className={'position-relative'}>*/}
                                    {/*    <DynamicAttributeField*/}
                                    {/*        data={{*/}
                                    {/*            attribute_name_en: col.search_fields[0],*/}
                                    {/*            attribute_name_fa: col.title,*/}
                                    {/*            attribute_placeholder: 'جستجو ...',*/}
                                    {/*            attr_type: {type: "string"},*/}
                                    {/*            attribute_value: data.search[col.search_fields[0]]?.value,*/}
                                    {/*        }}*/}
                                    {/*        onChange={(value) => handleSearchChange(col.search_fields, value, undefined)}*/}
                                    {/*    />*/}
                                    {/*    <select*/}
                                    {/*        className={'position-absolute top-0 end-0 mn-1 form-select rounded-pill select-sm lh-lg'}*/}
                                    {/*        value={data.search[col.search_fields[0]]?.opr}*/}
                                    {/*        onChange={(e) => handleSearchChange(col.search_fields, undefined, e.target.value)}*/}
                                    {/*    >*/}
                                    {/*        {oprItems.map((item, index) => (*/}
                                    {/*            <option key={index} value={item.id}>{item.value}</option>*/}
                                    {/*        ))}*/}
                                    {/*    </select>*/}
                                    {/*</div>*/}
                                </th>
                                : <th
                                    key={index}
                                    className={'align-middle'}
                                >{col.title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {!data.pageData.count ?
                        <tr>
                            <td colSpan={columns.length} className={'text-center border-0 pt-4'}>
                                <div style={{minWidth: "100%"}}>
                                    هیچ آیتمی برای نمایش وجود ندارد
                                </div>
                            </td>
                        </tr>
                        : data.pageData.results.map((row, rowIndex) =>
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
                    {changeLoading ?
                        <tr>
                            <td colSpan={columns.length} className={'text-center border-0 pt-4'}>
                                <div style={{minWidth: "100%"}}>
                                    <Loading text={'در حال اعمال تغییرات ...'}/>
                                </div>
                            </td>
                        </tr>
                        : undefined}
                    {fetchLoading ?
                        <tr>
                            <td colSpan={columns.length} className={'text-center border-0 pt-4'}>
                                <div style={{minWidth: "100%"}}>
                                    <Loading/>
                                </div>
                            </td>
                        </tr>
                        : undefined}
                    {data.pageData.next ? <tr>
                        <td colSpan={columns.length} className={'text-center border-0 pt-4'}>
                            {!changeLoading && !fetchLoading ? <RippleButton
                                onClick={() => {
                                    handleSearchChange(['page'], data.pageData.current_page + 1)
                                }}
                                className={'btn btn-label-primary'}
                            >
                                <IconPlus size={18}/>
                                مشاهده موارد بیشتر
                            </RippleButton> : undefined}
                        </td>
                    </tr> : undefined}
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                {/*<div className="d-flex row-cols-auto justify-content-between align-items-center">*/}
                {/*    <div>نمایش {Math.min((data.pageData.current_page) * data.search.page_size.value + 1, data.pageData.count)} تا {Math.min(data.pageData.current_page * data.search.page_size.value, data.pageData.count)} از {data.pageData.count}</div>*/}
                {/*    <CustomPagination*/}
                {/*        currentPage={data.pageData.current_page}*/}
                {/*        totalPages={data.pageData.total_pages}*/}
                {/*        onPageChange={(value) => handleSearchChange(['page'], value)}*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
        </div>
    )
        ;
};

export default DataTable;
