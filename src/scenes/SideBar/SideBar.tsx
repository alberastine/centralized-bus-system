import { Layout, Menu, type MenuProps } from 'antd';
import { useEffect, useState } from 'react';

//icons
import { AiFillProject } from 'react-icons/ai';
import { FaBus, FaUserAlt } from 'react-icons/fa';
import { MdGroups } from 'react-icons/md';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
};

const SideBar = ({
    setActiveWidget,
    activeWidget,
}: {
    setActiveWidget: (key: number) => void;
    activeWidget: number;
}) => {
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    useEffect(() => {
        if (activeWidget === 3 || activeWidget === 4) {
            setOpenKeys(['employees']);
        } else {
            setOpenKeys([]);
        }
    }, [activeWidget]);
    const items: MenuItem[] = [
        getItem(
            'Dashboard',
            1,
            <AiFillProject style={{ fontSize: '1.5rem' }} />
        ),
        getItem('Bus', 2, <FaBus style={{ fontSize: '1.5rem' }} />),
        getItem(
            'Employees',
            'employees',
            <MdGroups style={{ fontSize: '1.5rem' }} />,
            [
                getItem(
                    'Driver',
                    3,
                    <FaUserAlt style={{ fontSize: '1rem' }} />
                ),
                getItem(
                    'Conductor',
                    4,
                    <FaUserAlt style={{ fontSize: '1rem' }} />
                ),
            ]
        ),
    ];

    return (
        <>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{
                    overflow: 'auto',
                    height: '100%',
                    position: 'sticky',
                }}
            >
                <div
                    style={{
                        color: '#fff',
                        padding: 16,
                        textAlign: 'start',
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}
                >
                    🚌 BusCorp
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[activeWidget.toString()]}
                    openKeys={openKeys}
                    onOpenChange={setOpenKeys}
                    items={items}
                    onClick={({ key }) => {
                        const parsedKey = parseInt(key, 10);
                        if (!isNaN(parsedKey)) {
                            setActiveWidget(parsedKey);
                            sessionStorage.setItem('homeActiveWidget', key);
                        }
                    }}
                />
            </Sider>
        </>
    );
};

export default SideBar;
