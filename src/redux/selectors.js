import { createSelector } from 'reselect';

export const searchTextSelector = (state) => state.filters.search;
export const filterStatusSelector = (state) => state.filters.status;
export const todoListSelector = (state) => state.todoList;

// export const todoListSelector = (state) => {
//     const todoRemaining = state.todoList.filter((todo) => {
//         return todo.name.includes(state.filters.search);
//     });
//     return todoRemaining;
// };

export const todosRemainingSelector = createSelector(
    todoListSelector,
    filterStatusSelector,
    searchTextSelector,
    (todoList, status, searchText) => {
        if (status === 'All') {
            return todoList.filter((todo) => {
                return todo.name.includes(searchText);
            });
        }
        return todoList.filter((todo) => {
            return todo.name.includes(searchText) && (status === 'Completed' ? todo.completed : !todo.completed);
        });
    },
);
