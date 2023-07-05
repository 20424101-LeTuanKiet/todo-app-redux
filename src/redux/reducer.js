// Giá trị mặc định trong store
const initState = {
    filters: {
        search: '',
        status: 'All',
        priority: [],
    },
    todoList: [
        {
            id: 1,
            name: 'Learn Personal Trainer',
            completed: false,
            priority: 'High',
        },
        {
            id: 2,
            name: 'Lunch',
            completed: true,
            priority: 'Low',
        },
        {
            id: 3,
            name: 'Find job',
            completed: false,
            priority: 'Medium',
        },
    ],
};

const rootReducer = (state = initState, action) => {
    /*
        {
            type: 'todoList/addTodo',
            payload: { id: 9, name: 'Write CV', completed: false, priority: 'Medium'}
        },
        }
    */
    switch (action.type) {
        case 'todoList/addTodo':
            return {
                ...state,
                todoList: [...state.todoList, { id: 9, name: 'Write CV', completed: false, priority: 'Medium' }],
            };

        default:
            return state;
    }
};

export default rootReducer;
