// Giá trị mặc định trong store
const initState = {
    search: '',
    status: 'All',
    priority: [],
};

const filtersReducer = (state = initState, action) => {
    /*
        {
            type: 'todoList/addTodo',
            payload: { id: 9, name: 'Write CV', completed: false, priority: 'Medium'}
        },
        }
    */
    switch (action.type) {
        case 'filters/searchFilterChange':
            return {
                ...state,
                search: action.payload,
            };

        default:
            return state;
    }
};

export default filtersReducer;
