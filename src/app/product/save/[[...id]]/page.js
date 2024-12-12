"use client"
import { Fragment, useState, useEffect, useRef } from "react";
import TagifyComponent from '../../../../components/TagifyComponent';
import DropzoneComponent from '../../../../components/DropzoneComponent';
import QuillEditorComponent from '../../../../components/QuillEditorComponent';
import TabsWithInputsComponent from '../../../../components/TabsWithInputsComponent';
import { useParams } from "next/navigation";
import { baseApiAuth } from "../../../../api/baseApi";
import VariantProductContainer from './components/VariantProductContainer';
import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import toast from "react-hot-toast";

const CreateProductPage = () => {
    const tagifyRef = useRef();
    const [pageData, setPageData] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const { id = "" } = params;

    const updateFiles = (newFiles) => setPageData(pageData => ({ ...pageData, 'images': newFiles }))

    const updateNonVariantAttrs = (updateNonVariantAttrsFunction) => setPageData(pageData => updateNonVariantAttrsFunction(pageData, 'non_variant_product_attrs'));
    const updateVariantAttrs = (updateVariantAttrsFunction) => setPageData(pageData => ({ ...pageData, 'variant_products': updateVariantAttrsFunction(pageData.variant_products) }));
    const updateVariants = (updateVariantsFunction) => setPageData(pageData => ({ ...pageData, 'variant_products': updateVariantsFunction(pageData.variant_products) }));


    const saveProduct = (data) => {
        const id = data.id;
        const preparedData = Object.fromEntries(Object.entries(data).filter(([name, dict]) => !data.meta_datas[name]?.read_only));
        console.log(id, preparedData);
        const { variant_products, ...requestData } = preparedData;

        const requestUrl = id
            ? `/api2/product/${id}/`
            : `/api2/product/`
        baseApiAuth
            .post(requestUrl, requestData)
            .then((res) => {
                toast.success('موفقیت آمیز بود!')
                console.log('ress', res);
            })
            .catch((err) => {
                console.error('Error fetching tags:', err);
            })
    }

    const handleChange = (name, value) => {
        console.log(name, value);

        if (typeof (value) === 'object' && name != 'tags') {
            setPageData(pageData => ({
                ...pageData,
                [name]: (value.pk || value.id || value.value),
                [name + '_str']: (value.value || value.label || value.name || value.title_en)
            }))
        } else {
            setPageData(pageData => ({ ...pageData, [name]: value }))
        }
    }

    useEffect(() => {
        const requestUrl = `/api2/product/${id}`
        baseApiAuth.get(requestUrl)
            .then((res) => {
                const { non_variant_extra_attrs, variant_extra_attrs, ...resultData } = res.data;
                setPageData({
                    ...resultData,
                    non_variant_product_attrs: [...resultData['non_variant_product_attrs'], ...non_variant_extra_attrs],
                    variant_product_attrs: [...resultData['variant_product_attrs'], ...variant_extra_attrs]
                });
                console.log('res', res.data);

                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching tags:', err);
                setLoading(false);
            })
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('pageData', pageData);

        const linkedProducts = pageData.non_variant_product_attrs.some((nonVariant) => nonVariant.changed)
            ? pageData.variant_products.filter(vp => vp.linked || vp.id === pageData.id)
            : pageData.variant_products;
        const linkedProductsAppended = linkedProducts.map(linkedProduct => ({
            ...linkedProduct,
            non_variant_product_attrs: linkedProduct.non_variant_product_attrs
                ? linkedProduct.non_variant_product_attrs.map(nonVariant => {
                    const foundItem = pageData.non_variant_product_attrs.find(nv => nv.attribute === nonVariant.attribute);
                    return foundItem.changed
                        ? { ...nonVariant, attr_value: foundItem.attr_value, attr_value_str: foundItem.attr_value_str }
                        : nonVariant
                })
                : pageData.non_variant_product_attrs.map(nv => {
                    const { id, ...nvData } = nv;
                    return nvData;
                }),
            part_number_en: pageData.id === linkedProduct.id ? pageData.part_number_en : linkedProduct.part_number_en,
            part_number_fa: pageData.id === linkedProduct.id ? pageData.part_number_fa : linkedProduct.part_number_fa,
            part_number_bz: pageData.id === linkedProduct.id ? pageData.part_number_bz : linkedProduct.part_number_bz,
            images: pageData.id === linkedProduct.id ? pageData.images : linkedProduct.images,
            meta_datas: pageData.meta_datas,
            category: pageData.category,
        }))
        const finalLinkedProducts = linkedProductsAppended.map(fd => {
            console.log('final', fd);
            return {
                ...fd,
                non_variant_product_attrs: fd.non_variant_product_attrs?.filter(nv => nv.attr_value !== null),
                variant_product_attrs: fd.variant_product_attrs?.filter(v => v.attr_value !== null)
            }
        })
        console.log('linkedProducts', linkedProducts);
        console.log('linkedProductsAppended', linkedProductsAppended);
        console.log('finalLinkedProducts', finalLinkedProducts);
        // finalLinkedProducts.forEach(saveProduct)
    }

    return (
        <Fragment>

            {/* Layout wrapper */}
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    {/* Menu */}

                    {/* / Menu */}
                    {/* Layout container */}
                    {/* Content wrapper */}
                    <div className="content-wrapper">
                        {/* Content */}
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <form onSubmit={handleSubmit} className="app-ecommerce">
                                {/* Add Product */}
                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                                    <div className="d-flex flex-column justify-content-center">
                                        <h4 className="mb-1 mt-3">یک محصول جدید اضافه کنید</h4>
                                        <p className="text-muted">سفارش هایی که در سراسر فروشگاه شما ثبت می شود</p>
                                    </div>
                                    <div className="d-flex align-content-center flex-wrap gap-3">
                                        <div className="d-flex gap-3">
                                            <button className="btn btn-label-primary">ذخیره پیش نویس</button>
                                        </div>
                                        <button className="btn btn-primary" type="submit">انتشار محصول</button>
                                    </div>
                                </div>
                                <div className="row">
                                    {/* First colum */}
                                    <div className="col-12 col-lg-8">
                                        {/* Product Information */}
                                        <div className="card mb-4">
                                            <div className="card-header">
                                                <h5 className="card-tile mb-0">اطلاعات محصول</h5>
                                            </div>
                                            <div className="card-body d-flex flex-column gap-3">
                                                {/* Category */}
                                                <div className="col ecommerce-select2-dropdown">
                                                    <DynamicAttributeField
                                                        onChange={(value) => handleChange('category', value)}
                                                        className='p-2'
                                                        data={{
                                                            attribute_name_en: 'category',
                                                            attribute_name_fa: 'دسته',
                                                            attr_type: pageData.meta_datas.category,
                                                            attr_value: pageData.category,
                                                            attribute_value_str: pageData.category_str
                                                        }}
                                                    />
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <DynamicAttributeField
                                                            className='p-2'
                                                            data={{
                                                                attribute_name_en: 'sku',
                                                                attribute_name_fa: 'کد محصول',
                                                                attr_type: pageData.meta_datas.price,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                {/* Description */}
                                                <div>
                                                    <QuillEditorComponent
                                                        id="description"
                                                        name="description"
                                                        onChange={(value) => handleChange('description', value)}
                                                        value={pageData.description}
                                                        toolbarOptions={[
                                                            'bold', 'italic', 'underline',
                                                            { 'list': 'ordered' }, { 'list': 'bullet' },
                                                            'link', 'image', 'gallery'
                                                        ]}
                                                        placeholder="توضیح (اختیاری)"
                                                        apiSaveImagesUrl="http://192.168.1.5:8000/api/save_images/products/"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Product Information */}
                                        {/* Media */}
                                        <DropzoneComponent files={pageData.images} updateFiles={updateFiles} uploadUrl={"http://192.168.1.5:8000/api/save_images/products/"} />
                                        {/* /Media */}
                                        {/* Variants */}
                                        <div id="category_attrs" className="card mb-4">
                                            <div className="card-header">
                                                <h5 className="card-title mb-0">ویژگی های عادی</h5>
                                            </div>
                                            <div id="category_attrs_items" className="gap-3 d-flex flex-column card-body">
                                                <TabsWithInputsComponent onChange={updateNonVariantAttrs} inputs={pageData.non_variant_product_attrs} />
                                            </div>
                                        </div>
                                        <VariantProductContainer
                                            pageId={pageData.id}
                                            cards={pageData.variant_products}
                                            inputs={pageData.variant_product_attrs}
                                            onChange={updateVariantAttrs}
                                            updateVariants={updateVariants}
                                            nonVariants={pageData.non_variant_product_attrs}
                                        />
                                        {/* /Variants */}
                                        {/* Inventory */}
                                        <div className="card mb-4">
                                            <div className="card-header">
                                                <h5 className="card-title mb-0">سایر موارد</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    {/* Navigation */}
                                                    <div className="col-12 col-md-4 mx-auto card-separator">
                                                        <div className="d-flex justify-content-between flex-column mb-3 mb-md-0 pe-md-3">
                                                            <ul className="nav nav-align-left nav-pills flex-column">
                                                                <li className="nav-item">
                                                                    <button className="nav-link py-2 active"
                                                                        data-bs-target="#restock" data-bs-toggle="tab">
                                                                        <i className="ti ti-box me-2"></i>
                                                                        <span className="align-middle">انبار</span>
                                                                    </button>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <button className="nav-link py-2" data-bs-target="#shipping"
                                                                        data-bs-toggle="tab">
                                                                        <i className="ti ti-car me-2"></i>
                                                                        <span className="align-middle">حمل و نقل</span>
                                                                    </button>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <button className="nav-link py-2"
                                                                        data-bs-target="#global-delivery"
                                                                        data-bs-toggle="tab">
                                                                        <i className="ti ti-world me-2"></i>
                                                                        <span className="align-middle">ارسال بین‌الملل</span>
                                                                    </button>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <button className="nav-link py-2" data-bs-target="#attributes"
                                                                        data-bs-toggle="tab">
                                                                        <i className="ti ti-link me-2"></i>
                                                                        <span className="align-middle">سایر ویژگی‌ها</span>
                                                                    </button>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <button className="nav-link py-2" data-bs-target="#advanced"
                                                                        data-bs-toggle="tab">
                                                                        <i className="ti ti-lock me-2"></i>
                                                                        <span className="align-middle">پیشرفته</span>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {/* /Navigation */}
                                                    {/* Options */}
                                                    <div className="col-12 col-md-8 pt-4 pt-md-0">
                                                        <div className="tab-content p-0 ps-md-3">
                                                            {/* Restock Tab */}
                                                            <div className="tab-pane fade show active" id="restock" role="tabpanel">
                                                                <h5>مدیریت انبار</h5>
                                                                <label className="form-label" htmlFor="ecommerce-product-stock">افزودن
                                                                    موجودی انبار</label>
                                                                <div className="row mb-3 g-3 pe-md-5">
                                                                    <div className="col-12 col-sm-9">
                                                                        <input aria-label="کمیت" className="form-control"
                                                                            id="ecommerce-product-stock" name="limit2"
                                                                            placeholder="مقدار" type="number" />
                                                                    </div>
                                                                    <div className="col-12 col-sm-3">
                                                                        <button className="btn btn-primary align-items-center">
                                                                            <i className="ti ti-check me-2 ti-xs"></i>
                                                                            تایید
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p className="mb-2">
                                                                        <span className="h6">موجودی محصول:</span>
                                                                        <span>54</span>
                                                                    </p>
                                                                    <p className="mb-2">
                                                                        <span className="h6">درحال ارسال:</span>
                                                                        <span>390</span>
                                                                    </p>
                                                                    <p className="mb-2">
                                                                        <span className="h6">آخرین بروزرسانی:</span>
                                                                        <span>24 آبان 1402</span>
                                                                    </p>
                                                                    <p className="mb-2">
                                                                        <span className="h6">موجودی کل:</span>
                                                                        <span>2430</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {/* Shipping Tab */}
                                                            <div className="tab-pane fade" id="shipping" role="tabpanel">
                                                                <h5 className="mb-4">روش ارسال محصول</h5>
                                                                <div>
                                                                    <div className="form-check mb-4">
                                                                        <input className="form-check-input" id="seller"
                                                                            name="shippingType" type="radio" />
                                                                        <label className="form-check-label" htmlFor="seller">
                                                                            <span className="fw-medium d-block mb-1">توسط فروشنده</span>
                                                                            <small>تحویل توسط فروشنده و پیک.
                                                                                <br />
                                                                                هر گونه آسیب یا تاخیر در ارسال شامل خسارت می
                                                                                شود.
                                                                            </small>
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check mb-5">
                                                                        <input defaultChecked className="form-check-input" id="companyName"
                                                                            name="shippingType" type="radio" />
                                                                        <label className="form-check-label" htmlFor="companyName">
                                                                            <span className="fw-medium d-block mb-1">ارسال توسط شرکت شما
                                                                                <span className="badge rounded-2 badge-warning bg-label-warning fs-tiny py-1 ms-2 border border-warning">پیشنهادی</span>
                                                                            </span>
                                                                            <small>ارسال محصول شما، مسئولیت ماست.
                                                                                <br />
                                                                                ما با دریافت هزینه ای ناچیز، فرآیند تحویل را
                                                                                برای شما انجام خواهیم داد.
                                                                            </small>
                                                                        </label>
                                                                    </div>
                                                                    <p className="mb-0"> برای جزئیات بیشتر به
                                                                        <a href="javascript:void(0);">شرایط و ضوابط تحویل</a>
                                                                        مراجعه کنید
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {/* Global Delivery Tab */}
                                                            <div className="tab-pane fade" id="global-delivery" role="tabpanel">
                                                                <h5 className="mb-4">ارسال بین‌الملل</h5>
                                                                {/* Worldwide delivery */}
                                                                <div className="form-check mb-3">
                                                                    <input className="form-check-input" id="worldwide"
                                                                        name="globalDel" type="radio" />
                                                                    <label className="form-check-label" htmlFor="worldwide">
                                                                        <span className="fw-medium mb-1 d-block">تحویل در سراسر جهان</span>
                                                                        <small>فقط با روش ارسال موجود است:
                                                                            <a href="javascript:void(0);">با نام شرکت تکمیل شده
                                                                                است</a>
                                                                        </small>
                                                                    </label>
                                                                </div>
                                                                {/* Global delivery */}
                                                                <div className="form-check mb-3">
                                                                    <input defaultChecked className="form-check-input" name="globalDel"
                                                                        type="radio" />
                                                                    <label className="form-check-label w-75 pe-5"
                                                                        htmlFor="country-selected">
                                                                        <span className="fw-medium d-block mb-1">کشورهای منتخب</span>
                                                                        <input className="form-control" id="country-selected"
                                                                            placeholder="نام کشور را تایپ کنید" type="text" />
                                                                    </label>
                                                                </div>
                                                                {/* Local delivery */}
                                                                <div className="form-check">
                                                                    <input className="form-check-input" id="local" name="globalDel"
                                                                        type="radio" />
                                                                    <label className="form-check-label" htmlFor="local">
                                                                        <span className="fw-medium mb-1 d-block">تحویل محلی</span>
                                                                        <small>تحویل به کشور محل اقامت شما:
                                                                            <a href="javascript:void(0);">تغییر آدرس پروفایل</a>
                                                                        </small>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            {/* Attributes Tab */}
                                                            <div className="tab-pane fade" id="attributes" role="tabpanel">
                                                                <h5 className="mb-4">سایر ویژگی‌ها</h5>
                                                                <div>
                                                                    {/* Fragile Product */}
                                                                    <div className="form-check mb-3">
                                                                        <input className="form-check-input" id="fragile"
                                                                            type="checkbox" value="fragile" />
                                                                        <label className="form-check-label" htmlFor="fragile">
                                                                            <span className="fw-medium">محصول شکننده</span>
                                                                        </label>
                                                                    </div>
                                                                    {/* Biodegradable */}
                                                                    <div className="form-check mb-3">
                                                                        <input className="form-check-input" id="biodegradable"
                                                                            type="checkbox" value="biodegradable" />
                                                                        <label className="form-check-label" htmlFor="biodegradable">
                                                                            <span className="fw-medium">قابل تجزیه زیستی</span>
                                                                        </label>
                                                                    </div>
                                                                    {/* Frozen Product */}
                                                                    <div className="form-check mb-3">
                                                                        <input defaultChecked className="form-check-input" type="checkbox"
                                                                            value="frozen" />
                                                                        <label className="form-check-label w-75 pe-5" htmlFor="frozen">
                                                                            <span className="fw-medium mb-1 d-block">محصول منجمد</span>
                                                                            <input className="form-control" id="frozen"
                                                                                placeholder="حداکثر دمای مجاز"
                                                                                type="number" />
                                                                        </label>
                                                                    </div>
                                                                    {/* Exp Date */}
                                                                    <div className="form-check mb-4">
                                                                        <input defaultChecked className="form-check-input" id="expDate"
                                                                            type="checkbox" value="expDate" />
                                                                        <label className="form-check-label w-75 pe-5"
                                                                            htmlFor="date-input">
                                                                            <span className="fw-medium mb-1 d-block">تاریخ انقضای محصول</span>
                                                                            <input className="product-date form-control"
                                                                                id="date-input" type="date" />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* {/* /Attributes Tab Advanced Tab */}
                                                            <div className="tab-pane fade" id="advanced" role="tabpanel">
                                                                <h5 className="mb-4">پیشرفته</h5>
                                                                <div className="row">
                                                                    {/* Product Id Type */}
                                                                    <div className="col">
                                                                        <label className="form-label" htmlFor="product-id">
                                                                            <span className="mb-1 h6">نوع شناسه محصول</span>
                                                                        </label>
                                                                        <select className="select2 form-select"
                                                                            data-placeholder="ISBN" id="product-id">
                                                                            <option value="">ISBN</option>
                                                                            <option value="ISBN">ISBN</option>
                                                                            <option value="UPC">UPC</option>
                                                                            <option value="EAN">EAN</option>
                                                                            <option value="JAN">JAN</option>
                                                                        </select>
                                                                    </div>
                                                                    {/* Product Id */}
                                                                    <div className="col">
                                                                        <label className="form-label" htmlFor="product-id-1">
                                                                            <span className="mb-1 h6">شناسه محصول</span>
                                                                        </label>
                                                                        <input className="form-control" id="product-id-1"
                                                                            placeholder="شماره شابک" type="number" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* /Advanced Tab */}
                                                        </div>
                                                    </div>
                                                    {/* /Option */}
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Inventory */}
                                    </div>
                                    {/* {/* /Second column Second column */}
                                    <div className="col-12 col-lg-4">
                                        {/* Pricing Card */}
                                        <div className="card mb-4">
                                            <div className="card-header">
                                                <h5 className="card-title mb-0">قیمت گذاری</h5>
                                            </div>
                                            <div className="card-body d-flex flex-column gap-3">
                                                {/* Base Price */}
                                                <DynamicAttributeField
                                                    onChange={(value) => handleChange('price', value)}
                                                    className='p-2'
                                                    data={{
                                                        attribute_name_fa: 'قیمت پایه',
                                                        attribute_name_en: 'price',
                                                        attr_type: pageData.meta_datas.price,
                                                        attr_value: pageData.price,
                                                    }}
                                                />
                                                {/* Discounted Price */}
                                                <DynamicAttributeField
                                                    className='p-2'
                                                    data={{
                                                        attribute_name_fa: 'قیمت با تخفیف',
                                                        attribute_name_en: 'discountedPrice',
                                                        attr_type: pageData.meta_datas.price,
                                                    }}
                                                />
                                                {/* Charge tax check box */}
                                                <div className="form-check">
                                                    <input defaultChecked className="form-check-input" id="price-charge-tax"
                                                        type="checkbox" value="" />
                                                    <label className="form-label" htmlFor="price-charge-tax"> دارای مالیات</label>
                                                </div>
                                                {/* Instock switch */}
                                                <div className="d-flex justify-content-between align-items-center border-top pt-3">
                                                    <h6 className="mb-0">موجود در انبار</h6>
                                                    <div className="w-25 d-flex justify-content-end">
                                                        <label className="switch switch-primary switch-sm me-4 pe-2">
                                                            <input defaultChecked className="switch-input" type="checkbox" />
                                                            <span className="switch-toggle-slider">
                                                                <span className="switch-on">
                                                                    <span className="switch-off"></span>
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* {/* /Pricing Card Organize Card */}
                                        <div className="card mb-4">
                                            <div className="card-header">
                                                <h5 className="card-title mb-0">جزئیات</h5>
                                            </div>
                                            <div className="card-body d-flex flex-column gap-3">
                                                {/* Part number manual */}
                                                <DynamicAttributeField
                                                    onChange={(value) => handleChange('part_number_is_manual', value)}
                                                    className='p-2'
                                                    data={{
                                                        attribute_name_en: 'part_number_is_manual',
                                                        attribute_name_fa: 'پارت نامبر دستی',
                                                        attr_type: pageData.meta_datas.part_number_is_manual,
                                                        attr_value: pageData.part_number_is_manual
                                                    }}
                                                />
                                                {/* Part number en */}
                                                <div>
                                                    <DynamicAttributeField
                                                        onChange={(value) => handleChange('part_number_en', value)}
                                                        className='p-2'
                                                        data={{
                                                            attribute_name_en: 'part_number_en',
                                                            attribute_name_fa: 'پارت نامبر انگلیسی',
                                                            attr_type: pageData.meta_datas.part_number_en,
                                                            attr_value: pageData.part_number_en
                                                        }}
                                                    />
                                                    <span id="help_part_number_en" className="fs-tiny form-label"></span>
                                                </div>
                                                {/* Part number fa */}
                                                <div>
                                                    <DynamicAttributeField
                                                        onChange={(value) => handleChange('part_number_fa', value)}
                                                        className='p-2'
                                                        data={{
                                                            attribute_name_en: 'part_number_fa',
                                                            attribute_name_fa: 'پارت نامبر فارسی',
                                                            attr_type: pageData.meta_datas.part_number_fa,
                                                            attr_value: pageData.part_number_fa
                                                        }}
                                                    />
                                                    <span id="help_part_number_fa" className="fs-tiny form-label"></span>
                                                </div>
                                                {/* Part number bz */}
                                                <div>
                                                    <DynamicAttributeField
                                                        onChange={(value) => handleChange('part_number_bz', value)}
                                                        className='p-2'
                                                        data={{
                                                            attribute_name_en: 'part_number_bz',
                                                            attribute_name_fa: 'پارت نامبر بازاری',
                                                            attr_type: pageData.meta_datas.part_number_bz,
                                                            attr_value: pageData.part_number_bz
                                                        }}
                                                    />
                                                    <span id="help_part_number_bz" className="fs-tiny form-label"></span>
                                                </div>
                                                {/* Status */}
                                                <DynamicAttributeField
                                                    onChange={(value) => handleChange('status', value)}
                                                    className='p-2'
                                                    data={{
                                                        attribute_name_en: 'status',
                                                        attribute_name_fa: 'وضعیت انتشار',
                                                        attr_type: pageData.meta_datas.status,
                                                        attr_value: pageData.status,
                                                        attribute_value_str: pageData.status_str
                                                    }}
                                                />
                                                {/* Tags */}
                                                <TagifyComponent
                                                    ref={tagifyRef}
                                                    name={'برچسب ها'}
                                                    id={'tags'}
                                                    asyncUrl="/api2/tag/"
                                                    placeholder="افزودن..."
                                                    onChange={(value) => { handleChange('tags', value) }}
                                                    value={pageData.tags}
                                                    valueKey="id"
                                                    displayKey="tag_title"
                                                />
                                            </div>
                                        </div>
                                        {/* /Organize Card */}
                                    </div>
                                    {/* /Second column */}
                                </div>
                            </form>
                        </div>
                        {/* {/* / Content Footer */}
                        {/* / Footer */}

                        <div className="content-backdrop fade"></div>
                    </div>
                    {/* Content wrapper */}
                </div>
                {/* / Layout page */}
            </div>

            {/* Overlay */}
            <div className="layout-overlay layout-menu-toggle"></div>

            {/* Drag Target Area To SlideIn Menu On Small Screens */}
            <div className="drag-target"></div>
        </Fragment>
    );
}

export default CreateProductPage;