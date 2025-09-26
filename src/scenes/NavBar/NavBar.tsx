import {
    Avatar,
    Badge,
    Button,
    Dropdown,
    Layout,
    Skeleton,
    theme,
    type MenuProps,
} from 'antd';
import { useEffect } from 'react';
import {
    BellOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { supabase } from '../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from '../../store/useUserStore';

import '../../styles/BusStyle.css';

const { Header } = Layout;

const NavBar = ({
    collapsed,
    setCollapsed,
}: {
    collapsed: boolean;
    setCollapsed: (val: boolean) => void;
}) => {
    const { userInfo, fetchUser, loading } = useUserStore();
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        fetchUser();

        const { data: subscription } = supabase.auth.onAuthStateChange(() => {
            fetchUser();
        });

        return () => {
            subscription?.subscription.unsubscribe();
        };
    }, [fetchUser]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const items: MenuProps['items'] = [
        {
            label: 'Profile',
            key: 'profile',
        },
        {
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLogout}
                >
                    Logout
                </a>
            ),
            key: 'logout',
        },
    ];

    return (
        <>
            <Header
                style={{
                    background: colorBgContainer,
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '0 1rem 0 0',
                    boxShadow: '0 2px 8px #f0f1f2',
                }}
            >
                <div>
                    <Button
                        className="custom-btn"
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Badge
                        count={5}
                        size="default"
                        style={{ cursor: 'pointer' }}
                    >
                        <BellOutlined
                            style={{ fontSize: '1.3rem', cursor: 'pointer' }}
                        />
                    </Badge>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                cursor: 'pointer',
                            }}
                        >
                            <Avatar
                                shape="circle"
                                style={{
                                    backgroundColor: '#1677ff',
                                    marginLeft: 8,
                                }}
                                icon={<UserOutlined />}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    lineHeight: 1.1,
                                }}
                            >
                                {loading ? (
                                    <>
                                        <Skeleton.Input
                                            active
                                            size="small"
                                            style={{
                                                width: 155,
                                                marginBottom: 4,
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <span style={{ fontWeight: 600 }}>
                                            {userInfo?.full_name}
                                        </span>
                                        <span
                                            style={{
                                                color: 'rgba(0,0,0,0.45)',
                                                fontSize: 12,
                                            }}
                                        >
                                            {userInfo?.email}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </Dropdown>
                </div>
            </Header>
        </>
    );
};

export default NavBar;
