import React, { useState } from 'react';

const Card = ({ productUrl, form, onDelete, onShowModal }) => {
  const isActive = productUrl === window.location.pathname;

  return (
    <div className="p-2" data-url={productUrl}>
      <div className={`card shadow-sm h-100 ${isActive ? 'border border-primary' : ''}`}>
        <button
          className="z-3 btn btn-danger btn-sm position-absolute top-0 end-0 m-2 delete-card"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <i className="fas fa-trash"></i>
        </button>
        <div className="card-body" onClick={onShowModal}>
          {form}
        </div>
      </div>
    </div>
  );
};

const PlusButton = ({ onShowModal }) => {
  return (
    <div className="p-2">
      <div
        className="card shadow-sm h-100 p-2"
        style={{ minHeight: '10rem' }}
        onClick={onShowModal}
      >
        <button className="w-100 h-100 btn border-primary text-primary border-dashed">
          <i className="fs-4 fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

const CardContainer = ({ forms }) => {
  const [cards, setCards] = useState(forms);

  const handleDelete = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleShowModal = () => {
    console.log('Show modal triggered');
  };

  const handleAddCard = (newForm) => {
    setCards([...cards, newForm]);
  };

  return (
    <div id="variant_attrs_items">
      {cards.map((form, index) => (
        <Card
          key={index}
          productUrl={form[0]}
          form={form[1]}
          onDelete={() => handleDelete(index)}
          onShowModal={handleShowModal}
        />
      ))}
      <PlusButton onShowModal={handleShowModal} />
    </div>
  );
};

export default CardContainer;
