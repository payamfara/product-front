import React, {useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import RippleButton from "./RippleButton/RippleButton";

const DraggableFlexList = ({items, setItems}) => {

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        setItems((prevItems) => {
            const newItems = [...prevItems];
            const [reorderedItem] = newItems.splice(result.source.index, 1);
            newItems.splice(result.destination.index, 0, reorderedItem);
            return newItems
        });
    };

    console.log('items', items)
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
                droppableId="items"
                direction="horizontal"
            >
                {(provided) => (
                    <div
                        className="d-flex gap-2"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {items.map((item, index) => (
                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                {(provided) => (
                                    <div ref={provided.innerRef}
                                         {...provided.draggableProps}
                                         {...provided.dragHandleProps}
                                         className="btn-group"
                                         style={{
                                             userSelect: "none",
                                             ...provided.draggableProps.style,
                                         }}>
                                        <RippleButton className={'pe-none p-1 btn btn-sm btn-label-primary'}>
                                            {item.title_fa}
                                        </RippleButton>
                                        <RippleButton className="pe-none p-1 btn btn-sm btn-label-primary">
                                            {item.order}
                                        </RippleButton>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DraggableFlexList;
