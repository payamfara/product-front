import RippleButton from "@/src/components/RippleButton/RippleButton";
import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { FaTrash, FaSquare } from "react-icons/fa";
import TabsWithInputsComponent from "../../../../../components/TabsWithInputsComponent";
import { baseApiAuth } from "@/src/api/baseApi";
import { FaSquareCheck } from "react-icons/fa6";

const Card = ({ card, isActive, toggleLink, onDelete, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-2 rounded border ${
        card.linked ? "border-success" : isActive ? "border-primary" : ""
      } border-dashed position-relative`}
    >
      <div className="position-absolute d-flex flex-column justify-content-center gap-4 top-0 start-0 h-100 mxn-2">
        <RippleButton
          className="z-1 rounded-start-0 border-0 border-danger ribbon btn btn-danger btn-sm p-1"
          onClick={onDelete}
          title="Delete"
        >
          <FaTrash size={16} />
        </RippleButton>
        <RippleButton
          className="z-1 rounded-start-0 border-0 border-success ribbon btn btn-success btn-sm p-1"
          onClick={toggleLink}
          title="Add"
        >
          {card.linked ? <FaSquareCheck size={16} /> : <FaSquare size={16} />}
        </RippleButton>
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
  ({ nonVariants, updateVariants, onChange, cards, inputs }, ref) => {
    const [activeCard, setActiveCard] = useState(-1);
    const emptyFrm = inputs.map((input) => ({
      ...input,
      attr_value: undefined,
      attr_value_str: undefined,
      meta_datas: {
        ...input.meta_datas,
        attr_value: { ...input.meta_datas.attr_value, default: undefined },
      },
    }));

    useImperativeHandle(ref, () => ({
      getValues: () => cards,
    }));

    const handleDelete = (index) => {
      updateVariants((cards) => cards.filter((_, i) => i !== index));
    };

    const handleAddCard = (newCard) => {
      updateVariants((cards) => [newCard, ...cards]);
      setActiveCard(0);
    };

    const handleCardClick = async (index) => {
      console.log(index);
      
      if (cards[index].variant_product_attrs) {
        setActiveCard(index);
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
                  }
                : c
            )
          );
          setActiveCard(index);
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

    const updateAttrValues = (updateAttrValuesFunction) =>
      onChange((cards) => 
        cards.map((card, index) =>
          index === activeCard
            ? updateAttrValuesFunction(card, "variant_product_attrs")
            : card
        )
      )
    const toggleLink = (index) => 
      onChange((cards) => 
        cards.map((card, i) =>
          i === index
            ? {...card, linked: !card.linked}
            : card
        )
      )
    console.log('cards', cards);
    

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
              {cards.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  isActive={activeCard === index}
                  onDelete={() => handleDelete(index)}
                  toggleLink={()=>toggleLink(index)}
                  onClick={() => handleCardClick(index)}
                />
              ))}
            </div>
            {activeCard > -1 && cards[activeCard].linked ? (
              <div className="position-relative border border-dashed rounded col-9">
                <TabsWithInputsComponent
                  inputs={cards[activeCard].variant_product_attrs}
                  onChange={updateAttrValues}
                />
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
  }
);

export default VariantProductContainer;