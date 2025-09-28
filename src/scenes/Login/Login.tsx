import { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, message, Card } from 'antd';
import {
    MailOutlined,
    LockOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: { email: string; password: string }) => {
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        });

        setLoading(false);

        if (error) {
            message.error(error.message);
        } else if (data?.session) {
            message.success('Logged in successfully!');
            navigate('/dashboard');
        } else {
            message.error('Login succeeded but no session returned.');
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                background:
                    'linear-gradient(to bottom right, #ebf8ff, #ffffff, #f0fdfa)',
                margin: 0,
            }}
        >
            <Card
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    border: 'none',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(6px)',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div
                        style={{
                            width: '64px',
                            height: '64px',
                            background:
                                'linear-gradient(to bottom right, #2563eb, #0d9488)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                        }}
                    >
                        <img
                            src="/bus-central.svg"
                            alt="Bus Central Logo"
                            style={{ width: '3rem', height: '3rem' }}
                        />
                    </div>
                    <Title
                        level={3}
                        style={{
                            marginTop: '12px',
                            marginBottom: 0,
                            color: '#111827',
                        }}
                    >
                        Central Bus PH
                    </Title>
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                        Management System
                    </Text>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h2
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#1f2937',
                        }}
                    >
                        Welcome back
                    </h2>
                    <p style={{ fontSize: '13px', color: '#6b7280' }}>
                        Please sign in to your account
                    </p>
                </div>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Email or Username"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email',
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <MailOutlined style={{ color: '#9ca3af' }} />
                            }
                            type="email"
                            placeholder="Enter your email"
                            style={{ height: '48px', background: '#f9fafb' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined style={{ color: '#9ca3af' }} />
                            }
                            placeholder="Enter your password"
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeTwoTone />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                            style={{ height: '48px', background: '#f9fafb' }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{
                                width: '100%',
                                height: '48px',
                                background:
                                    'linear-gradient(to right, #2563eb, #0d9488)',
                                border: 'none',
                                fontWeight: 500,
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </Form.Item>
                </Form>

                <div
                    style={{
                        textAlign: 'center',
                        marginTop: '16px',
                        paddingTop: '12px',
                        borderTop: '1px solid #e5e7eb',
                    }}
                >
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>
                        Need help? Contact your system administrator
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Login;
