"use client";
import React, {useState, useEffect, useRef, Fragment} from "react";
import TagifyComponent from "../../../../components/TagifyComponent";
import DropzoneComponent from "../../../../components/DropzoneComponent";
import QuillEditorComponent from "../../../../components/QuillEditorComponent";
import TabsWithInputsComponent from "../../../../components/TabsWithInputsComponent";
import {useParams} from "next/navigation";
import {baseApiAuth} from "../../../../api/baseApi";
import VariantProductContainer from "./components/VariantProductContainer";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import Loading from "../../../../components/Loading";
import ClientLayout from "../../../../components/ClientLayout";
import {useRouter} from 'next/navigation'
import LoadingBtn from "../../../../components/LoadingBtn";
import {IconCheck, IconTrash, IconUpload, IconX} from "@tabler/icons-react";
import RippleButton from "../../../../components/RippleButton/RippleButton";
import ButtonImageUpload from "../../../../components/ButtonImageUpload";
import Toast from "../../../../utils/funcs";

const CreateProductPage = () => {
        const dropzoneRef = useRef(null);
        const [formDisabled, setFormDisabled] = useState(false);
        const [pageData, setPageData] = useState({});
        const [loading, setLoading] = useState(true);
        const [errors, setErrors] = useState({});
        const params = useParams();
        const router = useRouter()
        const {id = 0} = params;

        const [reload, setReload] = useState(false);
        const handleRefresh = () => {
            setReload((prev) => !prev);
        };
        const [filterData, setFilterData] = useState();
        const mainProductStatusRef = useRef(1);

        const updateMainProduct = async (name, valueOrFunction) => {
            const getValue = (dep) =>
                typeof valueOrFunction === 'function' ? valueOrFunction(dep) : valueOrFunction;

            const getValueDict = (dep) => {
                const val = getValue(dep);
                return typeof val === 'object' && !Array.isArray(val)
                    ? {
                        [name]: val.pk || val.id || val.value,
                        [`${name}_str`]: val.value || val.label || val.name || val.title_en,
                    }
                    : {[name]: val};
            };

            let updatedProducts = [];
            setPageData((pageData) => {
                updatedProducts = pageData.variant_products.map((vp) => {
                    if (vp.id !== pageData.id) return vp;

                    const extraFields =
                        name === "part_number_is_manual"
                            ? valueOrFunction
                                ? {
                                    part_number_en: vp.part_number_en_custom,
                                    part_number_fa: vp.part_number_fa_custom,
                                    part_number_bz: vp.part_number_bz_custom,
                                }
                                : {
                                    part_number_en_custom: vp.part_number_en,
                                    part_number_fa_custom: vp.part_number_fa,
                                    part_number_bz_custom: vp.part_number_bz,
                                    part_number_en: vp.part_number_auto?.en,
                                    part_number_fa: vp.part_number_auto?.fa,
                                    part_number_bz: vp.part_number_auto?.bz,
                                }
                            : {};

                    return {...vp, ...getValueDict(vp[name]), ...extraFields};
                });

                return {...pageData, variant_products: updatedProducts};
            });

            if (name === 'category') {
                const mainProduct = updatedProducts.find((vp) => vp.id === pageData.id);
                const {variant_product_attrs, non_variant_product_attrs, ...rest} = mainProduct;
                const [status, results] = await saveProduct({...rest}, {save: false})
                console.log('results', results)
                const mergedNonVariantAttrs = [
                    ...results.non_variant_product_attrs || [],
                    ...results.non_variant_extra_attrs,
                ];
                const mergedVariantAttrs = [
                    ...results.variant_product_attrs || [],
                    ...results.variant_extra_attrs,
                ];

                setFilterData({
                    ...results,
                    variant_product_attrs: mergedVariantAttrs,
                    non_variant_extra_attrs: mergedNonVariantAttrs,
                })

                setPageData(pageData => ({
                    ...filterItem(pageData, {
                        non_variant_product_attrs: mergedNonVariantAttrs,
                        variant_product_attrs: mergedVariantAttrs
                    }),
                    variant_products: pageData.variant_products.map(vp => filterItem(vp, {
                        non_variant_product_attrs: mergedNonVariantAttrs,
                        variant_product_attrs: mergedVariantAttrs
                    }))
                }))

            }

        };

        const modifyItem = (items, item) => {
            const foundItem = items.find(nv => nv.attribute === item.attribute)
            const {id, ...itemWithoutId} = item;
            return foundItem
                ? {
                    ...item,
                    id: foundItem.id,
                    attr_value: foundItem.attr_value,
                    attr_value_str: foundItem.attr_value_str,
                    attribute_value_str: foundItem.attribute_value_str,
                } : itemWithoutId
        }
        const filterItem = (item, initialFilterData = null) => {
            const activeFilterData = initialFilterData || filterData;
            if (!activeFilterData) return item;

            return {
                ...item,
                variant_product_attrs: item.variant_product_attrs && activeFilterData.variant_product_attrs.map(mv => modifyItem(item.variant_product_attrs, mv)),
                non_variant_product_attrs: item.non_variant_product_attrs && activeFilterData.non_variant_product_attrs.map(mnv => modifyItem(item.non_variant_product_attrs, mnv)),
            };
        };

        const updateVariantAttrs = (updateVariantAttrsFunction) =>
            setPageData((pageData) => ({
                ...pageData,
                variant_products: updateVariantAttrsFunction(pageData.variant_products),
            }));

        const updateVariants = (updateVariantsFunction) =>
            setPageData((pageData) => ({
                ...pageData,
                variant_products: updateVariantsFunction(pageData.variant_products),
            }));

        const saveProduct = async (data, params) => {
            const id = data.id;
            const nonReadOnlyData =
                Object.fromEntries(
                    Object.entries(data).filter(
                        ([name, dict]) => !data.meta_datas[name]?.read_only
                    )
                )
            console.log('nonReadOnlyData', nonReadOnlyData)
            const {variant_products, ...requestData} = nonReadOnlyData

            const queryString = new URLSearchParams(params).toString();
            const requestUrl = id ? `/api2/product/${id}/` : `/api2/product/`;
            const finalUrl = queryString ? `${requestUrl}?${queryString}` : requestUrl;
            setFormDisabled(true);
            try {
                const response = await baseApiAuth
                    .post(finalUrl, requestData)
                return [true, response.data];
            } catch (err) {
                console.error("Error fetching tags:", err);
                return [false, err]
            } finally {
                setFormDisabled(false);
            }
        }

        const updatePageData = (data) => {
            const {
                non_variant_extra_attrs,
                variant_extra_attrs,
                non_variant_product_attrs = [],
                variant_product_attrs = [],
                ...results
            } = data;

            const mergedNonVariantAttrs = [
                ...non_variant_product_attrs,
                ...non_variant_extra_attrs,
            ];

            const mergedVariantAttrs = [
                ...variant_product_attrs,
                ...variant_extra_attrs,
            ];

            const finalData = {
                ...results,
                non_variant_product_attrs: mergedNonVariantAttrs,
                variant_product_attrs: mergedVariantAttrs,
                id: results.id ?? 0,
                _id: results.id ?? 0,
            }

            const variantProducts = [{...finalData, linked: true}, ...finalData.variant_products]

            setPageData({
                ...finalData,
                variant_products: variantProducts,
            });
        }

        const fetchProduct = async () => {
            setLoading(true);
            try {
                const requestUrl = `/api2/product/${id}`;
                const response = await baseApiAuth.get(requestUrl);
                const results = response.data;
                console.log("res", results);

                return results;

            } catch (error) {
                console.error("Error fetching attributes:", error);
            } finally {
                setLoading(false);
            }
        };

        const loadData = async () => {
            const data = await fetchProduct();
            updatePageData(data);
        }

        useEffect(() => {
            setErrors({})
            loadData();
        }, [reload]);

        if (loading) {
            return <Loading isFullHeight/>;
        }

        const mainProduct = pageData.variant_products.find((vp) => vp.id === pageData.id)

        const handleSubmit = async (e) => {
            e.preventDefault();

            const changedAttrs = mainProduct.non_variant_product_attrs.filter(
                (nonVariant) => nonVariant.changed
            )
            const linkedProducts = changedAttrs.length
                ? pageData.variant_products.filter((vp) => vp.linked)
                : pageData.variant_products;

            const modifiedLinkedProducts = linkedProducts.map((linkedProduct) => ({
                ...linkedProduct,
                images: linkedProduct.images_from_main ? mainProduct.images : linkedProduct.images,
                data_sheet: linkedProduct.data_sheet_from_main ? mainProduct.data_sheet : linkedProduct.data_sheet,
                category: mainProduct.category,
                status: linkedProduct.id === mainProduct.id ? mainProductStatusRef.current : linkedProduct.status,
                non_variant_product_attrs: linkedProduct.non_variant_product_attrs
                    ? linkedProduct.non_variant_product_attrs.map((nonVariant) => {
                        const foundItem = changedAttrs.find(
                            (nv) => nv.attribute === nonVariant.attribute
                        );

                        return foundItem
                            ? {
                                ...nonVariant,
                                attr_value: foundItem.attr_value,
                                attr_value_str: foundItem.attr_value_str,
                            }
                            : nonVariant;
                    })
                    : mainProduct.non_variant_product_attrs.map(({id, ...nv}) => nv)
            }))

            const innerSave = async (save) => {
                let reload = true;
                let mainProductId;
                for (const linkedProduct of modifiedLinkedProducts) {
                    const [status, results] = await saveProduct({...linkedProduct}, {save})

                    if (status) {
                        if (linkedProduct.id === pageData.id) {
                            mainProductId = results.id;
                        }
                    } else {
                        const attributes = linkedProduct.non_variant_product_attrs;
                        const errors = results.response.data.nested_data.non_variant_product_attrs;

                        const nonVariants = errors?.reduce((acc, item) => {
                            const [[idx, err]] = Object.entries(item);
                            const attrItem = attributes[idx];
                            if (err) {
                                acc[attrItem.attribute] = err;
                            }
                            return acc;
                        }, {});

                        const variant_attributes = linkedProduct.variant_product_attrs;
                        const variant_errors = results.response.data.nested_data.variant_product_attrs;

                        const variants = variant_errors?.reduce((acc, item) => {
                            const [[idx, err]] = Object.entries(item);
                            const attrItem = variant_attributes[idx];
                            if (err) {
                                acc[attrItem.attribute] = err;
                            }
                            return acc;
                        }, {});

                        setErrors(errors => ({
                            ...errors,
                            [linkedProduct._id]: {
                                ...results.response.data,
                                nested_data: {
                                    ...results.response.data.nested_data,
                                    non_variant_product_attrs: nonVariants,
                                    variant_product_attrs: variants,
                                }
                            }
                        }));

                        reload = false;
                        Toast.error(`محصول ${linkedProduct._id} ذخیره نشد`);
                    }
                }
                return [reload, mainProductId]
            }

            const [reload, mainProductId] = await innerSave(false)
            if (reload) {
                const [reload, mainProductId] = await innerSave(true)
                if (reload) {
                    Toast.success(`موفقیت آمیز بود!`);
                    router.push(`/product/save/${mainProductId}`);
                    handleRefresh();
                }
            }
        }

        return (
            <ClientLayout>
                <div className="container-xxl flex-grow-1 container-p-y">
                    <h4 className="py-3 mb-4">
                        <span className="text-muted fw-light"> صفحه اصلی / </span>
                        صفحه محصول
                    </h4>
                    <form onSubmit={handleSubmit} className={`app-ecommerce ${formDisabled ? "disabled" : ""}`}>
                        {/* Add Product */}
                        <div
                            className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                            <div className="d-flex flex-column justify-content-center">
                                {pageData.id !== 0 ? (
                                    <h4 className="mb-1 mt-3">ویرایش محصول</h4>
                                ) : (
                                    <h4 className="mb-1 mt-3">ایجاد محصول</h4>
                                )}
                                {pageData.id !== 0 ? (
                                    <p className="text-muted">{pageData.part_number_fa}</p>
                                ) : (
                                    <p className="text-muted">
                                        محصولاتی که در سراسر فروشگاه شما ثبت می شود
                                    </p>
                                )}
                            </div>
                            <div className="d-flex align-content-center flex-wrap gap-3">

                                {mainProduct.is_active
                                    ? <RippleButton
                                        onClick={() =>
                                            updateMainProduct("is_active", (value) => !value)
                                        }
                                        className={`d-flex gap-2 btn btn-success btn-lg btn-block`}
                                    >
                                        <IconCheck size={20}/>
                                        فعال
                                    </RippleButton>
                                    : <RippleButton
                                        onClick={() =>
                                            updateMainProduct("is_active", (value) => !value)
                                        }
                                        className={`d-flex gap-2 btn btn-danger btn-lg btn-block`}
                                    >
                                        <IconX size={20}/>
                                        غیرفعال
                                    </RippleButton>
                                }

                                <LoadingBtn
                                    type={'submit'}
                                    className={`d-flex gap-2 btn btn-label-primary btn-lg btn-block`}
                                    isLoading={formDisabled}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        mainProductStatusRef.current = 2;
                                        e.target.form.dispatchEvent(new Event("submit", {bubbles: true, cancelable: true}));
                                    }}
                                >
                                    ذخیره پیش نویس
                                </LoadingBtn>
                                <LoadingBtn
                                    type={'submit'}
                                    color={'primary'}
                                    isLoading={formDisabled}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        mainProductStatusRef.current = 1;
                                        e.target.form.dispatchEvent(new Event("submit", {bubbles: true, cancelable: true}));
                                    }}
                                >
                                    انتشار محصول
                                </LoadingBtn>
                            </div>
                        </div>
                        <div className="d-flex flex-column gap-3">
                            <div className="row">
                                <div className="col-12 col-lg-8">
                                    {/* Product Information */}
                                    <div className="card h-100">
                                        <div className="card-header">
                                            <h5 className="card-tile mb-0">اطلاعات محصول [{pageData.id}]</h5>
                                        </div>
                                        <div className="card-body row gy-3 flex-wrap">
                                            {/* Category */}
                                            <div className="col-6 ecommerce-select2-dropdown">
                                                <DynamicAttributeField
                                                    onChange={(value) => {
                                                        console.log('value', value)
                                                        updateMainProduct("category", value)
                                                    }
                                                    }
                                                    className="p-2"
                                                    data={{
                                                        attribute_name_en: "category",
                                                        attribute_name_fa: "دسته بندی",
                                                        attr_type: mainProduct.meta_datas.category,
                                                        attr_value: mainProduct.category,
                                                        attribute_value_str: mainProduct.category_str,
                                                    }}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <DynamicAttributeField
                                                    onChange={(value) =>
                                                        updateMainProduct(
                                                            "summary",
                                                            value
                                                        )
                                                    }
                                                    className="p-2"
                                                    data={{
                                                        attribute_name_en:
                                                            "summary",
                                                        attribute_name_fa: "توضیح کوتاه",
                                                        attr_type:
                                                        mainProduct.meta_datas
                                                            .summary,
                                                        attr_value: mainProduct.summary,
                                                        attribute_error: errors[mainProduct._id]?.details?.summary
                                                    }}
                                                />
                                            </div>
                                            {/* Description */}
                                            <div className="col-6 d-flex flex-column gap-3">
                                                <div className="col-12">
                                                    <QuillEditorComponent
                                                        id="description"
                                                        name="description"
                                                        onChange={(value) =>
                                                            updateMainProduct(
                                                                "description",
                                                                value
                                                            )
                                                        }
                                                        value={mainProduct.description || ""}
                                                        toolbarOptions={[
                                                            "bold",
                                                            "italic",
                                                            "underline",
                                                            {list: "ordered"},
                                                            {list: "bullet"},
                                                            "link",
                                                            "image",
                                                            "gallery",
                                                        ]}
                                                        placeholder="توضیح (اختیاری)"
                                                        apiSaveImagesUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/save_images/products/`}
                                                    />
                                                </div>
                                                <TagifyComponent
                                                    name={"برچسب ها"}
                                                    id={"tags"}
                                                    asyncUrl="/api2/tag/"
                                                    placeholder="افزودن..."
                                                    onChange={(value) =>
                                                        updateMainProduct(
                                                            "tags",
                                                            value
                                                        )
                                                    }
                                                    value={mainProduct.tags}
                                                    valueKey="id"
                                                    displayKey="tag_title"
                                                />
                                            </div>
                                            <div className="col-6">
                                                <div className="card border">
                                                    <div className="card-header">
                                                        <h5 className="card-title mb-0">جزئیات</h5>
                                                    </div>
                                                    <div className="card-body d-flex flex-column gap-3">
                                                        {/* Part number manual */}
                                                        <DynamicAttributeField
                                                            onChange={(value) =>
                                                                updateMainProduct(
                                                                    "part_number_is_manual",
                                                                    value
                                                                )
                                                            }
                                                            className="p-2"
                                                            data={{
                                                                attribute_name_en:
                                                                    "part_number_is_manual_main",
                                                                attribute_name_fa: "پارت نامبر دستی",
                                                                attr_type:
                                                                mainProduct.meta_datas
                                                                    .part_number_is_manual,
                                                                attr_value: mainProduct.part_number_is_manual
                                                            }}
                                                        />
                                                        {/* Part number en */}
                                                        <div>
                                                            <DynamicAttributeField
                                                                onChange={(value) =>
                                                                    updateMainProduct(
                                                                        "part_number_en",
                                                                        value
                                                                    )
                                                                }
                                                                className="p-2"
                                                                data={{
                                                                    attribute_name_en: "part_number_en",
                                                                    attribute_name_fa: "پارت نامبر انگلیسی",
                                                                    attr_type: mainProduct.meta_datas.part_number_en,
                                                                    attr_value: mainProduct.part_number_en,
                                                                    attribute_readonly: !mainProduct.part_number_is_manual,
                                                                    attribute_error: errors[mainProduct._id]?.details?.part_number_en
                                                                }}
                                                            />
                                                            {mainProduct.part_number_is_manual && (
                                                                <span
                                                                    id="help_part_number_en"
                                                                    className="fs-tiny form-label"
                                                                >
                                                                {mainProduct.part_number_auto?.en}
                                                            </span>
                                                            )}
                                                        </div>
                                                        {/* Part number fa */}
                                                        <div>
                                                            <DynamicAttributeField
                                                                onChange={(value) =>
                                                                    updateMainProduct(
                                                                        "part_number_fa",
                                                                        value
                                                                    )
                                                                }
                                                                className="p-2"
                                                                data={{
                                                                    attribute_name_en: "part_number_fa",
                                                                    attribute_name_fa: "پارت نامبر فارسی",
                                                                    attr_type: mainProduct.meta_datas.part_number_fa,
                                                                    attr_value: mainProduct.part_number_fa,
                                                                    attribute_readonly: !mainProduct.part_number_is_manual,
                                                                    attribute_error: errors[mainProduct._id]?.details?.part_number_fa
                                                                }}
                                                            />
                                                            {mainProduct.part_number_is_manual && (
                                                                <span
                                                                    id="help_part_number_fa"
                                                                    className="fs-tiny form-label"
                                                                >
                                                                {mainProduct.part_number_auto?.fa}
                                                            </span>
                                                            )}
                                                        </div>
                                                        {/* Part number bz */}
                                                        <div>
                                                            <DynamicAttributeField
                                                                onChange={(value) =>
                                                                    updateMainProduct(
                                                                        "part_number_bz",
                                                                        value
                                                                    )
                                                                }
                                                                className="p-2"
                                                                data={{
                                                                    attribute_name_en: "part_number_bz",
                                                                    attribute_name_fa: "پارت نامبر بازاری",
                                                                    attr_type: mainProduct.meta_datas.part_number_bz,
                                                                    attr_value: mainProduct.part_number_bz,
                                                                    attribute_readonly: !mainProduct.part_number_is_manual,
                                                                    attribute_error: errors[mainProduct._id]?.details?.part_number_bz
                                                                }}
                                                            />
                                                            {mainProduct.part_number_is_manual && (
                                                                <span
                                                                    id="help_part_number_bz"
                                                                    className="fs-tiny form-label"
                                                                >
                                                                {mainProduct.part_number_auto?.bz}
                                                            </span>
                                                            )}
                                                        </div>
                                                        {/* Tags */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4">
                                    <div className="card h-100">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0 card-title">رسانه ها</h5>
                                            <div className="d-flex align-items-center gap-1 fw-medium ql-snow">
                                                افزودن از
                                                <button
                                                    onClick={() => dropzoneRef.current?.handleOpenAddFromLinkModal()}
                                                    id="showAddLinkModal"
                                                    type="button"
                                                    className="rounded-pill lh-sm px-1 border"
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 18 18">
                                                        {" "}
                                                        <line
                                                            className="ql-stroke"
                                                            x1="7"
                                                            x2="11"
                                                            y1="7"
                                                            y2="11"
                                                        ></line>
                                                        {" "}
                                                        <path
                                                            className="ql-even ql-stroke"
                                                            d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"
                                                        ></path>
                                                        {" "}
                                                        <path
                                                            className="ql-even ql-stroke"
                                                            d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"
                                                        ></path>
                                                        {" "}
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => dropzoneRef.current?.handleOpenGalleryModal()}
                                                    id="showAddFromGalleryModal"
                                                    type="button"
                                                    className="rounded-pill lh-sm px-1 border"
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 18 18">
                                                        {" "}
                                                        <rect
                                                            className="ql-stroke"
                                                            height="10"
                                                            width="12"
                                                            x="3"
                                                            y="4"
                                                        ></rect>
                                                        {" "}
                                                        <circle className="ql-fill" cx="6" cy="7" r="1"></circle>
                                                        {" "}
                                                        <polyline
                                                            className="ql-even ql-fill"
                                                            points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
                                                        ></polyline>
                                                        {" "}
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body d-flex flex-column gap-3">
                                            <DropzoneComponent
                                                ref={dropzoneRef}
                                                urls={mainProduct.images}
                                                updateUrls={(valueOrFunction) => updateMainProduct('images', valueOrFunction)}
                                            />
                                            <ButtonImageUpload
                                                hasGallery
                                                openOnly
                                                icon={<IconUpload size={32}/>}
                                                text={'آپــلود دیــتاشیــت'}
                                                className={'justify-content-center align-items-center btn btn-lg border-success border-1 w-100 gap-1'}
                                                value={mainProduct.data_sheet}
                                                onChange={(url) => {
                                                    updateMainProduct('data_sheet', url)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-lg-3">
                                    <div className="card h-100">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0">ویژگی های عادی</h5>
                                        </div>
                                        <div
                                            className="gap-3 d-flex flex-column card-body"
                                        >
                                            <TabsWithInputsComponent
                                                errors={errors[mainProduct._id]?.nested_data?.non_variant_product_attrs}
                                                onChange={(valueOrFunction) => updateMainProduct('non_variant_product_attrs', valueOrFunction)}
                                                inputs={mainProduct.non_variant_product_attrs}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-9">
                                    <VariantProductContainer
                                        errors={errors}
                                        filterItem={filterItem}
                                        onChange={updateVariantAttrs}
                                        updateVariants={updateVariants}
                                        pageData={pageData}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-lg-8">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0">سایر موارد</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                {/* Navigation */}
                                                <div className="col-12 col-md-4 mx-auto card-separator">
                                                    <div
                                                        className="d-flex justify-content-between flex-column mb-3 mb-md-0 pe-md-3">
                                                        <ul className="nav nav-align-left nav-pills flex-column">
                                                            <li className="nav-item">
                                                                <button
                                                                    className="nav-link py-2 active"
                                                                    data-bs-target="#restock"
                                                                    data-bs-toggle="tab"
                                                                >
                                                                    <i className="ti ti-box me-2"></i>
                                                                    <span className="align-middle">
                                                                    انبار
                                                                </span>
                                                                </button>
                                                            </li>
                                                            <li className="nav-item">
                                                                <button
                                                                    className="nav-link py-2"
                                                                    data-bs-target="#shipping"
                                                                    data-bs-toggle="tab"
                                                                >
                                                                    <i className="ti ti-car me-2"></i>
                                                                    <span className="align-middle">
                                                                    حمل و نقل
                                                                </span>
                                                                </button>
                                                            </li>
                                                            <li className="nav-item">
                                                                <button
                                                                    className="nav-link py-2"
                                                                    data-bs-target="#global-delivery"
                                                                    data-bs-toggle="tab"
                                                                >
                                                                    <i className="ti ti-world me-2"></i>
                                                                    <span className="align-middle">
                                                                    ارسال بین‌الملل
                                                                </span>
                                                                </button>
                                                            </li>
                                                            <li className="nav-item">
                                                                <button
                                                                    className="nav-link py-2"
                                                                    data-bs-target="#attributes"
                                                                    data-bs-toggle="tab"
                                                                >
                                                                    <i className="ti ti-link me-2"></i>
                                                                    <span className="align-middle">
                                                                    سایر ویژگی‌ها
                                                                </span>
                                                                </button>
                                                            </li>
                                                            <li className="nav-item">
                                                                <button
                                                                    className="nav-link py-2"
                                                                    data-bs-target="#advanced"
                                                                    data-bs-toggle="tab"
                                                                >
                                                                    <i className="ti ti-lock me-2"></i>
                                                                    <span className="align-middle">
                                                                    پیشرفته
                                                                </span>
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
                                                        <div
                                                            className="tab-pane fade show active"
                                                            id="restock"
                                                            role="tabpanel"
                                                        >
                                                            <h5>مدیریت انبار</h5>
                                                            <label
                                                                className="form-label"
                                                                htmlFor="ecommerce-product-stock"
                                                            >
                                                                افزودن موجودی انبار
                                                            </label>
                                                            <div className="row mb-3 g-3 pe-md-5">
                                                                <div className="col-12 col-sm-9">
                                                                    <input
                                                                        aria-label="کمیت"
                                                                        className="form-control"
                                                                        id="ecommerce-product-stock"
                                                                        name="limit2"
                                                                        placeholder="مقدار"
                                                                        type="number"
                                                                    />
                                                                </div>
                                                                <div className="col-12 col-sm-3">
                                                                    <button
                                                                        className="btn btn-primary align-items-center">
                                                                        <i className="ti ti-check me-2 ti-xs"></i>
                                                                        تایید
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="mb-2">
                                                                <span className="h6">
                                                                    موجودی محصول:
                                                                </span>
                                                                    <span>54</span>
                                                                </p>
                                                                <p className="mb-2">
                                                                    <span className="h6">درحال ارسال:</span>
                                                                    <span>390</span>
                                                                </p>
                                                                <p className="mb-2">
                                                                <span className="h6">
                                                                    آخرین بروزرسانی:
                                                                </span>
                                                                    <span>24 آبان 1402</span>
                                                                </p>
                                                                <p className="mb-2">
                                                                    <span className="h6">موجودی کل:</span>
                                                                    <span>2430</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {/* Shipping Tab */}
                                                        <div
                                                            className="tab-pane fade"
                                                            id="shipping"
                                                            role="tabpanel"
                                                        >
                                                            <h5 className="mb-4">روش ارسال محصول</h5>
                                                            <div>
                                                                <div className="form-check mb-4">
                                                                    <input
                                                                        className="form-check-input"
                                                                        id="seller"
                                                                        name="shippingType"
                                                                        type="radio"
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="seller"
                                                                    >
                                                                    <span className="fw-medium d-block mb-1">
                                                                        توسط فروشنده
                                                                    </span>
                                                                        <small>
                                                                            تحویل توسط فروشنده و پیک.
                                                                            <br/>
                                                                            هر گونه آسیب یا تاخیر در ارسال شامل
                                                                            خسارت می شود.
                                                                        </small>
                                                                    </label>
                                                                </div>
                                                                <div className="form-check mb-5">
                                                                    <input
                                                                        defaultChecked
                                                                        className="form-check-input"
                                                                        id="companyName"
                                                                        name="shippingType"
                                                                        type="radio"
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="companyName"
                                                                    >
                                                                    <span className="fw-medium d-block mb-1">
                                                                        ارسال توسط شرکت شما
                                                                        <span
                                                                            className="badge rounded-2 badge-warning bg-label-warning fs-tiny py-1 ms-2 border border-warning">
                                                                            پیشنهادی
                                                                        </span>
                                                                    </span>
                                                                        <small>
                                                                            ارسال محصول شما، مسئولیت ماست.
                                                                            <br/>
                                                                            ما با دریافت هزینه ای ناچیز، فرآیند
                                                                            تحویل را برای شما انجام خواهیم داد.
                                                                        </small>
                                                                    </label>
                                                                </div>
                                                                <p className="mb-0">
                                                                    {" "}
                                                                    برای جزئیات بیشتر به
                                                                    <button>
                                                                        شرایط و ضوابط تحویل
                                                                    </button>
                                                                    مراجعه کنید
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {/* Global Delivery Tab */}
                                                        <div
                                                            className="tab-pane fade"
                                                            id="global-delivery"
                                                            role="tabpanel"
                                                        >
                                                            <h5 className="mb-4">ارسال بین‌الملل</h5>
                                                            {/* Worldwide delivery */}
                                                            <div className="form-check mb-3">
                                                                <input
                                                                    className="form-check-input"
                                                                    id="worldwide"
                                                                    name="globalDel"
                                                                    type="radio"
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="worldwide"
                                                                >
                                                                <span className="fw-medium mb-1 d-block">
                                                                    تحویل در سراسر جهان
                                                                </span>
                                                                    <small>
                                                                        فقط با روش ارسال موجود است:
                                                                        <button>
                                                                            با نام شرکت تکمیل شده است
                                                                        </button>
                                                                    </small>
                                                                </label>
                                                            </div>
                                                            {/* Global delivery */}
                                                            <div className="form-check mb-3">
                                                                <input
                                                                    defaultChecked
                                                                    className="form-check-input"
                                                                    name="globalDel"
                                                                    type="radio"
                                                                />
                                                                <label
                                                                    className="form-check-label w-75 pe-5"
                                                                    htmlFor="country-selected"
                                                                >
                                                                <span className="fw-medium d-block mb-1">
                                                                    کشورهای منتخب
                                                                </span>
                                                                    <input
                                                                        className="form-control"
                                                                        id="country-selected"
                                                                        placeholder="نام کشور را تایپ کنید"
                                                                        type="text"
                                                                    />
                                                                </label>
                                                            </div>
                                                            {/* Local delivery */}
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    id="local"
                                                                    name="globalDel"
                                                                    type="radio"
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="local"
                                                                >
                                                                <span className="fw-medium mb-1 d-block">
                                                                    تحویل محلی
                                                                </span>
                                                                    <small>
                                                                        تحویل به کشور محل اقامت شما:
                                                                        <button>
                                                                            تغییر آدرس پروفایل
                                                                        </button>
                                                                    </small>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {/* Attributes Tab */}
                                                        <div
                                                            className="tab-pane fade"
                                                            id="attributes"
                                                            role="tabpanel"
                                                        >
                                                            <h5 className="mb-4">سایر ویژگی‌ها</h5>
                                                            <div>
                                                                {/* Fragile Product */}
                                                                <div className="form-check mb-3">
                                                                    <input
                                                                        className="form-check-input"
                                                                        id="fragile"
                                                                        type="checkbox"
                                                                        value="fragile"
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="fragile"
                                                                    >
                                                                    <span className="fw-medium">
                                                                        محصول شکننده
                                                                    </span>
                                                                    </label>
                                                                </div>
                                                                {/* Biodegradable */}
                                                                <div className="form-check mb-3">
                                                                    <input
                                                                        className="form-check-input"
                                                                        id="biodegradable"
                                                                        type="checkbox"
                                                                        value="biodegradable"
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="biodegradable"
                                                                    >
                                                                    <span className="fw-medium">
                                                                        قابل تجزیه زیستی
                                                                    </span>
                                                                    </label>
                                                                </div>
                                                                {/* Frozen Product */}
                                                                <div className="form-check mb-3">
                                                                    <input
                                                                        defaultChecked
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        value="frozen"
                                                                    />
                                                                    <label
                                                                        className="form-check-label w-75 pe-5"
                                                                        htmlFor="frozen"
                                                                    >
                                                                    <span className="fw-medium mb-1 d-block">
                                                                        محصول منجمد
                                                                    </span>
                                                                        <input
                                                                            className="form-control"
                                                                            id="frozen"
                                                                            placeholder="حداکثر دمای مجاز"
                                                                            type="number"
                                                                        />
                                                                    </label>
                                                                </div>
                                                                {/* Exp Date */}
                                                                <div className="form-check mb-4">
                                                                    <input
                                                                        defaultChecked
                                                                        className="form-check-input"
                                                                        id="expDate"
                                                                        type="checkbox"
                                                                        value="expDate"
                                                                    />
                                                                    <label
                                                                        className="form-check-label w-75 pe-5"
                                                                        htmlFor="date-input"
                                                                    >
                                                                    <span className="fw-medium mb-1 d-block">
                                                                        تاریخ انقضای محصول
                                                                    </span>
                                                                        <input
                                                                            className="product-date form-control"
                                                                            id="date-input"
                                                                            type="date"
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* {/* /Attributes Tab Advanced Tab */}
                                                        <div
                                                            className="tab-pane fade"
                                                            id="advanced"
                                                            role="tabpanel"
                                                        >
                                                            <h5 className="mb-4">پیشرفته</h5>
                                                            <div className="row">
                                                                {/* Product Id Type */}
                                                                <div className="col">
                                                                    <label
                                                                        className="form-label"
                                                                        htmlFor="product-id"
                                                                    >
                                                                    <span className="mb-1 h6">
                                                                        نوع شناسه محصول
                                                                    </span>
                                                                    </label>
                                                                    <select
                                                                        className="select2 form-select"
                                                                        data-placeholder="ISBN"
                                                                        id="product-id"
                                                                    >
                                                                        <option value="">ISBN</option>
                                                                        <option value="ISBN">ISBN</option>
                                                                        <option value="UPC">UPC</option>
                                                                        <option value="EAN">EAN</option>
                                                                        <option value="JAN">JAN</option>
                                                                    </select>
                                                                </div>
                                                                {/* Product Id */}
                                                                <div className="col">
                                                                    <label
                                                                        className="form-label"
                                                                        htmlFor="product-id-1"
                                                                    >
                                                                    <span className="mb-1 h6">
                                                                        شناسه محصول
                                                                    </span>
                                                                    </label>
                                                                    <input
                                                                        className="form-control"
                                                                        id="product-id-1"
                                                                        placeholder="شماره شابک"
                                                                        type="number"
                                                                    />
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
                                </div>
                                <div className="col-12 col-lg-4">
                                    <div className="card h-100">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0">قیمت گذاری</h5>
                                        </div>
                                        <div className="card-body d-flex flex-column gap-3">
                                            {/* Base Price */}
                                            <DynamicAttributeField
                                                onChange={(value) => handleChange("price", value)}
                                                className="p-2"
                                                data={{
                                                    attribute_name_fa: "قیمت پایه",
                                                    attribute_name_en: "price",
                                                    attr_type: pageData.meta_datas.price,
                                                    attr_value: pageData.price,
                                                    attribute_readonly: true,

                                                }}
                                            />
                                            {/* Discounted Price */}
                                            <DynamicAttributeField
                                                className="p-2"
                                                data={{
                                                    attribute_name_fa: "قیمت با تخفیف",
                                                    attribute_name_en: "discountedPrice",
                                                    attr_type: pageData.meta_datas.discount_price,
                                                    attr_value: pageData.discount_price,
                                                    attribute_readonly: true,
                                                }}
                                            />
                                            <div className="d-flex flex-wrap gap-x-3 gap-2">
                                                <div className="btn-group">
                                                    <RippleButton className="p-1 btn btn-sm btn-label-primary">
                                                        حد موجودی فروشگاه
                                                    </RippleButton>
                                                    <RippleButton className="p-1 btn btn-sm btn-label-primary">
                                                        {pageData.limit}
                                                    </RippleButton>
                                                </div>
                                                <div className="btn-group">
                                                    <RippleButton className="p-1 btn btn-sm btn-light">
                                                        موجود در انبار
                                                    </RippleButton>
                                                    <RippleButton className="p-1 btn btn-sm btn-light">
                                                        {pageData.stock_quantity}
                                                    </RippleButton>
                                                </div>
                                                <div className="btn-group">
                                                    <RippleButton className="p-1 btn btn-sm btn-dark">
                                                        تعداد رزرو شده
                                                    </RippleButton>
                                                    <RippleButton className="p-1 btn btn-sm btn-dark">
                                                        {pageData.reserved_quantity}
                                                    </RippleButton>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-wrap gap-2">
                                                {Object.entries(pageData.discount_dict).map(([count, percent], index) =>
                                                    <RippleButton key={index}
                                                                  className={`d-flex flex-column gap-1 btn border-primary btn-label-primary border-1 btn-sm`}
                                                    >
                                                        {count} +
                                                        <hr className={'w-100 rotate-4 m-0'}/>
                                                        % {percent}
                                                    </RippleButton>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </ClientLayout>
        );
    }
;

export default CreateProductPage;
