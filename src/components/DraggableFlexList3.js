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

const DraggableMultiLineList = () => {

    const [items, setItems] = useState([
        { id: "1", content: "Item 1" },
        { id: "2", content: "Item 2" },
        { id: "3", content: "Item 3" },
        { id: "4", content: "Item 4" },
        { id: "5", content: "Item 5" },
        { id: "6", content: "Item 6" },
        { id: "7", content: "Item 7" },
        { id: "8", content: "Item 8" },
        { id: "9", content: "Item 9" },
        { id: "10", content: "Item 10" },
    ]);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((prevItems) => {
                const oldIndex = prevItems.findIndex((item) => item.id === active.id);
                const newIndex = prevItems.findIndex((item) => item.id === over.id);
                return arrayMove(prevItems, oldIndex, newIndex);
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
                items={items}
                strategy={horizontalListSortingStrategy}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        padding: "10px",
                        background: "#f0f0f0",
                    }}
                >
                    {items.map((item) => (
                        <SortableItem key={item.id} id={item.id}>
                            {item.content}
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

const SortableItem = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "10px 20px",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "5px",
        cursor: "grab",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
};

export default DraggableMultiLineList;
