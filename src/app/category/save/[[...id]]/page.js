"use client";
import {Fragment, useState, useEffect, useRef} from "react";
import {useParams} from "next/navigation";
import {baseApiAuth} from "../../../../api/baseApi";
import AttrListComponent from "./components/AttrListComponent";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import toast from "react-hot-toast";
import PlusButton from "../../../../components/PlusButton";
import Loading from "../../../../components/Loading";
import ClientLayout from "../../../../components/ClientLayout";
import RippleButton from "../../../../components/RippleButton/RippleButton";
import {IconChevronDown, IconCircleChevronUp, IconPencil, IconPlus} from "@tabler/icons-react";

const CreateCategoryPage = () => {
    const [pageData, setPageData] = useState({});
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const params = useParams();
    const {id = "0"} = params;
    const updateAttrList = (updateAttrListFunction) => setPageData((pageData) => ({
        ...pageData, category_attrs: updateAttrListFunction(pageData.category_attrs || []),
    }));
    const handleAddCard = () => {
        setPageData((pageData) => ({
            ...pageData, category_attrs: [pageData.blank_objects.category_attrs, ...pageData.category_attrs || []],
        }));
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

    useEffect(() => {
        const requestUrl = id ? `/api2/category/${id}` : `/api2/category/`;
        baseApiAuth
            .get(requestUrl)
            .then((res) => {
                console.log("res", res.data);
                setPageData(res.data);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            })
            .finally((err) => {
                setLoading(false);
            });
    }, []);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const requestUrl = `/api/categories/`
        baseApiAuth
            .get(requestUrl)
            .then((res) => {
                console.log("res", res.data);
                setCategories(res.data);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            })
            .finally(() => {
                setLoading2(false);
            });
    }, []);
    const [activeItems, setActiveItems] = useState({});
    const [activeItem, setActiveItem] = useState();
    const updateItems = (name) => setActiveItems((prevState) => ({...prevState, [name]: !prevState[name]}))
    const counter = useRef(1);

    if (loading || loading2) {
        return <Loading isFullHeight/>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const {created_at, updated_at, ...data} = pageData;
        data.category_attrs = data.category_attrs?.map((created_at, updated_at, ...mainData) => mainData);


        let url = id ? `/api2/category/${id}/` : `/api2/category/`;
        baseApiAuth
            .post(url, data)
            .then((res) => {
                toast.success("موفقیت آمیز بود!");
                console.log("ress", res);
            })
            .catch((err) => {
                console.error("Error fetching tags:", err);
            });

        url = `/api/categories/`
        baseApiAuth
            .post(url, categories)
            .then((res) => {
                toast.success("موفقیت آمیز بود!");
                console.log("ress", res);
            })
            .catch((err) => {
                console.error("Error fetching tags:", err);
            });
    };

    const colors = ['primary', 'label-primary', 'light', 'dark', 'danger', 'success', 'warning'];
    const makeUUid = () => {
        const uuid = `new_${counter.current}`
        counter.current = counter.current + 1;
        return uuid;
    }

    const updateData = (prevArr, field, newVal = '') => {
        // console.log('dfgfdgfd', prevArr, field, newVal)
        setCategories(categories => {
            const innerFunc = (items) => {
                let name = prevArr.shift()
                return items.map(item => {
                    const dd = field === 'values' ? {
                        id: makeUUid(), title_fa: 'جدید', title_en: 'new', values: []
                    } : {}
                    const ss = prevArr.length || field === 'values' ? {} : {[field]: newVal}
                    console.log('name', name, item.id, item, dd, ss, prevArr.length || field === 'values')
                    const obj = item.id === name ? {
                        ...item,
                        values: prevArr.length ? innerFunc(item.values) : [...dd, ...item.values],
                        ...ss
                    } : item
                    console.log('sdfsdfd')
                    return obj
                })
            }
            const obj = innerFunc(categories)
            // console.log('obj', obj);
            return obj
        })
    }

    const renderCat = (item, index = 0, prevArr = []) => {
        return <>
            <div
                className={`py-2 ps-${index * 4} btn-group`}>
                <RippleButton
                    onClick={() => updateData([...prevArr, item.id], 'values')}
                    className={`btn btn-${colors[index % 4]}`}
                >
                    <IconPlus/>
                </RippleButton>
                <RippleButton className={`justify-content-start col-8 btn btn-${colors[index % 4]}`}>
                    {item.title_fa}
                </RippleButton>
                {item.values.length ? <RippleButton
                    onClick={() => {
                        updateItems(item.title_fa)
                    }}
                    className={`btn btn-${colors[index % 4]} p-1`}
                >
                    {activeItems?.[item.title_fa] ? <IconCircleChevronUp/> : <IconChevronDown/>}
                </RippleButton> : undefined}
                <RippleButton
                    onClick={() => setActiveItem(activeItem => activeItem?.id === item.id ? undefined : item)}
                    className={`btn btn-${colors[index % 4]}`}
                >
                    <IconPencil/>
                </RippleButton>
                {activeItem?.id === item.id ? <div
                    className="shadow-lg card position-absolute end-0 translate translate-y-middle -translate-x-100">
                    <div className="card-body d-flex flex-column gap-3">
                        <DynamicAttributeField
                            onChange={(value) => updateData([...prevArr, item.id], 'title_en', value)}
                            className="p-2"
                            data={{
                                attribute_name_en: "title_en",
                                attribute_name_fa: "مقدار انگلیسی",
                                attr_type: pageData.meta_datas.title_en,
                                attr_value: item.title_en,
                            }}
                        />
                        <DynamicAttributeField
                            onChange={(value) => updateData([...prevArr, item.id], 'title_fa', value)}
                            className="p-2"
                            data={{
                                attribute_name_en: "title_fa",
                                attribute_name_fa: "مقدار فارسی",
                                attr_type: pageData.meta_datas.title_fa,
                                attr_value: item.title_fa,
                            }}
                        />
                        <DynamicAttributeField
                            onChange={(value) => updateData([...prevArr, item.id], 'title_bz', value)}
                            className="p-2"
                            data={{
                                attribute_name_en: "title_bz",
                                attribute_name_fa: "مقدار بازاری",
                                attr_type: pageData.meta_datas.title_bz,
                                attr_value: item.title_bz,
                            }}
                        />
                    </div>
                </div> : undefined}
            </div>
            {activeItems?.[item.title_fa] ? item.values.map((inner, key) => <Fragment
                key={key}>{renderCat(inner, index + 1, [...prevArr, item.id])}</Fragment>) : undefined}
        </>
    }

    return (<ClientLayout>
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
                        {pageData.id ? (<h4 className="mb-1 mt-3">ویرایش دسته بندی</h4>) : (
                            <h4 className="mb-1 mt-3">ایجاد دسته بندی</h4>)}
                        {pageData.id ? (<p className="text-muted">{pageData.title_fa}</p>) : (
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
                                            handleChange("parent", prev => vals)
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
                                        onChange={(value) => handleChange("title_en", value)}
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
                                        onChange={(value) => handleChange("title_fa", value)}
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
                                        onChange={(value) => handleChange("title_bz", value)}
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
                                    inputs={pageData.category_attrs || []}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header d-flex align-items-center gap-3">
                                <h5 className="card-tile mb-0">سلسله مراتب</h5>
                            </div>
                            <div className="max-w-30 card-body d-flex flex-column">
                                {categories.map((item, key) => <Fragment key={key}>{renderCat(item)}</Fragment>)}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </ClientLayout>);
};
export default CreateCategoryPage;
