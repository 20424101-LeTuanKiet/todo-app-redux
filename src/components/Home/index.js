import React from 'react';
import { Typography, Divider, Row, Col, Button } from 'antd';
import TodoList from '../TodoList';
import Filters from '../Filters';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

export default function Home() {
    const navigate = useNavigate();

    const redirect = (path) => {
        navigate(path);
    };

    const redirectRegister = () => {
        localStorage.clear();
        redirect('/login');
    };

    return (
        <Row
            style={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Col
                xs={22}
                sm={16}
                md={12}
                lg={10}
                style={{
                    width: '100%',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    padding: 20,
                    boxShadow: '0 0 10px 4px #bfbfbf',
                    borderRadius: 5,
                    height: '85vh',
                }}
            >
                <Button
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                    }}
                    type="dashed"
                    onClick={redirectRegister}
                >
                    Logout
                </Button>
                <Title style={{ textAlign: 'center', margin: 0 }}>
                    TODO APP
                </Title>
                <Filters />
                <Divider style={{ margin: '10px 0' }} />
                <h3 style={{ marginTop: 0 }}>TODO LIST</h3>
                <TodoList />
            </Col>
        </Row>
    );
}
