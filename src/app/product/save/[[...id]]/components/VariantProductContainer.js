import RippleButton from "@/src/components/RippleButton/RippleButton";
import React, {useState, useEffect, useRef} from "react";
import {FaTrash, FaSquare} from "react-icons/fa";
import TabsWithInputsComponent from "../../../../../components/TabsWithInputsComponent";
import {baseApiAuth} from "@/src/api/baseApi";
import {FaSquareCheck} from "react-icons/fa6";
import DropzoneComponent from "@/src/components/DropzoneComponent";
import PlusButton from "../../../../../components/PlusButton";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import Loading from "../../../../../components/Loading";
import {IconCamera, IconCheck, IconUpload, IconX} from "@tabler/icons-react";
import {mediaUrl} from "../../../../../utils/funcs";
import ButtonImageUpload from "../../../../../components/ButtonImageUpload";

const Card = ({
                  isMain,
                  card,
                  isActive,
                  toggleLink,
                  isLinkable,
                  onDelete,
                  onClick,
              }) => {
    return (
        <div
            onClick={onClick}
            className={`p-2 rounded border ${
                isMain ? isActive ? "border-success" : "border-danger" : card.id && isActive || (card.linked && isActive) ? "border-success" : isActive ? "border-primary" : ""
            } border-dashed position-relative`}
        >
            <div
                className="position-absolute d-flex flex-column justify-content-center gap-4 top-0 start-0 h-100 mxn-2">
                {isMain ? (
                    <RippleButton
                        className="pe-none z-1 rounded-start-0 border-0 border-danger ribbon btn btn-danger btn-sm p-1"
                    >
                        اصلی
                    </RippleButton>
                ) : undefined}
                {card.id === undefined ? (
                    <RippleButton
                        className="z-1 rounded-start-0 border-0 border-danger ribbon btn btn-danger btn-sm p-1"
                        onClick={onDelete}
                        title="Delete"
                    >
                        <FaTrash size={16}/>
                    </RippleButton>
                ) : undefined}
                {card.id && isLinkable ? (
                    <RippleButton
                        className="z-1 rounded-start-0 border-0 border-success ribbon btn btn-success btn-sm p-1"
                        onClick={toggleLink}
                        title="Add"
                    >
                        {card.linked ? <FaSquareCheck size={16}/> : <FaSquare size={16}/>}
                    </RippleButton>
                ) : undefined}
            </div>
            <div className={`card shadow-lg h-100 overflow-hidden`}>
                {card.images.length
                    ? <div className="card-img card-body p-0">
                        <img
                            className="card-img"
                            src={mediaUrl(card.images[0])}
                            alt=""
                        />
                    </div>
                    : <div
                        className="bg-secondary-subtle d-flex justify-content-center align-items-center card-img card-body p-0">
                        <IconCamera size={24}/>
                    </div>
                }
                <div className="card-footer p-0">
                    <p className="card-text">
                        <small className="d-block lh-2 py-1 px-2 m-0 text-truncate">
                            {card.part_number_en}
                        </small>
                    </p>
                </div>
            </div>
        </div>
    );
};

