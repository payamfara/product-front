import RippleButton from "@/src/components/RippleButton/RippleButton";
import React, {
  useState,
  useEffect,
} from "react";
import { FaTrash, FaSquare } from "react-icons/fa";
import TabsWithInputsComponent from "../../../../../components/TabsWithInputsComponent";
import { baseApiAuth } from "@/src/api/baseApi";
import { FaSquareCheck } from "react-icons/fa6";
import DropzoneComponent from "@/src/components/DropzoneComponent";
import PlusButton from '../../../../../components/PlusButton';
import {updatePartNumbers} from '@/src/utils/funcs';

const Card = ({ card, isActive, toggleLink, isLinkable, onDelete, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-2 rounded border ${card.linked ? "border-success" : isActive ? "border-primary" : ""
        } border-dashed position-relative`}
    >
      <div className="position-absolute d-flex flex-column justify-content-center gap-4 top-0 start-0 h-100 mxn-2">
        {!card.id && <RippleButton
          className="z-1 rounded-start-0 border-0 border-danger ribbon btn btn-danger btn-sm p-1"
          onClick={onDelete}
          title="Delete"
        >
          <FaTrash size={16} />
        </RippleButton>}
        {card.id && isLinkable && <RippleButton
          className="z-1 rounded-start-0 border-0 border-success ribbon btn btn-success btn-sm p-1"
          onClick={toggleLink}
          title="Add"
        >
          {card.linked ? <FaSquareCheck size={16} /> : <FaSquare size={16} />}
        </RippleButton>}
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

const VariantProductContainer = ({ nonVariants, updateVariants, pageId, onChange, cards, inputs }) => {
  const [activeCard, setActiveCard] = useState(-1);
  const [isAttributeFrm, setIsAttributeFrm] = useState(true);

  const emptyFrm = inputs.map((input) => {
    const { id, ...inputData } = input;
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
    console.log(index);

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

  const updateAttrValues = (updateAttrValuesFunction) =>
    onChange((cards) =>
      cards.map((card, index) => {
        if (index !== activeCard) return card;
        const updatedCard = updateAttrValuesFunction(card, "variant_product_attrs");
        const attrs = [...nonVariants, ...updatedCard.variant_product_attrs]
        const partNumbers = updatePartNumbers(attrs)
        return { ...updatedCard, ...partNumbers };
      })
    );
  const toggleLink = (index) =>
    onChange((cards) =>
      cards.map((card, i) =>
        i === index ? { ...card, linked: !card.linked } : card
      )
    );
  console.log("cards", cards);
  const updateUrls = (newUrls) => {
    updateVariants((cards) =>
      cards.map((c, i) =>
        i === activeCard
          ? {
            ...cards[activeCard],
            'images': newUrls,
          }
          : c
      )
    )
  }

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
                isLinkable={nonVariants.some((nonVariant) => nonVariant.changed)}
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
            (cards[activeCard].linked || !nonVariants.some((nonVariant) => nonVariant.changed)) ? (
            <div className="position-relative border border-dashed rounded col-9">
              <div className="position-absolute end-0 top-0 myn-3 mx-3 d-flex gap-3">
                {cards[activeCard].id !== pageId && <RippleButton
                  className={`z-1 rounded-start-0 border-success btn ${!isAttributeFrm
                    ? "btn-success border-1"
                    : "btn-white border-0"
                    } btn-sm p-1`}
                  onClick={() => setIsAttributeFrm(false)}
                  title="Information Form"
                >
                  فرم اطلاعات
                </RippleButton>}
                <RippleButton
                  className={`z-1 rounded-start-0 border-danger btn ${isAttributeFrm
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
                  onChange={updateAttrValues}
                />
              ) : (
                <div>
                  <DropzoneComponent urls={cards[activeCard].images} updateUrls={updateUrls} uploadUrl={"http://192.168.1.21:8000/api/save_images/products/"} />
                </div>
              )}
            </div>
          ) : nonVariants.some((nonVariant) => nonVariant.changed) ? (
            <div className="bg-secondary-subtle border border-dashed rounded col-9">
              <div className="h-100 d-flex flex-column gap-1 justify-content-center align-items-center fs-5">
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
              <div className="h-100 d-flex flex-column gap-1 justify-content-center align-items-center fs-5">
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
