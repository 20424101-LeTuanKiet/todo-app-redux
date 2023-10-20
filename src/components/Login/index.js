import React, { useEffect } from 'react';
import { Row, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/XMLHttpRequests';

export default function Index() {
    const navigate = useNavigate();

    const redirect = (path) => {
        navigate(path);
    };

    const redirectRegister = () => {
        redirect('/register');
    };

    const redirectHome = () => {
        redirect('/');
    };

    useEffect(() => {
        console.log('auth');
        if (JSON.parse(localStorage.getItem('auth_authenticated')) === true) {
            redirectHome();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const { status, data } = await API.post('/auth', values);
            console.log({ status, data });
            localStorage.auth_authenticated = data.authenticated;
            localStorage.auth_accessToken = data.accessToken;
            localStorage.auth_refreshToken = data.refreshToken;
            redirectHome();
        } catch (e) {
            // login fail...!
            console.log(e.response);
            const { status, data } = e.response;
            console.log({ status, data });
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <h1 style={{ marginBottom: '30px' }}>SIGN IN</h1>
            <Form
                name="login"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                {/* <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

                <div style={{ display: 'flex' }}>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <Button
                        style={{ marginLeft: '2.2rem' }}
                        type="dashed"
                        onClick={redirectRegister}
                    >
                        Sign up
                    </Button>
                </div>
            </Form>
        </Row>
    );
}
