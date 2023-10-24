import { Col, Row, Input, Button, Select, Tag, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { todosRemainingSelector } from '../../redux/selectors';
import { addNewTodo, fetchTodos } from './TodoListSlice';

export default function TodoList() {
    const [todoName, setTodoName] = useState('');
    const [priority, setPriority] = useState('Medium');

    const todoList = useSelector(todosRemainingSelector);

    const [loadingTodoList, setLoadingTodoList] = useState(false);
    const fetchTodosState = useSelector((state) => state.todoList.status);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (fetchTodosState === 'loading') {
            setLoadingTodoList(true);
        } else {
            setLoadingTodoList(false);
        }
        // setLoadingTodoList(true);
    }, [fetchTodosState]);

    const handleAddTodoList = () => {
        // dispatch(
        //     todoListSlice.actions.addTodo({
        //         id: uuidv4(),
        //         name: todoName,
        //         priority: priority,
        //         completed: false,
        //     }),
        // );
        dispatch(
            addNewTodo({
                id: uuidv4(),
                name: todoName,
                priority: priority,
                completed: false,
            }),
        );

        // clear input todo name value
        setTodoName('');
    };

    const handleInputChange = (e) => {
        setTodoName(e.target.value);
    };

    const handlePriorityChange = (value) => {
        setPriority(value);
    };

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 28,
            }}
            spin
        />
    );

    return (
        <Row style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
            {loadingTodoList && (
                <div style={{ margin: '0 auto' }}>
                    <Spin indicator={antIcon} />
                </div>
            )}
            {!loadingTodoList && (
                <Col
                    span={24}
                    style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}
                >
                    {todoList.map((todo) => (
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            name={todo.name}
                            prioriry={todo.priority}
                            completed={todo.completed}
                        />
                    ))}
                </Col>
            )}
            {!loadingTodoList && (
                <Col span={24}>
                    <Input.Group style={{ display: 'flex' }} compact>
                        <Input
                            value={todoName}
                            onChange={handleInputChange}
                            onPressEnter={handleAddTodoList}
                        />
                        <Select
                            defaultValue="Medium"
                            value={priority}
                            onChange={handlePriorityChange}
                        >
                            <Select.Option value="High" label="High">
                                <Tag color="red">High</Tag>
                            </Select.Option>
                            <Select.Option value="Medium" label="Medium">
                                <Tag color="blue">Medium</Tag>
                            </Select.Option>
                            <Select.Option value="Low" label="Low">
                                <Tag color="gray">Low</Tag>
                            </Select.Option>
                        </Select>
                        <Button
                            type="primary"
                            onClick={handleAddTodoList}
                            disabled={!todoName.trim()}
                        >
                            Add
                        </Button>
                    </Input.Group>
                </Col>
            )}
        </Row>
    );
}
