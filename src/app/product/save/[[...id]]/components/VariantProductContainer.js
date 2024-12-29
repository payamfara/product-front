import RippleButton from "@/src/components/RippleButton/RippleButton";
import React, {useState, useEffect} from "react";
    import {FaTrash, FaSquare} from "react-icons/fa";
import TabsWithInputsComponent from "../../../../../components/TabsWithInputsComponent";
import {baseApiAuth} from "@/src/api/baseApi";
import {FaSquareCheck} from "react-icons/fa6";
import DropzoneComponent from "@/src/components/DropzoneComponent";
import PlusButton from "../../../../../components/PlusButton";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";

const Card = ({
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
                card.linked ? "border-success" : isActive ? "border-primary" : ""
            } border-dashed position-relative`}
        >
            <div
                className="position-absolute d-flex flex-column justify-content-center gap-4 top-0 start-0 h-100 mxn-2">
                {!card.id ? (
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
                <div className="card-img card-body p-0">
                    <img
                        className="card-img"
                        src={
                            card.images.length
                                ? card.images[0]
                                : "/images/default-product.png"
                        }
                        alt=""
                    />
                </div>
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
                                     updateVariants,
                                     onChange,
                                     pageData,
                                 }) => {
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

    const handleDelete = (index) => {
        setActiveCard((activeCard) => activeCard - 1);
        setIsAttributeFrm(true);
        updateVariants((cards) => cards.filter((_, i) => i !== index));
    };

    const handleAddCard = (newCard) => {
        updateVariants((cards) => [newCard, ...cards]);
        setActiveCard(0);
        setIsAttributeFrm(true);
    };

    useEffect(() => {
        toggleLink(0);
    }, []);

    const handleCardClick = async (index) => {
        console.log(index, cards[index]);

        if (cards[index].variant_product_attrs) {
            setActiveCard(index);
            setIsAttributeFrm(true);
            return;
        }

        const requestUrl = `/api2/product/${cards[index].id}`;
        baseApiAuth
            .get(requestUrl)
            .then((res) => {
                updateVariants((cards) =>
                    cards.map((c, i) =>
                        i === index
                            ? {
                                ...cards[index],
                                variant_product_attrs: [
                                    ...res.data.variant_product_attrs,
                                    ...res.data.variant_extra_attrs,
                                ],
                                non_variant_product_attrs: [
                                    ...res.data.non_variant_product_attrs,
                                    ...res.data.non_variant_extra_attrs,
                                ],
                            }
                            : c
                    )
                );
                setActiveCard(index);
                setIsAttributeFrm(true);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
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
                            part_number_en: card.part_number_en_default,
                            part_number_fa: card.part_number_fa_default,
                            part_number_bz: card.part_number_bz_default,
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
                    onClick={() =>
                        handleAddCard({
                            part_number_en: "new",
                            part_number_fa: "new",
                            part_number_bz: "",
                            images: [],
                            variant_product_attrs: emptyFrm,
                            linked: true,
                            created: true,
                        })
                    }
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
                                isActive={activeCard === index}
                                onDelete={() => handleDelete(index)}
                                toggleLink={() => toggleLink(index)}
                                onClick={() => handleCardClick(index)}
                            />
                        ))}
                    </div>
                    {activeCard >= -1 &&
                    activeCard <= cards.length - 1 &&
                    cards[activeCard] &&
                    (cards[activeCard].linked ||
                        !mainProduct.non_variant_product_attrs.some((nonVariant) => nonVariant.changed)) ? (
                        <div className="position-relative border border-dashed rounded col-9 p-2">
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
                            {isAttributeFrm ? (
                                <TabsWithInputsComponent
                                    inputs={cards[activeCard].variant_product_attrs}
                                    onChange={(updateAttrValuesFunction) =>
                                        updateAttrValues(
                                            updateAttrValuesFunction,
                                            "variant_product_attrs"
                                        )
                                    }
                                />
                            ) : (
                                <div className="row">
                                    <div className="col-4">
                                        <div className="card h-100 border">
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
                                                        }}
                                                    />
                                                    {cards[activeCard].part_number_is_manual && (
                                                        <span
                                                            id="help_part_number_en"
                                                            className="fs-tiny form-label"
                                                        >
                              {cards[activeCard].part_number_en_default}
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
                                                        }}
                                                    />
                                                    {cards[activeCard].part_number_is_manual && (
                                                        <span
                                                            id="help_part_number_fa"
                                                            className="fs-tiny form-label"
                                                        >
                              {cards[activeCard].part_number_fa_default}
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
                                                        }}
                                                    />
                                                    {cards[activeCard].part_number_is_manual && (
                                                        <span
                                                            id="help_part_number_bz"
                                                            className="fs-tiny form-label"
                                                        >
                              {cards[activeCard].part_number_bz_default}
                            </span>
                                                    )}
                                                </div>
                                                {/* Tags */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <DropzoneComponent
                                            urls={cards[activeCard].images}
                                            updateUrls={updateUrls}
                                            uploadUrl={
                                                "http://192.168.1.9:8001/api/save_images/products/"
                                            }
                                        />
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
