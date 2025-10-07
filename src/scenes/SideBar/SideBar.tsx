import { Layout, Menu, type MenuProps } from 'antd';
import { useEffect, useState } from 'react';

import { AiFillProject } from 'react-icons/ai';
import { FaBus, FaUserAlt, FaRegClock, FaFileAlt } from 'react-icons/fa';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
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
    collapsed,
}: {
    setActiveWidget: (key: number) => void;
    activeWidget: number;
    collapsed: boolean;
}) => {
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    useEffect(() => {
        if (activeWidget === 2 || activeWidget === 3) {
            setOpenKeys(['employees']);
        } else {
            setOpenKeys([]);
        }
    }, [activeWidget]);
    const items: MenuItem[] = [
        getItem(
            'Dashboard',
            0,
            <AiFillProject style={{ fontSize: '1.5rem' }} />
        ),
        getItem('Bus', 1, <FaBus style={{ fontSize: '1.5rem' }} />),
        getItem(
            'Employees',
            'employees',
            <MdGroups style={{ fontSize: '1.5rem' }} />,
            [
                getItem(
                    'Driver',
                    2,
                    <FaUserAlt style={{ fontSize: '1rem' }} />
                ),
                getItem(
                    'Conductor',
                    3,
                    <FaUserAlt style={{ fontSize: '1rem' }} />
                ),
            ]
        ),
        getItem(
            'Trip Management',
            4,
            <FaRegClock style={{ fontSize: '1.5rem' }} />
        ),
        getItem(
            'Salary Management',
            5,
            <FaMoneyBillTransfer style={{ fontSize: '1.5rem' }} />
        ),
        getItem('Reports', 6, <FaFileAlt style={{ fontSize: '1.5rem' }} />),
    ];

    return (
        <>
            <Sider
                // breakpoint="lg"
                // collapsedWidth="0"
                trigger={null}
                collapsible
                collapsed={collapsed}
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        gap: '8px',
                    }}
                >
                    {collapsed ? (
                        <img
                            src="/BUS.png"
                            alt="logo"
                            width="30px"
                            style={{
                                borderRadius: '50%',
                            }}
                        />
                    ) : (
                        <>
                            <img
                                src="/BUS.png"
                                alt="logo"
                                width="25px"
                                style={{
                                    borderRadius: '50%',
                                }}
                            />
                            <p>BusCentral PH</p>
                        </>
                    )}
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
