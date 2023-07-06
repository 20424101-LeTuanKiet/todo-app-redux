import { Typography, Divider, Row, Col } from 'antd';
import './App.css';

import TodoList from './components/TodoList';
import Filters from './components/Filters';

const { Title } = Typography;

function App() {
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

export default App;
