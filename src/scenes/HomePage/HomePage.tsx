import { Layout, theme } from 'antd';

import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { useState } from 'react';
import DashBoard from '../../pages/DashBoard/DashBoard';
import Buses from '../../pages/Buses/Buses';
import Drivers from '../../pages/Drivers/Drivers';
import Conductors from '../../pages/Conductors/Conductors';

const { Content } = Layout;
const HOME_ACTIVE_WIDGET_KEY = 'homeActiveWidget';

const HomePage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [activeWidget, setActiveWidgetState] = useState<number>(() => {
        const saved = sessionStorage.getItem(HOME_ACTIVE_WIDGET_KEY);
        const parsed = saved ? parseInt(saved, 10) : 0;
        return !isNaN(parsed) ? parsed : 0;
    });

    const setActiveWidget = (key: number) => {
        setActiveWidgetState(key);
    };

    const renderWidget = (key: number) => {
        switch (key) {
            case 1:
                return <DashBoard />;
            case 2:
                return <Buses />;
            case 3:
                return <Drivers />;
            case 4:
                return <Conductors />;
            case 5:
                return <div>Widget 5</div>;
            default:
                return <div>Widget 1</div>;
        }
    };

    return (
        <Layout style={{ height: '100vh', width: '100vw' }}>
            <SideBar
                setActiveWidget={setActiveWidget}
                activeWidget={activeWidget}
            />
            <div style={{ flex: 1, width: '100%' }}>
                <NavBar />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: '1rem',
                            minHeight: '85vh',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        }}
                    >
                        {renderWidget(activeWidget)}
                    </div>
                </Content>
            </div>
        </Layout>
    );
};

export default HomePage;
