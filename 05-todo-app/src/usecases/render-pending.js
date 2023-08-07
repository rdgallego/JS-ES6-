import todoStore, { Filters } from "../store/todo.store";

let element;

export const renderPending = (elementId) => {
    if(!element)
        element = document.querySelector(elementId);

    element.innerHTML = todoStore.getTodos(Filters.Pending).length;
}