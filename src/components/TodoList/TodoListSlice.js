import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/XMLHttpRequests';

// const setItemLocalStorage = (todoList) => {
//     const data = JSON.stringify(todoList);
//     try {
//         localStorage.setItem('todoList', data);
//     } catch {
//         alert('Trình duyệt không hỗ trợ! Vui lòng chọn trình duyệt khác.');
//     }
// };

// const getItemLocalStorage = () => {
//     let data = JSON.parse(localStorage.getItem('todoList'));
//     // API.defaults.headers.common['x-access-token'] =
//     //     localStorage.getItem('auth_accessToken');
//     // console.log(localStorage.getItem('auth_accessToken'));
//     // let { data } = await API.get('/todos', {});
//     // console.log(data);
//     return data;
// };

const todosSlice = createSlice({
    name: 'todoList',
    initialState: { status: 'idle', todos: [] },
    // reducers: {
    //     addTodo: (state, action) => {
    //         state.todos.push(action.payload);
    //         setItemLocalStorage(state);
    //     },
    //     toggleTodoStatus: (state, action) => {
    //         const currentTodo = state.find(
    //             (todo) => todo.id === action.payload,
    //         );
    //         if (currentTodo) {
    //             currentTodo.completed = !currentTodo.completed;
    //             setItemLocalStorage(state);
    //         }
    //     },
    // },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.status = 'idle';
            })
            .addCase(addNewTodo.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
                state.status = 'idle';
            })
            .addCase(completeTodo.pending, (state, action) => {
                state.status = 'loading_complete';
            })
            .addCase(completeTodo.fulfilled, (state, action) => {
                // let currentTodo = state.todos.find(
                //     (todo) => todo.i === action.payload,
                // );
                // currentTodo = action.payload;
                state.status = 'idle';
            });
    },
});

// export function addTodos(todo) {
//     return function addTodosThunk(dispatch, getState) {
//         console.log('[addThuk]', getState());
//         console.log({ todo });
//         dispatch(todosSlice.actions.addTodo(todo));
//     };
// }

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    try {
        API.defaults.headers.common['x-access-token'] =
            localStorage.getItem('auth_accessToken');

        // console.log(localStorage.getItem('auth_accessToken'));
        const res = await API.get('/todos', {});
        const { data } = res;
        // console.log(data);
        return data;
    } catch (e) {
        try {
            //Xin cap lai token
            const accessToken = localStorage.getItem('auth_accessToken');
            const refreshToken = localStorage.getItem('auth_refreshToken');

            const resToken = await API.post('/auth/refresh', {
                accessToken,
                refreshToken,
            });
            const access_Token = resToken.data.accessToken;
            localStorage.setItem('auth_accessToken', access_Token);
        } catch (e) {
            localStorage.clear();
            window.location.href = '/';
        }

        //RECALL FETCH API
        API.defaults.headers.common['x-access-token'] =
            localStorage.getItem('auth_accessToken');

        // console.log(localStorage.getItem('auth_accessToken'));
        const res = await API.get('/todos', {});
        const { data } = res;
        // console.log(data);
        return data;
    }
});

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async (newTodo) => {
        try {
            API.defaults.headers.common['x-access-token'] =
                localStorage.getItem('auth_accessToken');
            const body = newTodo;
            const { data } = await API.post('/todos', body);
            return data;
        } catch (e) {
            try {
                //Xin cap lai token
                const accessToken = localStorage.getItem('auth_accessToken');
                const refreshToken = localStorage.getItem('auth_refreshToken');

                const resToken = await API.post('/auth/refresh', {
                    accessToken,
                    refreshToken,
                });
                const access_Token = resToken.data.accessToken;
                localStorage.setItem('auth_accessToken', access_Token);
            } catch (e) {
                localStorage.clear();
                window.location.href = '/';
            }

            API.defaults.headers.common['x-access-token'] =
                localStorage.getItem('auth_accessToken');
            const body = newTodo;
            const { data } = await API.post('/todos', body);
            return data;
        }
    },
);

export const completeTodo = createAsyncThunk(
    'todos/completeTodo',
    async ({ id, value }) => {
        try {
            // console.log(value);
            API.defaults.headers.common['x-access-token'] =
                localStorage.getItem('auth_accessToken');
            const { data } = await API.put(
                `/todos/completed/${id}/${value}`,
                {},
            );
            console.log(data);
            return id;
        } catch (e) {
            try {
                //Xin cap lai token
                const accessToken = localStorage.getItem('auth_accessToken');
                const refreshToken = localStorage.getItem('auth_refreshToken');

                const resToken = await API.post('/auth/refresh', {
                    accessToken,
                    refreshToken,
                });
                const access_Token = resToken.data.accessToken;
                localStorage.setItem('auth_accessToken', access_Token);
            } catch (e) {
                localStorage.clear();
                window.location.href = '/';
            }

            API.defaults.headers.common['x-access-token'] =
                localStorage.getItem('auth_accessToken');
            const { data } = await API.put(
                `/todos/completed/${id}/${value}`,
                {},
            );
            console.log(data);
            return id;
        }
    },
);

export default todosSlice;
