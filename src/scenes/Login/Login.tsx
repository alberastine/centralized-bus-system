import { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, message, Card } from 'antd';

const { Title } = Typography;

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
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card
                style={{
                    width: 360,
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Title level={3}>Admin Login</Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true }]}
                    >
                        <Input type="email" placeholder="admin@example.com" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true }]}
                    >
                        <Input.Password placeholder="••••••••" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
