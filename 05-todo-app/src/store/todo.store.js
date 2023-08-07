import { Todo } from "../models/todo.model";
export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}
const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
    ],
    filter: Filters.All
}

const initStore = () => {
    loadStore();
}

const getTodos = (filter = Filters.All) => {
    switch(filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error('Filtro no permitido')
    }
}


const loadStore = () => {
    if(!localStorage.getItem('state')) return;
    const {todos, filter} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorate = () => {
    localStorage.setItem('state', JSON.stringify(state))
}

const addTodo = (description) => {
    if(!description){
        throw new Error('Descripcion requerida');
    } else {
        state.todos.push(new Todo(description));
        saveStateToLocalStorate();
    }
}

const toggleTodo = (todoId) => {
    state.todo = state.todos.map(todo => {
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    })
    saveStateToLocalStorate();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorate();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorate();
}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorate();
}

const getCurrentFilter = () => {
    return state.filter.toString();
}



export default {
    initStore,
    getTodos,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter
}