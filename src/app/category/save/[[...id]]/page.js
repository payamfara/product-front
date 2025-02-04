"use client";
import React, {Fragment, useState, useEffect, useRef} from "react";
import {useParams, useRouter} from "next/navigation";
import {baseApiAuth} from "../../../../api/baseApi";
import AttrListComponent from "./components/AttrListComponent";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import toast from "react-hot-toast";
import PlusButton from "../../../../components/PlusButton";
import Loading from "../../../../components/Loading";
import ClientLayout from "../../../../components/ClientLayout";
import RippleButton from "../../../../components/RippleButton/RippleButton";
import {IconCamera, IconChevronDown, IconCircleChevronUp, IconPencil, IconPlus, IconTrash} from "@tabler/icons-react";
import ButtonImageUpload from "../../../../components/ButtonImageUpload";

const CreateCategoryPage = () => {
    const [pageData, setPageData] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter()
    const {id = "0"} = params;
    const updateAttrList = (updateAttrListFunction) => setPageData((pageData) => ({
        ...pageData, category_attrs: updateAttrListFunction(pageData.category_attrs || []),
    }));
    const handleAddCard = () => {
        setPageData((pageData) => ({
            ...pageData, category_attrs: [pageData.blank_objects.category_attrs, ...pageData.category_attrs || []],
        }));
    };

    const handleClickOutside = () => {
        console.log('sdf')
        setActiveItem(undefined)
    };

    useEffect(() => {

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [])

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

    const loadData = () => {
        const requestUrl = id ? `/api2/category/${id}` : `/api2/category/`;
        setLoading(true);
        baseApiAuth
            .get(requestUrl)
            .then((res) => {
                console.log('res', res)
                setPageData({...res.data, _id: id});
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
        data.category_attrs = data.category_attrs?.map(({created_at, updated_at, ...mainData}) => mainData);


        let url = id ? `/api2/category/${id}/` : `/api2/category/`;
        const nonReadOnly = (data) =>
            Object.fromEntries(
                Object.entries(data).filter(
                    ([name, dict]) => name === 'id' || name === 'category_attrs' || pageData.meta_datas[name] && !pageData.meta_datas[name]?.read_only
                )
            )
        const nonReadOnlyData = (data) => ({
            ...nonReadOnly(data),
            childes: data.childes.map((child) => nonReadOnlyData(child)),
        })

        console.log('nonReadOnlyData', data)
        baseApiAuth
            .post(url, data)
            .then((res) => {
                toast.success("موفقیت آمیز بود!");
                router.push(`/category/save/${res.data.id}`);
                handleRefresh();
            })
            .catch((err) => {
                setErrors(err.response.data);
                console.log(err)
            });

    };

    const colors = ['primary', 'label-primary', 'light', 'dark', 'danger', 'success', 'warning'];
    const makeUUid = () => {
        const uuid = `new_${counter.current}`
        counter.current = counter.current + 1;
        return uuid;
    }

    const emptyCategory = () => ({
        _id: makeUUid(),
        title_fa: '_',
        title_en: '_',
        title_bz: '_',
        childes: []
    })

    const updateData = (prevArr, field, newVal = '') => {
        const tempData = [...prevArr];
        setPageData(pageData => {
            const innerFunc = (items) => {
                let name = tempData.shift();
                return items.map(item => {
                    const dd = field === 'childes' ? [emptyCategory()] : []
                    const ss = !tempData.length && field !== 'childes' ? {[field]: newVal} : {}
                    const obj = item._id === name ? {
                        ...item,
                        ...ss,
                        childes: tempData.length ? tempData.length === 1 && field === 'remove_child' ? item.childes.filter(item => item._id !== tempData.shift()) : innerFunc(item.childes) : [...dd, ...item.childes],
                    } : item
                    return obj
                })
            }
            const childes = tempData.length ? innerFunc(pageData.childes) : pageData.childes;
            // console.log('obj', obj);
            return {...pageData, childes}
        })
    }

    const renderCat = (item, index = 0, prevArr = []) => {
        return <>
            <div
                className={`py-2 ps-${index * 4} btn-group`}>
                <RippleButton
                    onClick={() => updateData([...prevArr, item._id], 'childes')}
                    className={`btn btn-${colors[index % 4]}`}
                >
                    <IconPlus/>
                </RippleButton>
                <RippleButton
                    onClick={() => updateData([...prevArr, item._id], 'remove_child')}
                    className={`btn btn-${colors[index % 4]} btn-${colors[index % 4]}-dark p-1`}
                >
                    <IconTrash/>
                </RippleButton>
                <RippleButton className={`justify-content-start col-8 btn btn-${colors[index % 4]}`}>
                    {item.title_fa}
                </RippleButton>
                {item.childes.length ? <RippleButton
                    onClick={() => {
                        updateItems(item._id)
                    }}
                    className={`btn btn-${colors[index % 4]} btn-${colors[index % 4]}-dark p-1`}
                >
                    {activeItems?.[item._id] ? <IconCircleChevronUp/> : <IconChevronDown/>}
                </RippleButton> : undefined}
                <RippleButton
                    onClick={(e) => {
                        // e.nativeEvent.stopImmediatePropagation()
                        setActiveItem(activeItem => activeItem?._id === item._id ? undefined : item)
                    }}
                    className={`btn btn-${colors[index % 4]}`}
                >
                    <IconPencil/>
                </RippleButton>
                {activeItem?._id === item._id ? <div
                        onClick={(e) => {
                            // e.nativeEvent.stopImmediatePropagation()
                        }}
                        className="shadow-lg card position-absolute end-0 translate translate-y-middle -translate-x-100">
                        <div className="card mb-4">
                            <div className="card-header justify-content-between d-flex align-items-center gap-3">
                                <h5 className="card-tile mb-0">اطلاعات دسته</h5>
                                <ButtonImageUpload
                                    uploadPath={'categories/'}
                                    icon={<IconCamera size={24}/>}
                                    value={item.image}
                                    onChange={(url) => {
                                        updateData([...prevArr, item._id], 'image', url)
                                    }}
                                />
                                {/*<RippleButton*/}
                                {/*    className="btn btn-label-dark bg-secondary-subtle d-flex justify-content-center align-items-center">*/}
                                {/*    <IconCamera size={24}/>*/}
                                {/*</RippleButton>*/}
                            </div>
                        </div>
                        <div className="card-body d-flex flex-column gap-3">
                            <DynamicAttributeField
                                onChange={(value) => updateData([...prevArr, item._id], 'title_en', value)}
                                className="p-2"
                                data={{
                                    attribute_name_en: "title_en",
                                    attribute_name_fa: "مقدار انگلیسی",
                                    attr_type: pageData.meta_datas.title_en,
                                    attr_value: item.title_en,
                                    attribute_error: errors.details?.title_en
                                }}
                            />
                            <DynamicAttributeField
                                onChange={(value) => updateData([...prevArr, item._id], 'title_fa', value)}
                                className="p-2"
                                data={{
                                    attribute_name_en: "title_fa",
                                    attribute_name_fa: "مقدار فارسی",
                                    attr_type: pageData.meta_datas.title_fa,
                                    attr_value: item.title_fa,
                                    attribute_error: errors.details?.title_fa
                                }}
                            />
                            <DynamicAttributeField
                                onChange={(value) => updateData([...prevArr, item._id], 'title_bz', value)}
                                className="p-2"
                                data={{
                                    attribute_name_en: "title_bz",
                                    attribute_name_fa: "مقدار بازاری",
                                    attr_type: pageData.meta_datas.title_bz,
                                    attr_value: item.title_bz,
                                    attribute_error: errors.details?.title_bz
                                }}
                            />
                        </div>
                    </div>
                    : undefined}
            </div>
            {activeItems?.[item._id] ? item.childes.map((inner, key) => <Fragment
                key={key}>{renderCat(inner, index + 1, [...prevArr, item._id])}</Fragment>) : undefined}
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
                                    <h5 className="card-tile mb-0">اطلاعات دسته</h5>
                                    <ButtonImageUpload
                                        verticalProgress
                                        uploadPath={'categories/'}
                                        icon={<IconCamera size={24}/>}
                                        value={pageData.image}
                                        onChange={(url) => {
                                            setPageData(pageData => ({
                                                ...pageData,
                                                image: url
                                            }))
                                        }}
                                    />
                                    {/*<RippleButton*/}
                                    {/*    className="btn btn-label-dark bg-secondary-subtle d-flex justify-content-center align-items-center">*/}
                                    {/*    <IconCamera size={24}/>*/}
                                    {/*</RippleButton>*/}
                                </div>
                                <div className="card-body d-flex">
                                    {/* Part number en */}
                                    <div className={'col-4 p-2'}>
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
                                    <div className={'col-4 p-2'}>
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
                                    <div className={'col-4 p-2'}>
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
                                    <PlusButton onClick={() => {
                                        setPageData(pageData => ({
                                            ...pageData,
                                            childes: [emptyCategory(), ...pageData.childes],
                                        }))
                                    }}/>
                                </div>
                                <div className="max-w-30 card-body d-flex flex-column">
                                    {pageData.childes?.map((item, key) => <Fragment
                                        key={key}>{renderCat(item)}</Fragment>)}
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
