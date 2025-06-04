import { Layout, theme } from 'antd';

import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { useState } from 'react';

const { Content } = Layout;
const HOME_ACTIVE_WIDGET_KEY = 'homeActiveWidget';

const Dashboard = () => {
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
                return <div>Widget 1</div>;
            case 2:
                return <div>Widget 2</div>;
            case 3:
                return <div>Widget 3</div>;
            case 4:
                return <div>Widget 4</div>;
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
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {renderWidget(activeWidget)}
                    </div>
                </Content>
            </div>
        </Layout>
    );
};

export default Dashboard;
