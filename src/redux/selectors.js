export const todoListSelector = (state) => {
    const todoRemaining = state.todoList.filter((todo) => {
        return todo.name.includes(state.filters.search);
    });
    return todoRemaining;
};

export const searchTextSelector = (state) => state.filters.search;
