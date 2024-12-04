import RippleButton from '@/src/components/RippleButton/RippleButton';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import TabsWithInputsComponet from '../../../../../components/TabsWithInputsComponent';
import { baseApiAuth } from '@/src/api/baseApi';
const Card = ({ productUrl, form, isActive, onDelete, onShowModal }) => {
    return (
        <div className={`p-2 rounded border ${isActive ? 'border-primary' : ''} border-dashed position-relative`}>
            <div className='position-absolute d-flex flex-column justify-content-center gap-4 top-0 start-0 h-100 mxn-2'>
                <RippleButton
                    className="z-1 rounded-start-0 border-0 border-danger ribbon btn btn-danger btn-sm p-1"
                    onClick={() => onDelete()}
                    title="Delete"
                >
                    <FaTrash size={16} />
                </RippleButton>
            </div>
            <div className={`card shadow-lg h-100 overflow-hidden`}>
                <div class="card-img card-body p-0">
                    <img className='card-img' src={form.images ? form.images[0] : "/images/default-product.png"} alt="" />
                </div>
                <div class="card-footer p-0">
                    <p className='card-text'><small className="d-block lh-2 py-1 px-2 m-0 text-truncate">{form.part_number_en}</small></p>
                </div>
            </div>
        </div>
    );
};

const PlusButton = ({ onShowModal }) => {
    return (
        <div className="card shadow-sm p-2">
            <div
                className="border border-primary border-dashed rounded  h-100"
                style={{ height: '1rem' }}
                onClick={onShowModal}
            >
                <button className="w-100 h-100 btn text-primary">
                    <i className="fs-4 fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    );
};

const VariantProductContainer = ({ forms, inputs }) => {
    const [cards, setCards] = useState(forms);
    const [activeCard, setActiveCard] = useState(null); 

    const handleDelete = (index) => {
        setCards(cards.filter((_, i) => i !== index));
    };

    const handleShowModal = () => {
        console.log('Show modal triggered');
    };

    const handleAddCard = (newForm) => {
        setCards([...cards, newForm]);
    };

    const handleCardClick = (card) => {
        setActiveCard(card);
        const requestUrl = `/product/${cart.id}`
        baseApiAuth.get(requestUrl)
            .then((res) => {
                setCards({
                    ...res.data,
                    non_variant_product_attrs: [...res.data['non_variant_product_attrs'], ...res.data['non_variant_extra_attrs']],
                    variant_product_attrs: [...res.data['variant_product_attrs'], ...res.data['variant_extra_attrs']]
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching tags:', err);
                setLoading(false);
            })
    };

    return (
        <div className="row">
            <div className="col-3 d-flex flex-column gap-3">
                {cards.map((form, index) => (
                    <Card
                       key={form.id}
                       productUrl={form}
                       form={form}
                       isActive={activeCard?.id === form.id}
                       onDelete={() => handleDelete(index)}
                       onClick={() => handleCardClick(form)}
                    />
                ))}
                <PlusButton onShowModal={handleShowModal} />
            </div>
            <div className="border border-dashed rounded col-9">
                <TabsWithInputsComponet inputs={inputs} />
            </div>
        </div>
    );
};

export default VariantProductContainer;
