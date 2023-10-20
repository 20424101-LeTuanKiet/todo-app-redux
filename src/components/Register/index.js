import React from 'react';
import { Row, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as API from '../../utils/XMLHttpRequests';

export default function Index() {
    const navigate = useNavigate();

    const redirect = (path) => {
        navigate(path);
    };

    const redirectLogin = () => {
        redirect('/login');
    };

    const onFinish = async (values) => {
        console.log('Success:', values);
        const { status, data } = await API.post('/user/register', values);
        console.log(data);
        if (status === 201) {
            redirectLogin();
        } else {
            alert(
                'An error occurred, please try again later or contact us at https://tuankiet.id.vn',
            );
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
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
            <h1 style={{ marginBottom: '30px' }}>SIGN UP</h1>
            <Form
                name="register"
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
                validateMessages={validateMessages}
                autoComplete="off"
            >
                <Form.Item
                    name={['email']}
                    label="Email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

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
                        onClick={redirectLogin}
                    >
                        Sign in
                    </Button>
                </div>
            </Form>
        </Row>
    );
}
