import React, { Fragment, useState } from 'react';
import { Row, Button, Form, Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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

    const [loadingAPI, setLoadingAPI] = useState(false);
    const [notifyRegister, setnotifyRegister] = useState('');

    const onFinish = async (values) => {
        try {
            console.log('Success:', values);
            setLoadingAPI(true);
            const { status, data } = await API.post('/user/register', values);
            console.log(data);
            if (status === 201) {
                redirectLogin();
            } else {
                alert(
                    'An error occurred, please try again later or contact us at https://tuankiet.id.vn',
                );
            }
        } catch (e) {
            const notify = 'Email or Username already exists...!';
            setLoadingAPI(false);
            setnotifyRegister(notify);
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

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 32,
            }}
            spin
        />
    );

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
            {loadingAPI && (
                <div style={{ margin: '0 auto' }}>
                    <Spin indicator={antIcon} />
                </div>
            )}
            {!loadingAPI && (
                <Fragment>
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
                    {notifyRegister && (
                        <p
                            style={{
                                margin: 0,
                                fontSize: '16px',
                                color: 'red',
                            }}
                        >
                            {notifyRegister}
                        </p>
                    )}
                </Fragment>
            )}
        </Row>
    );
}
