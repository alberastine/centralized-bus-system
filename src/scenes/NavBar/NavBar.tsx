import { Avatar, Dropdown, Layout, theme, type MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { supabase } from '../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const NavBar = () => {
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
                    justifyContent: 'flex-end',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '0 1rem',
                }}
            >
                <Dropdown menu={{ items }} trigger={['click']}>
                    <Avatar shape="circle" icon={<UserOutlined />} />
                </Dropdown>
            </Header>
        </>
    );
};

export default NavBar;
