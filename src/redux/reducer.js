import { combineReducers } from 'redux';

import filtersReducer from '../components/Filters/FiltersSlice';
import todoListReducer from '../components/TodoList/TodoListSlice';

// Giá trị mặc định trong store
// const initState = {};
// const rootReducer = (state = initState, action) => {
//     /*
//         {
//             type: 'todoList/addTodo',
//             payload: { id: 9, name: 'Write CV', completed: false, priority: 'Medium'}
//         },
//         }
//     */
//     return {
//         filters: filtersReducer(state.filters, action),
//         todoList: todoListReducer(state.todoList, action),
//     };
// };
const rootReducer = combineReducers({
    filters: filtersReducer,
    todoList: todoListReducer,
});

export default rootReducer;
