"use client";
import React, {useState, useEffect, useRef} from "react";
import {useParams, useRouter} from "next/navigation";
import {baseApiAuth} from "../../../../api/baseApi";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import Loading from "../../../../components/Loading";
import ClientLayout from "../../../../components/ClientLayout";
import AttrListComponent from "../../../../components/AttrListComponent";
import PlusButton from "../../../../components/PlusButton";
import {Toast} from "../../../../utils/funcs";
import RippleButton from "../../../../components/RippleButton/RippleButton";
import {IconChevronsLeft, IconChevronsRight} from "@tabler/icons-react";

const CreateCategoryPage = () => {
    const [pageData, setPageData] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter()
    const {id = "0"} = params;

    const loadData = () => {
        const requestUrl = id ? `/api2/listid/${id}` : `/api2/listid/`;
        setLoading(true);
        baseApiAuth
            .get(requestUrl)
            .then((res) => {
                console.log('res', res)
                setPageData({
                    ...res.data,
                    _id: id,
                    attr_values: !res.data.is_float
                        ? res.data.attr_values
                        : res.data.attr_values.map(item => {
                            const match = item.title_en.match(/^(\d+(\.\d+)?)([a-zA-Z]*)$/);
                            const numberPart = match[1];
                            const letterPart = match[3];
                            console.log(item.title_en, numberPart, letterPart)

                            return {
                                ...item,
                                title_en: numberPart,
                                units: letterPart,
                            }
                        }),
                });
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            })
            .finally((err) => {
                setLoading(false);
            });
    }

    const [errors, setErrors] = useState({});
    const [activeItems, setActiveItems] = useState({});
    const [activeItem, setActiveItem] = useState();
    const updateItems = (name) => setActiveItems((prevState) => ({...prevState, [name]: !prevState[name]}))
    const counter = useRef(1);

    const [reload, setReload] = useState(false);
    const handleRefresh = () => {
        setReload((prev) => !prev);
    };

    useEffect(() => {
        loadData();
    }, [reload]);

    if (loading) {
        return <Loading isFullHeight/>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const {created_at, updated_at, ...data} = pageData;

        let url = id ? `/api2/listid/${id}/` : `/api2/listid/`;
        const finalData = pageData.is_float
            ? {
                ...data,
                attr_values: data.attr_values.map((attr) => ({
                    ...attr,
                    title_en: attr.title_en + attr.units,
                })),
            } : data

        console.log(finalData);
        baseApiAuth
            .post(url, finalData)
            .then((res) => {
                Toast.success("موفقیت آمیز بود!");
                router.push(`/listid/save/${res.data.id}`);
                handleRefresh();
            })
            .catch((err) => {
                setErrors(err.response.data);
                console.log(err)
            });

    };

    const handleChange = (name, valueOrFunction) => {
        const getValue = (dep) => typeof valueOrFunction === 'function' ? valueOrFunction(dep) : valueOrFunction;

        const getValueDict = (dep) => {
            const val = getValue(dep);
            return typeof val === 'object' && !Array.isArray(val) ? {
                [name]: val.pk || val.id || val.value,
                [`${name}_str`]: val.value || val.label || val.name || val.title_en,
            } : {[name]: val};
        };
        setPageData((pageData) => ({...pageData, ...getValueDict(pageData[name])}));
    };
    const handleAddCard = () => {
        setPageData((pageData) => ({
            ...pageData, attr_values: [pageData.blank_objects.attr_values, ...pageData.attr_values || []],
        }));
    };
    const updateAttrList = (updateAttrListFunction) => setPageData((pageData) => ({
        ...pageData, attr_values: updateAttrListFunction(pageData.attr_values || []),
    }));

    return (<ClientLayout>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="py-3 mb-4">
                    <span className="text-muted fw-light"> صفحه اصلی / </span>
                    صفحه مقادیر
                </h4>
                <form onSubmit={handleSubmit} className="app-ecommerce">
                    {/* Add category */}
                    <div
                        className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                        <div className="d-flex flex-column justify-content-center">
                            {pageData._id ? (<h4 className="mb-1 mt-3">ویرایش دسته بندی</h4>) : (
                                <h4 className="mb-1 mt-3">ایجاد دسته بندی</h4>)}
                            {pageData._id ? (<p className="text-muted">{pageData.title_fa}</p>) : (
                                <p className="text-muted">
                                    دسته بندی هایی که در سراسر فروشگاه شما ثبت می شود
                                </p>)}
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
                        <div className="col-12">
                            {/* category Information */}
                            <div className="card mb-4">
                                <div className="card-header d-flex align-items-center gap-3">
                                    <h5 className="card-tile mb-0">اطلاعات کلید مقدار</h5>
                                </div>
                                <div className="card-body d-flex">
                                    {/* Part number en */}
                                    <div className={'col-4 p-2'}>
                                        <DynamicAttributeField
                                            onChange={(value) => handleChange("title_en", value)}
                                            className="p-2"
                                            data={{
                                                attribute_name_en: "title_en",
                                                attribute_name_fa: "کلید مقدار",
                                                attr_type: pageData.meta_datas.title_en,
                                                attr_value: pageData.title_en,
                                            }}
                                        />
                                    </div>
                                    <div className={'col-4 p-2'}>
                                        <DynamicAttributeField
                                            onChange={(value) => handleChange("is_float", value)}
                                            className="p-2"
                                            data={{
                                                attribute_name_en: "is_float",
                                                attribute_name_fa: "مقادیر اعشاری",
                                                attr_type: pageData.meta_datas.is_float,
                                                attr_value: pageData.is_float,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card mb-4">
                                <div className="card-header d-flex align-items-center gap-3">
                                    <h5 className="card-tile mb-0">مقادیر</h5>
                                    <PlusButton onClick={handleAddCard}/>
                                </div>
                                <div className="card-body">
                                    <AttrListComponent
                                        onlyCollapse
                                        collapseFields={
                                            pageData.is_float
                                                ? {
                                                    title_en: 'float',
                                                    units: '',
                                                }
                                                : {
                                                    title_en: '',
                                                    title_fa: '',
                                                    title_bz: '',
                                                }
                                        }
                                        updateAttrList={updateAttrList}
                                        inputs={pageData.attr_values || []}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {pageData.navigation_instances.next ? <RippleButton
                href={`/listid/save/${pageData.navigation_instances.next}`}
                className={'z-9999 rounded-end-0 opacity-70 position-fixed end-0 top-50 p-0 translate-middle-y btn btn-light text-primary shadow-lg'}
            >
                <IconChevronsLeft size={18}/>
            </RippleButton> : null}
            {pageData.navigation_instances.previous ? <RippleButton
                href={`/listid/save/${pageData.navigation_instances.previous}`}
                className={'z-9999 rounded-start-0 opacity-70 position-fixed start-0 top-50 p-0 translate-middle-y btn btn-light text-primary shadow-lg'}
            >
                <IconChevronsRight size={18}/>
            </RippleButton> : null}
        </ClientLayout>
    );
};
export default CreateCategoryPage;
