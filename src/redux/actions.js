// export const addTodoAction = {
//     type: 'todoList/addTodo',
//     payload: { id: 9, name: 'Write CV', completed: false, priority: 'Medium' },
// };

export const addTodo = (data) => {
    return {
        type: 'todoList/addTodo',
        payload: data,
    };
};
