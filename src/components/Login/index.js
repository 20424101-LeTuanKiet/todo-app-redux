import React, { Fragment, useEffect, useState } from 'react';
import { Row, Button, Form, Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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

    const [loadingAPI, setLoadingAPI] = useState(false);
    const [notifyLogin, setNotifyLogin] = useState('');

    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            setLoadingAPI(true);
            setNotifyLogin('');
            const { status, data } = await API.post('/auth', values);
            console.log({ status, data });
            localStorage.auth_authenticated = data.authenticated;
            localStorage.auth_accessToken = data.accessToken;
            localStorage.auth_refreshToken = data.refreshToken;
            setLoadingAPI(false);
            redirectHome();
        } catch (e) {
            // login fail...!
            // console.log(e.response);
            setLoadingAPI(false);
            const { status, data } = e.response;
            console.log({ status, data });
            if (status === 401) {
                const notify = 'Username or password is incorrect...!';
                setNotifyLogin(notify);
            }
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                    {notifyLogin && (
                        <p
                            style={{
                                margin: 0,
                                fontSize: '16px',
                                color: 'red',
                            }}
                        >
                            {notifyLogin}
                        </p>
                    )}
                </Fragment>
            )}
        </Row>
    );
}
