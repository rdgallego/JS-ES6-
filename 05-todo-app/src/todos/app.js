import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderPending, renderTodos } from '../usecases';
import { Filters } from '../store/todo.store';

const elementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    FiltersLis: '.filtro',
    PendingCount: '#pending-count'
}

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(elementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(elementIDs.PendingCount);
    }
    (() =>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })()

    const newDescriptionInput = document.querySelector(elementIDs.NewTodoInput);
    const todoListUl = document.querySelector(elementIDs.TodoList)
    const clearCompletedButton = document.querySelector(elementIDs.ClearCompleted)
    const filtersLis = document.querySelectorAll(elementIDs.FiltersLis);

    newDescriptionInput.addEventListener('keyup', (event) => {
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0) return;
        todoStore.addTodo(event.target.value.trim());
        displayTodos();
        event.target.value = '';
    })

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    })

    todoListUl.addEventListener('click', (event) => {
        if(!event.target.classList.contains('destroy')) return;
        const element = event.target.closest('[data-id]');
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    })

    clearCompletedButton.addEventListener('click', (_event) => {
        todoStore.deleteCompleted();
        displayTodos();
    })

    filtersLis.forEach((element) => {
        element.addEventListener('click' ,(event) => {
            filtersLis.forEach((element) => {
                element.classList.remove('selected');
            })
            event.target.classList.add('selected');
            switch(event.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completed':
                    todoStore.setFilter(Filters.Completed);
                    break;
            }
            displayTodos();
        })
    })
}