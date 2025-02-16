"use client";
import React, {Fragment, useState, useEffect, useRef} from "react";
import {useParams, useRouter} from "next/navigation";
import {baseApiAuth} from "../../../../api/baseApi";
import AttrListComponent from "./components/AttrListComponent";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import PlusButton from "../../../../components/PlusButton";
import Loading from "../../../../components/Loading";
import ClientLayout from "../../../../components/ClientLayout";
import RippleButton from "../../../../components/RippleButton/RippleButton";
import {IconCamera, IconChevronDown, IconCircleChevronUp, IconPencil, IconPlus, IconTrash} from "@tabler/icons-react";
import ButtonImageUpload from "../../../../components/ButtonImageUpload";
import {Toast} from "../../../../utils/funcs";
import DraggableFlexList2 from "../../../../components/DraggableFlexList2";

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
                [`${name}_str`]: val.text || val.label || val.name || val.title_en,
            } : {[name]: val};
        };
        setPageData((pageData) => ({...pageData, ...getValueDict(pageData[name])}));
    };

    const attrCounter = useRef(1000);
    const makeAttrCounter = () => {
        return attrCounter.current++;
    }

    const loadData = () => {
        const requestUrl = id ? `/api2/category/${id}` : `/api2/category/`;
        setLoading(true);
        baseApiAuth
            .get(requestUrl)
            .then((res) => {
                console.log('res', res)
                const {attr_orders_extra, ...data} = res.data;
                setPageData({...data, attr_orders: [...data.attr_orders || [], ...attr_orders_extra || []].sort((a, b) => a.order - b.order).map(item=>({
                        ...item,
                        _id: item.id ?? makeAttrCounter()
                    }))});
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
                Toast.success("موفقیت آمیز بود!");
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
        id: makeUUid(),
        title_fa: '_',
        title_en: '_',
        title_bz: '_',
        childes: []
    })

    const updateData = (prevArr = [], field, newVal = '') => {
        const tempData = [...prevArr];
        setPageData(pageData => {
            const innerFunc = (items) => {
                let name = tempData.shift();
                return tempData.length === 0 && field === 'remove_child'
                    ? items.filter(item => item.id !== name)
                    : items.map(item => {
                        const dd = field === 'childes' ? [emptyCategory()] : []
                        const ss = !tempData.length && field !== 'childes' ? {[field]: newVal} : {}
                        const obj = item.id === name ? {
                            ...item,
                            ...ss,
                            childes: tempData.length ? innerFunc(item.childes) : [...dd, ...item.childes],
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
                    onClick={() => updateData([...prevArr, item.id], 'childes')}
                    className={`btn btn-${colors[index % 4]}`}
                >
                    <IconPlus/>
                </RippleButton>
                <RippleButton
                    onClick={() => updateData([...prevArr, item.id], 'remove_child')}
                    className={`btn btn-${colors[index % 4]} btn-${colors[index % 4]}-dark p-1`}
                >
                    <IconTrash/>
                </RippleButton>
                <RippleButton className={`justify-content-start col-8 btn btn-${colors[index % 4]}`}>
                    {item.title_fa}
                </RippleButton>
                {item.childes.length ? <RippleButton
                    onClick={() => {
                        updateItems(item.id)
                    }}
                    className={`btn btn-${colors[index % 4]} btn-${colors[index % 4]}-dark p-1`}
                >
                    {activeItems?.[item.id] ? <IconCircleChevronUp/> : <IconChevronDown/>}
                </RippleButton> : undefined}
                <RippleButton
                    onClick={(e) => {
                        e.nativeEvent.stopImmediatePropagation()
                        setActiveItem(activeItem => activeItem?.id === item.id ? undefined : item)
                    }}
                    className={`btn btn-${colors[index % 4]}`}
                >
                    <IconPencil/>
                </RippleButton>
                {activeItem?.id === item.id ? <div
                        onClick={(e) => {
                            e.nativeEvent.stopImmediatePropagation()
                        }}
                        className="z-1 shadow-lg card position-absolute end-0 translate translate-y-middle -translate-x-100">
                        <div className="card mb-4">
                            <div className="card-header justify-content-between d-flex align-items-center gap-3">
                                <h5 className="card-tile mb-0">اطلاعات دسته</h5>
                                <ButtonImageUpload
                                    verticalProgress
                                    uploadPath={'categories/'}
                                    icon={<IconCamera size={24}/>}
                                    value={item.image}
                                    onChange={(url) => {
                                        updateData([...prevArr, item.id], 'image', url)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="card-body d-flex flex-column gap-3">
                            <DynamicAttributeField
                                onChange={(value) => updateData([...prevArr, item.id], 'title_en', value)}
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
                                onChange={(value) => updateData([...prevArr, item.id], 'title_fa', value)}
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
                                onChange={(value) => updateData([...prevArr, item.id], 'title_bz', value)}
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
            {activeItems?.[item.id] ? item.childes.map((inner, key) => <Fragment
                key={key}>{renderCat(inner, index + 1, [...prevArr, item.id])}</Fragment>) : undefined}
        </>
    }

    const updateAttrOrders = (updateFunc) => {
        setPageData(pageData => ({
            ...pageData,
            attr_orders: updateFunc(pageData.attr_orders)
        }))
    }

    return (<ClientLayout>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="py-3 mb-4">
                    <span className="text-muted fw-light"> صفحه اصلی / </span>
                    صفحه دسته بندی
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
                                        collapseFields={[
                                            'title_en',
                                            'title_fa',
                                            'type',
                                            'priority',
                                            'priority_str',
                                            'type_str',
                                        ]}
                                        updateAttrList={updateAttrList}
                                        inputs={pageData.category_attrs || []}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
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
                                <div className="card-body d-flex flex-column">
                                    {pageData.childes?.map((item, key) => <Fragment
                                        key={key}>{renderCat(item)}</Fragment>)}
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card mb-4">
                                <div className="card-header d-flex align-items-center gap-3">
                                    <h5 className="card-tile mb-0">ترتیب دهی</h5>
                                </div>
                                <div className="card-body d-flex flex-wrap">
                                    <DraggableFlexList2
                                        render={(item, props) => (
                                            <div className={'col-6 col-md-4 col-lg-4 col-xl-3 p-1'}>
                                                <div {...props} className={'cursor-grab w-100 btn-group border-1 border-primary'}>
                                                    <RippleButton className={'col-10 d-block text-truncate px-1 py-3 pe-none btn btn-sm'}>
                                                        {item.title_fa}
                                                    </RippleButton>
                                                    <RippleButton className="col-2 px-1 py-3 pe-none btn btn-sm btn-label-primary">
                                                        {item.order}
                                                    </RippleButton>
                                                </div>
                                            </div>
                                        )}
                                        items={pageData.attr_orders}
                                        setItems={updateAttrOrders}
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
