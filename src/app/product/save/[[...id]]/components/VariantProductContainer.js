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

const Card = ({ form, isWith, isActive, toggleWith, onDelete, onClick }) => {
  
  return (
    <div
      onClick={onClick}
      className={`p-2 rounded border ${
        isWith ? "border-success" : isActive ? "border-primary" : ""
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
        <RippleButton
          className="z-1 rounded-start-0 border-0 border-success ribbon btn btn-success btn-sm p-1"
          onClick={()=>toggleWith(isWith)}
          title="Add"
        >
          {isWith ? <FaSquareCheck size={16} /> : <FaSquare size={16} />}
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

const VariantProductContainer = forwardRef(({ nonVariants, forms, inputs }, ref) => {
  const [withItems, setWithItems] = useState([]);
  const tabsWithInputsRef = useRef(null);
  const [cards, setCards] = useState(forms);
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
    getWithItems: () => withItems,
  }));

  const handleDelete = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleAddCard = (newForm) => {
    setCards([newForm, ...cards]);
    setActiveCard(0);
  };

  const updatePreviousCard = () => {
    if (!tabsWithInputsRef.current) return;
    if (activeCard < 0) return;
    const updatedFrm = tabsWithInputsRef.current.getValues();
    setCards((cards) => {
      const items = cards.map((card, index) => {
        return activeCard === index
          ? { ...cards[activeCard], variant_product_attrs: updatedFrm }
          : card;
      });
      return items;
    });
  };

  const handleCardClick = async (index) => {
    updatePreviousCard();

    if (cards[index].variant_product_attrs) {
      setActiveCard(index);
      return;
    }

    const requestUrl = `/api2/product/${cards[index].id}`;
    baseApiAuth
      .get(requestUrl)
      .then((res) => {
        const updatedCard = {
          ...cards[index],
          variant_product_attrs: [
            ...res.data.variant_product_attrs,
            ...res.data.variant_extra_attrs,
          ],
        };
        setCards((cards) =>
          cards.map((c, i) => (i === index ? updatedCard : c))
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
                isActive={activeCard === index}
                isWith={withItems.includes(index)}
                onDelete={() => handleDelete(index)}
                toggleWith={(isWith) =>
                  isWith
                    ? setWithItems(
                        withItems.filter((withItem) => withItem != index)
                      )
                    : setWithItems((withItems) => [...withItems, index])
                }
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
          {activeCard > -1 && withItems.includes(activeCard) ? (
            <div className="position-relative border border-dashed rounded col-9">
              <TabsWithInputsComponent
                ref={tabsWithInputsRef}
                inputs={cards[activeCard].variant_product_attrs}
              />
            </div>
          ) : Object.keys(nonVariants).length ? (
            <div className="bg-secondary-subtle border border-dashed rounded col-9">
              <div className="h-100 d-flex flex-column gap-1 justify-content-center align-items-center fs-5">
                <div className="opacity-70">فرم ویژگی ها</div>
                <div className="opacity-100 text-danger fs-6">
                  (ابتدا فرم <span className="border-bottom border-danger pb-1">ویژگی های عادی</span> را سیو کنید)
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-dashed rounded col-9">
              <div className="h-100 d-flex flex-column gap-1 justify-content-center align-items-center fs-5">
                <div className="opacity-70">فرم ویژگی ها</div>
                <div className="text-danger fs-6">
                  (روی <span className="border-bottom border-danger pb-1">کارت ها</span> کلیک کنید)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default VariantProductContainer;
