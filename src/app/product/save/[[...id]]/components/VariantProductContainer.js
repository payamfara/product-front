import RippleButton from "@/src/components/RippleButton/RippleButton";
import React, { useState, useImperativeHandle, forwardRef } from "react";
import { FaTrash } from "react-icons/fa";
import TabsWithInputsComponet from "../../../../../components/TabsWithInputsComponent";
import { baseApiAuth } from "@/src/api/baseApi";

const Card = ({ form, isActive, onDelete, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-2 rounded border ${
        isActive ? "border-primary" : ""
      } border-dashed position-relative`}
    >
      <div className="position-absolute d-flex flex-column justify-content-center gap-4 top-0 start-0 h-100 mxn-2">
        <RippleButton
          className="z-1 rounded-start-0 border-0 border-danger ribbon btn btn-danger btn-sm p-1"
          onClick={() => onDelete()}
          title="Delete"
        >
          <FaTrash size={16} />
        </RippleButton>
      </div>
      <div className={`card shadow-lg h-100 overflow-hidden`}>
        <div className="card-img card-body p-0">
          <img
            className="card-img"
            src={
              form.images.length
                ? form.images[0]
                : "/images/default-product.png"
            }
            alt=""
          />
        </div>
        <div className="card-footer p-0">
          <p className="card-text">
            <small className="d-block lh-2 py-1 px-2 m-0 text-truncate">
              {form.part_number_en}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

const PlusButton = ({ onClick }) => {
  return (
    <div className="lh-1 card shadow-sm p-2">
      <RippleButton onClick={onClick} type="button">
        <i className="lh-1 fs-4 fa-solid fa-plus"></i>
      </RippleButton>
    </div>
  );
};

const VariantProductContainer = forwardRef(
  ({ forms, inputs, handleSubmit }, ref) => {
    const [cards, setCards] = useState(forms);
    const [activeCard, setActiveCard] = useState(null);
    const emptyFrm = inputs
    // const emptyFrm = inputs.map((input) => ({
    //   ...input,
    //   attr_value: undefined,
    //   attr_value_str: undefined,
    //   meta_datas: {
    //     ...input.meta_datas,
    //     attr_value: { ...input.meta_datas.attr_value, default: undefined },
    //   },
    // }));

    useImperativeHandle(ref, () => ({
      getValues: () => cards,
    }));

    const handleDelete = (index) => {
      setCards(cards.filter((_, i) => i !== index));
    };

    const handleAddCard = (newForm) => {
      setCards([newForm, ...cards]);
      setActiveCard(newForm);
    };

    const handleCardClick = async (card, index) => {
      console.log('card', cards);
      
      if (card.variant_product_attrs) {
        setActiveCard(card);
        return;
      }

      const requestUrl = `/api2/product/${card.id}`;
      baseApiAuth
        .get(requestUrl)
        .then((res) => {
          const updatedCard = {
            ...card,
            variant_product_attrs: [
              ...res.data.variant_product_attrs,
              ...res.data.variant_extra_attrs,
            ],
          };
          const updatedCards = cards.map((c, i) =>
            i === index ? updatedCard : c
          );
          setCards(updatedCards);
          setActiveCard(updatedCard);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });

      // try {
      //   const res = await baseApiAuth.get(requestUrl)
      //   const newFrm = card.id
      //     ? (await baseApiAuth.get(requestUrl)).data.variant_product_attrs
      //     : emptyFrm;
      // } catch (err) {
      // }
    };

    return (
      <div id="variant_attrs" className="card mb-4">
        <div className="card-header d-flex align-items-center gap-3">
          <h5 className="card-title mb-0">ویژگی های وریانت</h5>
          <PlusButton
            onClick={() =>
              handleAddCard({
                part_number_en: "new",
                images: [],
                variant_product_attrs: emptyFrm,
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
              {cards.map((form, index) => (
                <Card
                  key={index}
                  form={form}
                  isActive={activeCard?.id === form.id}
                  onDelete={() => handleDelete(index)}
                  onClick={() => handleCardClick(form, index)}
                />
              ))}
            </div>
            {activeCard ? (
              <div className="position-relative border border-dashed rounded col-9">
                <TabsWithInputsComponet
                  inputs={activeCard.variant_product_attrs}
                />
              </div>
            ) : (
              <div className="border border-dashed rounded col-9">
                <div className="h-100 d-flex flex-column gap-1 justify-content-center align-items-center fs-5">
                  <div className="opacity-70">فرم ویژگی ها</div>
                  <div className="opacity-50 text-danger fs-6">
                    (روی کارت ها کلیک کنید)
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default VariantProductContainer;
