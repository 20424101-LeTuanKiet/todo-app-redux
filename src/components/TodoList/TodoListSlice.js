// Giá trị mặc định trong store
const initState = [
    // {
    //     id: 1,
    //     name: 'Learn Personal Trainer',
    //     completed: false,
    //     priority: 'High',
    // },
    // {
    //     id: 2,
    //     name: 'Lunch',
    //     completed: true,
    //     priority: 'Low',
    // },
    // {
    //     id: 3,
    //     name: 'Find job',
    //     completed: false,
    //     priority: 'Medium',
    // },
];

const todoListReducer = (state = initState, action) => {
    /*
        {
            type: 'todoList/addTodo',
            payload: { id: 9, name: 'Write CV', completed: false, priority: 'Medium'}
        },
        }
    */
    switch (action.type) {
        case 'todoList/addTodo':
            return [...state, action.payload];

        case 'todoList/toggleTodoStatus':
            console.log('toggleTodoStatus');
            return state.map((todo) =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo,
            );

        default:
            return state;
    }
};

export default todoListReducer;
