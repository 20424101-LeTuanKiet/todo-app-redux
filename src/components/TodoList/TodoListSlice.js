import { createSlice } from '@reduxjs/toolkit';

const setItemLocalStorage = (todoList) => {
    const data = JSON.stringify(todoList);
    try {
        localStorage.setItem('todoList', data);
    } catch {
        alert('Trình duyệt không hỗ trợ! Vui lòng chọn trình duyệt khác.');
    }
};

const getItemLocalStorage = () => {
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    // console.log(todoList);
    return todoList;
};

export default createSlice({
    name: 'todoList',
    initialState: () => {
        const getItem = getItemLocalStorage();
        return getItem ? getItem : [];
    },
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
            setItemLocalStorage(state);
        },
        toggleTodoStatus: (state, action) => {
            const currentTodo = state.find(
                (todo) => todo.id === action.payload,
            );
            if (currentTodo) {
                currentTodo.completed = !currentTodo.completed;
                setItemLocalStorage(state);
            }
        },
    },
});
