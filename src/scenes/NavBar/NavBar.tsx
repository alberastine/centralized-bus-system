import { Avatar, Button, Dropdown, Layout, theme, type MenuProps } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { supabase } from '../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

import '../../styles/BusStyle.css';

const { Header } = Layout;

const NavBar = ({
    collapsed,
    setCollapsed,
}: {
    collapsed: boolean;
    setCollapsed: (val: boolean) => void;
}) => {
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
                <Dropdown menu={{ items }} trigger={['click']}>
                    <Avatar shape="circle" icon={<UserOutlined />} />
                </Dropdown>
            </Header>
        </>
    );
};

export default NavBar;
