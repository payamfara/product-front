"use client";
import {Fragment, useState, useEffect} from "react";
import {useParams} from "next/navigation";
import {baseApiAuth} from "../../../../api/baseApi";
import AttrListComponent from "./components/AttrListComponent";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import toast from "react-hot-toast";
import PlusButton from "../../../../components/PlusButton";
import CustomLoading from "../../../../components/Loading";
import MultilevelMenu from "@/src/components/MultilevelMenu";
import ClientLayout from "../../../../components/ClientLayout";

const CreateCategoryPage = () => {
    const [pageData, setPageData] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const {id = ""} = params;
    const updateAttrList = (updateAttrListFunction) =>
        setPageData((pageData) => ({
            ...pageData,
            category_attrs: updateAttrListFunction(pageData.category_attrs),
        }));
    const handleAddCard = () => {
        setPageData((pageData) => ({
            ...pageData,
            category_attrs: [emptyFrm, ...pageData.category_attrs],
        }));
    };

    const handleChange = (name, value) => {
        setPageData((pageData) => ({...pageData, [name]: value}));
    };
    useEffect(() => {
        const requestUrl = id ? `/api2/category/${id}` : `/api2/category/`;
        baseApiAuth
            .get(requestUrl)
            .then((res) => {
                console.log("res", res.data);
                setPageData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    }, []);

    const emptyFrm = {
        title_en: "",
        title_fa: "",
        title_bz: "",
        is_variant: false,
        is_editable_by_warehouse: false,
        is_part_of_part_number: true,
        is_searchable: true,
        is_filterable: true,
        description: "",
        weight: 0,
        prefix: null,
        postfix: null,
        order: 0,
        priority: 4,
        type: 7,
        list_id: 3,
        priority_str: "mandatory",
        type_str: "Text",
        list_id_str: "made",
        meta_datas: {
            id: {
                type: "other",
                verbose_name: "ID",
                required: false,
                validators: [],
                read_only: true,
            },
            created_at: {
                type: "date_time",
                verbose_name: "تاریخ ایجاد",
                required: false,
                validators: [],
                read_only: true,
            },
            updated_at: {
                type: "date_time",
                verbose_name: "تاریخ بروزرسانی",
                required: false,
                validators: [],
                read_only: true,
            },
            title_en: {
                type: "string",
                verbose_name: "عنوان ویژگی (انگلیسی)",
                required: true,
                validators: [],
                read_only: false,
            },
            title_fa: {
                type: "string",
                verbose_name: "عنوان ویژگی (فارسی)",
                required: true,
                validators: [],
                read_only: false,
            },
            title_bz: {
                type: "string",
                verbose_name: "عنوان ویژگی (محلی)",
                required: true,
                validators: [],
                read_only: false,
            },
            is_variant: {
                type: "bool",
                verbose_name: "متغیر است",
                required: false,
                validators: [],
                read_only: false,
            },
            is_editable_by_warehouse: {
                type: "bool",
                verbose_name: "قابل ویرایش توسط انبار",
                required: false,
                validators: [],
                read_only: false,
            },
            is_part_of_part_number: {
                type: "bool",
                verbose_name: "جزء شماره قطعه",
                required: false,
                validators: [],
                read_only: false,
            },
            is_searchable: {
                type: "bool",
                verbose_name: "قابل جستجو",
                required: false,
                validators: [],
                read_only: false,
            },
            is_filterable: {
                type: "bool",
                verbose_name: "قابل فیلتر",
                required: false,
                validators: [],
                read_only: false,
            },
            priority: {
                type: "select_2",
                verbose_name: "اولویت",
                required: false,
                validators: [],
                default: {
                    id: 4,
                    value: "mandatory",
                },
                url: "/api2/myapp-choice/?title=priority",
                read_only: false,
            },
            category: {
                type: "select_2",
                verbose_name: "دسته",
                required: false,
                validators: [],
                default: {
                    id: 3,
                    value: "ceramic",
                },
                url: "/api2/myapp-category/?",
                read_only: true,
            },
            type: {
                type: "select_2",
                verbose_name: "نوع",
                required: false,
                validators: [],
                default: {
                    id: 7,
                    value: "Text",
                },
                url: "/api2/myapp-choice/?title=type",
                read_only: false,
            },
            list_id: {
                type: "select_2",
                verbose_name: "شناسه لیست",
                required: false,
                validators: [],
                default: {
                    id: 3,
                    value: "made",
                },
                url: "/api2/myapp-listid/?",
                read_only: false,
            },
            description: {
                type: "other",
                verbose_name: "توضیحات",
                required: false,
                validators: [],
                read_only: false,
            },
            weight: {
                type: "int",
                verbose_name: "وزن",
                required: false,
                validators: [],
                read_only: false,
            },
            prefix: {
                type: "string",
                verbose_name: "پیشوند",
                required: false,
                validators: [],
                read_only: false,
            },
            postfix: {
                type: "string",
                verbose_name: "پسوند",
                required: false,
                validators: [],
                read_only: false,
            },
            order: {
                type: "int",
                verbose_name: "ترتیب",
                required: false,
                validators: [],
                read_only: false,
            },
        },
    };

    if (loading) {
        return <CustomLoading/>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const {created_at, updated_at, ...data} = pageData;
        data.category_attrs = data.category_attrs.map((ca) => {
            const {created_at, updated_at, ...mainData} = ca;
            return mainData;
        });

        const url = id ? `/api2/category/${id}/` : `/api2/category/`;
        baseApiAuth
            .post(url, data)
            .then((res) => {
                toast.success("موفقیت آمیز بود!");
                console.log("ress", res);
            })
            .catch((err) => {
                console.error("Error fetching tags:", err);
            });
    };

    return (
        <ClientLayout>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="py-3 mb-4">
                    <span className="text-muted fw-light"> صفحه اصلی / </span>
                    لیست محصولات
                </h4>
                <form onSubmit={handleSubmit} className="app-ecommerce">
                    {/* Add category */}
                    <div
                        className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                        <div className="d-flex flex-column justify-content-center">
                            {pageData.id ? (
                                <h4 className="mb-1 mt-3">ویرایش دسته بندی</h4>
                            ) : (
                                <h4 className="mb-1 mt-3">ایجاد دسته بندی</h4>
                            )}
                            {pageData.id ? (
                                <p className="text-muted">{pageData.title_fa}</p>
                            ) : (
                                <p className="text-muted">
                                    سفارش هایی که در سراسر فروشگاه شما ثبت می شود
                                </p>
                            )}
                        </div>
                        <div className="d-flex align-content-center flex-wrap gap-3">
                            <div className="d-flex gap-3">
                                <button className="btn btn-label-primary">
                                    ذخیره پیش نویس
                                </button>
                            </div>
                            <button className="btn btn-primary" type="submit">
                                انتشار دسته بندی
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        {/* First colum */}
                        <div className="col-12">
                            {/* category Information */}
                            <div className="card mb-4">
                                <div className="card-header">
                                    <h5 className="card-tile mb-0">اطلاعات دسته</h5>
                                </div>
                                <div className="card-body row row-cols-4">
                                    <div>
                                        <DynamicAttributeField
                                            onChange={(vals) => {
                                                console.log(vals);
                                            }}
                                            data={{
                                                attribute_name_en: "parent",
                                                attribute_name_fa: "دسته بالاتر",
                                                attr_type: pageData.meta_datas.parent,
                                                attribute_value: pageData.parent,
                                                attribute_value_str: pageData.parent_str,
                                            }}
                                        />
                                    </div>
                                    {/* Part number en */}
                                    <div>
                                        <DynamicAttributeField
                                            onChange={(value) =>
                                                handleChange("title_en", value)
                                            }
                                            className="p-2"
                                            data={{
                                                attribute_name_en: "title_en",
                                                attribute_name_fa: "مقدار انگلیسی",
                                                attr_type: pageData.meta_datas.title_en,
                                                attr_value: pageData.title_en,
                                            }}
                                        />
                                        <span
                                            id="help_value_en"
                                            className="fs-tiny form-label"
                                        ></span>
                                    </div>
                                    {/* Part number fa */}
                                    <div>
                                        <DynamicAttributeField
                                            onChange={(value) =>
                                                handleChange("title_fa", value)
                                            }
                                            className="p-2"
                                            data={{
                                                attribute_name_en: "title_fa",
                                                attribute_name_fa: "مقدار فارسی",
                                                attr_type: pageData.meta_datas.title_fa,
                                                attr_value: pageData.title_fa,
                                            }}
                                        />
                                        <span
                                            id="help_value_en"
                                            className="fs-tiny form-label"
                                        ></span>
                                    </div>
                                    {/* Part number bz */}
                                    <div>
                                        <DynamicAttributeField
                                            onChange={(value) =>
                                                handleChange("title_bz", value)
                                            }
                                            className="p-2"
                                            data={{
                                                attribute_name_en: "title_bz",
                                                attribute_name_fa: "مقدار بازاری",
                                                attr_type: pageData.meta_datas.title_bz,
                                                attr_value: pageData.title_bz,
                                            }}
                                        />
                                        <span
                                            id="help_value_en"
                                            className="fs-tiny form-label"
                                        ></span>
                                    </div>
                                </div>
                            </div>
                            {/* /category Information */}
                        </div>
                        <div className="col-12">
                            <div className="card mb-4">
                                <div className="card-header d-flex align-items-center gap-3">
                                    <h5 className="card-tile mb-0">ویژگی های دسته</h5>
                                    <PlusButton onClick={handleAddCard}/>
                                </div>
                                <div className="card-body">
                                    <AttrListComponent
                                        updateAttrList={updateAttrList}
                                        inputs={pageData.category_attrs}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </ClientLayout>
    );
};
export default CreateCategoryPage;
