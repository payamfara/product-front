import { createRoot } from "react-dom/client"; 

export const replaceComponent = (container, component) => {
    const customContainer = document.querySelector(container);
    const root = createRoot(customContainer);
    root.render(component);
}