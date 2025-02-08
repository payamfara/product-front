import React, { useState } from "react";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    useSortable,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableMultiLineList2 = ({ items, setItems, render }) => {
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((prevItems) => {
                const oldIndex = prevItems.findIndex((item) => item._id === active.id);
                const newIndex = prevItems.findIndex((item) => item._id === over.id);
                const updatedItems = arrayMove(prevItems, oldIndex, newIndex);
                return updatedItems.map((item, index) => ({
                    ...item,
                    order: index + 1,
                }));
            });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map((item) => item._id)}
                strategy={horizontalListSortingStrategy}
            >
                {items.map((item, index) => (
                    <SortableItem key={item._id} index={item._id} item={item} render={render} />
                ))}
            </SortableContext>
        </DndContext>
    );
};



const SortableItem = ({ item, render }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return render(item, {
        ref: setNodeRef,
        style,
        ...attributes,
        ...listeners,
    });
};

export default DraggableMultiLineList2;