const VariantProductContainer = ({
                                     filterItem,
                                     updateVariants,
                                     onChange,
                                     pageData,
                                     errors
                                 }) => {
    const dropzoneRef = useRef(null);
    const [activeCard, setActiveCard] = useState(-1);
    const [isAttributeFrm, setIsAttributeFrm] = useState(true);

    const cards = pageData.variant_products;
    const inputs = pageData.variant_product_attrs;
    const emptyFrm = inputs.map((input) => {
        const {id, ...inputData} = input;
        return {
            ...inputData,
            attr_value: undefined,
            attribute_value_str: undefined,
            meta_datas: {
                ...inputData.meta_datas,
                attr_value: {
                    ...inputData.meta_datas.attr_value,
                    default: undefined,
                },
            },
        };
    });

    const counter = useRef(1);
    const makeUUid = () => {
        const uuid = `new_${counter.current}`
        counter.current = counter.current + 1;
        return uuid;
    }

    const emptyCard = {
        part_number_en: "_",
        part_number_fa: "_",
        part_number_bz: "_",
        part_number_is_manual: false,
        is_active: true,
        status: 1,
        summary: "_",
        data_sheet: '',
        images: [],
        meta_datas: pageData.meta_datas,
        variant_product_attrs: emptyFrm,
        linked: true,
        created: true,
    }

    const handleDelete = (index) => {
        setActiveCard((activeCard) => activeCard - 1);
        setIsAttributeFrm(true);
        updateVariants((cards) => cards.filter((_, i) => i !== index));
    };

    const handleAddCard = () => {
        const _id = makeUUid();
        updateVariants((cards) => [cards[0], {_id, ...emptyCard}, ...cards?.slice(1)]);
        setActiveCard(0);
        setIsAttributeFrm(true);
    };

    useEffect(() => {
        toggleLink(0);
    }, []);


    const [variantLoading, setVariantLoading] = useState(false);
    const handleCardClick = async (index) => {

        if (cards[index].variant_product_attrs) {
            setActiveCard(index);
            setIsAttributeFrm(true);
            return;
        }

        setVariantLoading(true);
        const requestUrl = `/api2/product/${cards[index].id}`;
        baseApiAuth
            .get(requestUrl)
            .then((res) => {
                updateVariants((cards) =>
                    cards.map((c, i) =>
                        i === index
                            ? filterItem({
                                ...cards[index],
                                variant_product_attrs: [
                                    ...res.data.variant_product_attrs,
                                    ...res.data.variant_extra_attrs,
                                ],
                                non_variant_product_attrs: [
                                    ...res.data.non_variant_product_attrs,
                                    ...res.data.non_variant_extra_attrs,
                                ],
                            })
                            : c
                    )
                );
                setActiveCard(index);
                setIsAttributeFrm(true);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            })
            .finally(() => {
                setVariantLoading(false);
            });
    };

    const updateAttrValues = (updateAttrValuesFunctionOrValue, key) =>
        onChange((cards) =>
            cards.map((card, index) =>
                index === activeCard
                    ? {
                        ...card,
                        [key]:
                            typeof updateAttrValuesFunctionOrValue === "function"
                                ? updateAttrValuesFunctionOrValue(card[key])
                                : updateAttrValuesFunctionOrValue,
                        ...(key === "part_number_is_manual" ? updateAttrValuesFunctionOrValue ? {
                            part_number_en: card.part_number_en_custom,
                            part_number_fa: card.part_number_fa_custom,
                            part_number_bz: card.part_number_bz_custom,
                        } : {
                            part_number_en_custom: card.part_number_en,
                            part_number_fa_custom: card.part_number_fa,
                            part_number_bz_custom: card.part_number_bz,
                            part_number_en: card.part_number_auto?.en,
                            part_number_fa: card.part_number_auto?.fa,
                            part_number_bz: card.part_number_auto?.bz,
                        } : {})
                    }
                    : card
            )
        );
    const toggleLink = (index) =>
        onChange((cards) =>
            cards.map((card, i) =>
                i === index ? {...card, linked: !card.linked} : card
            )
        );
    const updateUrls = (updateUrlsFunction) => {
        updateVariants((cards) =>
            cards.map((c, i) =>
                i === activeCard
                    ? {
                        ...cards[activeCard],
                        images: updateUrlsFunction(cards[activeCard].images),
                    }
                    : c
            )
        );
    };

    const mainProduct = cards.find(c => c.id === pageData.id)

    return (
        <div id="variant_attrs" className="card h-100">
            <div className="card-header d-flex align-items-center gap-3">
                <h5 className="card-title mb-0">ویژگی های وریانت</h5>
                <PlusButton
                    onClick={handleAddCard}
                />
            </div>
            <div className="card-body">
                <div className="row">
                    <div
                        dir="ltr"
                        className="h-24rem overflow-scroll variant-carts col-3 d-flex flex-column gap-3"
                    >
                        {cards.map((card, index) => (
                            <Card
                                key={index}
                                card={card}
                                isLinkable={mainProduct.non_variant_product_attrs.some(
                                    (nonVariant) => nonVariant.changed
                                )}
                                isMain={card.id === pageData.id}
                                isActive={activeCard === index}
                                onDelete={() => handleDelete(index)}
                                toggleLink={() => toggleLink(index)}
                                onClick={() => handleCardClick(index)}
                            />
                        ))}
                    </div>
                    {variantLoading
                        ? (
                            <div className="bg-secondary-subtle border border-dashed rounded col-9">
                                <div
                                    className="h-100 d-flex flex-column gap-1 justify-content-center align-items-center fs-5">
                                    <Loading/>
                                </div>
                            </div>
                        ) : activeCard >= -1 &&
                        activeCard <= cards.length - 1 &&
                        cards[activeCard] &&
                        (cards[activeCard].linked ||
                            !mainProduct.non_variant_product_attrs.some((nonVariant) => nonVariant.changed)) ? (
                            <div
                                className={`position-relative border border-dashed rounded col-9 ${!isAttributeFrm || cards[activeCard].variant_product_attrs.length ? 'p-2' : 'p-0'}`}>
                                <div className="position-absolute end-0 top-0 myn-3 mx-3 d-flex gap-3">
                                    {cards[activeCard].id !== pageData.id && (
                                        <RippleButton
                                            className={`z-1 rounded-start-0 border-success btn ${
                                                !isAttributeFrm
                                                    ? "btn-success border-1"
                                                    : "btn-white border-0"
                                            } btn-sm p-1`}
                                            onClick={() => setIsAttributeFrm(false)}
                                            title="Information Form"
                                        >
                                            فرم اطلاعات
                                        </RippleButton>
                                    )}
                                    <RippleButton
                                        className={`z-1 rounded-start-0 border-danger btn ${
                                            isAttributeFrm
                                                ? "btn-danger border-1"
                                                : "btn-white border-0"
                                        } btn-sm p-1`}
                                        onClick={() => setIsAttributeFrm(true)}
                                        title="Attributes Form"
                                    >
                                        فرم ویژگی ها
                                    </RippleButton>
                                </div>
                                {isAttributeFrm ?
                                    cards[activeCard].variant_product_attrs.length ? (
                                            <TabsWithInputsComponent
                                                errors={errors[cards[activeCard]._id]?.nested_data?.variant_product_attrs}
                                                inputs={cards[activeCard].variant_product_attrs}
                                                onChange={(updateAttrValuesFunction) =>
                                                    updateAttrValues(
                                                        updateAttrValuesFunction,
                                                        "variant_product_attrs"
                                                    )
                                                }
                                            />
                                        )
                                        : (
                                            <div
                                                className="h-100 w-100 bg-secondary-subtle border border-dashed rounded col-9">
                                                <div
                                                    className="h-100 d-flex flex-column gap-1 justify-content-center align-items-center fs-5">
                                                    <div className="opacity-70">فرم ویژگی ها</div>
                                                    <div className="opacity-100 text-danger fs-6">
                                                        آیتمی یافت نشد!
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    : (
                                        <div className="row">
                                            <div className="col-4 d-flex flex-column gap-3">
                                                <div className="card border flex-grow-1">
                                                    <div className="card-header">
                                                        <h5 className="card-title mb-0">جزئیات</h5>
                                                    </div>
                                                    <div className="card-body d-flex flex-column gap-3">
                                                        {/* Part number manual */}
                                                        <DynamicAttributeField
                                                            onChange={(value) => {
                                                                updateAttrValues(value, "part_number_is_manual");
                                                            }}
                                                            className="p-2"
                                                            data={{
                                                                attribute_name_en: "part_number_is_manual",
                                                                attribute_name_fa: "پارت نامبر دستی",
                                                                attr_type:
                                                                cards[activeCard].meta_datas
                                                                    .part_number_is_manual,
                                                                attr_value: cards[activeCard].part_number_is_manual,
                                                                attribute_error: errors[cards[activeCard]._id]?.details?.part_number_is_manual,
                                                            }}
                                                        />
                                                        {/* Part number en */}
                                                        <div>
                                                            <DynamicAttributeField
                                                                onChange={(value) =>
                                                                    updateAttrValues(value, "part_number_en")
                                                                }
                                                                className="p-2"
                                                                data={{
                                                                    attribute_name_en: "part_number_en",
                                                                    attribute_name_fa: "پارت نامبر انگلیسی",
                                                                    attr_type: cards[activeCard].meta_datas.part_number_en,
                                                                    attr_value: cards[activeCard].part_number_en,
                                                                    attribute_readonly: !cards[activeCard].part_number_is_manual,
                                                                    attribute_error: errors[cards[activeCard]._id]?.details?.part_number_en,
                                                                }}
                                                            />
                                                            {cards[activeCard].part_number_is_manual && (
                                                                <span
                                                                    id="help_part_number_en"
                                                                    className="fs-tiny form-label"
                                                                >
                              {cards[activeCard].part_number_auto?.en}
                            </span>
                                                            )}
                                                        </div>
                                                        {/* Part number fa */}
                                                        <div>
                                                            <DynamicAttributeField
                                                                onChange={(value) =>
                                                                    updateAttrValues(value, "part_number_fa")
                                                                }
                                                                className="p-2"
                                                                data={{
                                                                    attribute_name_en: "part_number_fa",
                                                                    attribute_name_fa: "پارت نامبر فارسی",
                                                                    attr_type: cards[activeCard].meta_datas.part_number_fa,
                                                                    attr_value: cards[activeCard].part_number_fa,
                                                                    attribute_readonly: !cards[activeCard].part_number_is_manual,
                                                                    attribute_error: errors[cards[activeCard]._id]?.details?.part_number_fa,
                                                                }}
                                                            />
                                                            {cards[activeCard].part_number_is_manual && (
                                                                <span
                                                                    id="help_part_number_fa"
                                                                    className="fs-tiny form-label"
                                                                >
                              {cards[activeCard].part_number_auto?.fa}
                            </span>
                                                            )}
                                                        </div>
                                                        {/* Part number bz */}
                                                        <div>
                                                            <DynamicAttributeField
                                                                onChange={(value) =>
                                                                    updateAttrValues(value, "part_number_bz")
                                                                }
                                                                className="p-2"
                                                                data={{
                                                                    attribute_name_en: "part_number_bz",
                                                                    attribute_name_fa: "پارت نامبر بازاری",
                                                                    attr_type: cards[activeCard].meta_datas.part_number_bz,
                                                                    attr_value: cards[activeCard].part_number_bz,
                                                                    attribute_readonly: !cards[activeCard].part_number_is_manual,
                                                                    attribute_error: errors[cards[activeCard]._id]?.details?.part_number_bz,
                                                                }}
                                                            />
                                                            {cards[activeCard].part_number_is_manual && (
                                                                <span
                                                                    id="help_part_number_bz"
                                                                    className="fs-tiny form-label"
                                                                >
                              {cards[activeCard].part_number_auto?.bz}
                            </span>
                                                            )}
                                                        </div>
                                                        <div className="">
                                                            <DynamicAttributeField
                                                                onChange={(value) =>
                                                                    updateAttrValues(value, "summary")
                                                                }
                                                                className="p-2"
                                                                data={{
                                                                    attribute_name_en:
                                                                        "summary",
                                                                    attribute_name_fa: "توضیح کوتاه",
                                                                    attr_type:
                                                                    cards[activeCard].meta_datas
                                                                        .summary,
                                                                    attr_value: cards[activeCard].summary,
                                                                    attribute_error: errors[cards[activeCard]._id]?.details?.summary,
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="d-flex gap-2">
                                                            {cards[activeCard].is_active
                                                                ? <RippleButton
                                                                    onClick={() =>
                                                                        updateAttrValues(value => !value, "is_active")
                                                                    }
                                                                    className={`d-flex btn border-success btn-success border-1 btn-sm p-1`}
                                                                >
                                                                    <IconCheck className={'flex-shrink-0'} size={20}/>
                                                                    <div className={'text-truncate'}>فعال</div>
                                                                </RippleButton>
                                                                : <RippleButton
                                                                    onClick={() =>
                                                                        updateAttrValues(value => !value, "is_active")
                                                                    }
                                                                    className={`d-flex btn border-danger btn-danger border-1 btn-sm p-1`}
                                                                >
                                                                    <IconX className={'flex-shrink-0'} size={20}/>
                                                                    <div className={'text-truncate'}>غیرفعال</div>
                                                                </RippleButton>
                                                            }
                                                            {cards[activeCard].status === 1
                                                                ? <RippleButton
                                                                    onClick={() =>
                                                                        updateAttrValues(value => 2, "status")
                                                                    }
                                                                    className={`d-flex btn border-primary btn-label-primary border-1 btn-sm p-1`}
                                                                >
                                                                    <div className={'text-truncate'}>قابل انتشار</div>
                                                                </RippleButton>
                                                                : <RippleButton
                                                                    onClick={() =>
                                                                        updateAttrValues(value => 1, "status")
                                                                    }
                                                                    className={`d-flex btn border-primary btn-primary border-1 btn-sm p-1`}
                                                                >
                                                                    <div className={'text-truncate'}>پیش نویس</div>
                                                                </RippleButton>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-8">

                                                <div className="card h-100">
                                                    <div
                                                        className="card-header d-flex justify-content-between align-items-center">
                                                        <h5 className="mb-0 card-title">رسانه ها</h5>
                                                        <a className="d-flex align-items-center gap-1 fw-medium ql-snow">
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
                                                                    <circle className="ql-fill" cx="6" cy="7"
                                                                            r="1"></circle>
                                                                    {" "}
                                                                    <polyline
                                                                        className="ql-even ql-fill"
                                                                        points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
                                                                    ></polyline>
                                                                    {" "}
                                                                </svg>
                                                            </button>
                                                        </a>
                                                    </div>
                                                    <div className="card-body d-flex flex-column gap-3">
                                                        <DropzoneComponent
                                                            ref={dropzoneRef}
                                                            urls={cards[activeCard].images}
                                                            updateUrls={updateUrls}
                                                        />
                                                    </div>
                                                    <ButtonImageUpload
                                                        fillOnly
                                                        icon={<IconUpload size={32}/>}
                                                        text={'آپــلود دیــتاشیــت'}
                                                        className={'justify-content-center align-items-center btn btn-lg border-success border-1 w-100 gap-1'}
                                                        value={cards[activeCard].data_sheet}
                                                        onChange={(url) => {
                                                            updateAttrValues(url, "data_sheet")
                                                        }}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    )}
                            </div>
                        ) : mainProduct.non_variant_product_attrs.some((nonVariant) => nonVariant.changed) ? (
                            <div className="bg-secondary-subtle border border-dashed rounded col-9">
                                <div
                                    className="h-100 d-flex flex-column gap-1 justify-content-center align-items-center fs-5">
                                    <div className="opacity-70">فرم ویژگی ها</div>
                                    <div className="opacity-100 text-danger fs-6">
                                        (ابتدا فرم{" "}
                                        <span className="border-bottom border-danger pb-1">
                    ویژگی های عادی
                  </span>{" "}
                                        را سیو کنید)
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="border border-dashed rounded col-9">
                                <div
                                    className="h-100 d-flex flex-column gap-1 justify-content-center align-items-center fs-5">
                                    <div className="opacity-70">فرم ویژگی ها</div>
                                    <div className="text-danger fs-6">
                                        (روی{" "}
                                        <span className="border-bottom border-danger pb-1">
                    کارت ها
                  </span>{" "}
                                        کلیک کنید)
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default VariantProductContainer;
