import { Layout, theme } from 'antd';
import { useState } from 'react';

import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import DashBoard from '../../pages/DashBoard/DashBoard';
import BusesPage from '../../pages/Buses/Buses';
import DriversPage from '../../pages/Drivers/Drivers';
import ConductorsPage from '../../pages/Conductors/Conductors';
import RevenueChart from '../../components/Chart/RevenueChart';
import BusDetailsPage from '../../pages/Buses/BusDetailsPage';

const { Content } = Layout;
const HOME_ACTIVE_WIDGET_KEY = 'homeActiveWidget';

const HomePage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [activeWidget, setActiveWidgetState] = useState<number>(() => {
        const saved = sessionStorage.getItem(HOME_ACTIVE_WIDGET_KEY);
        const parsed = saved ? parseInt(saved, 10) : 1;
        return !isNaN(parsed) ? parsed : 1;
    });

    const setActiveWidget = (key: number) => {
        setActiveWidgetState(key);
    };

    const renderWidget = (key: number) => {
        switch (key) {
            case 1:
                return <DashBoard setActiveWidget={setActiveWidget}/>;
            case 2:
                return <BusesPage setActiveWidget={setActiveWidget} />;
            case 3:
                return <DriversPage />;
            case 4:
                return <ConductorsPage />;
            case 5:
                return <BusDetailsPage />;
            default:
                return <DashBoard setActiveWidget={setActiveWidget} />;
        }
    };

    return (
        <Layout style={{ height: '100vh', width: '100vw' }}>
            <SideBar
                setActiveWidget={setActiveWidget}
                activeWidget={activeWidget}
            />
            <div style={{ flex: 1, width: '100%', overflow: 'auto' }}>
                <div
                    style={{
                        width: '100%',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                    }}
                >
                    <NavBar />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                    }}
                >
                    {activeWidget === 1 && (
                        <div
                            style={{
                                height: '20%',
                                width: '100%',
                                marginTop: '1.5rem',
                                padding: '0 1rem',
                            }}
                        >
                            <RevenueChart />
                        </div>
                    )}

                    <Content style={{ margin: '24px 16px 0', height: '100%' }}>
                        <div
                            style={{
                                padding: '1rem',
                                minHeight: '47vh',
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            {renderWidget(activeWidget)}
                        </div>
                    </Content>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
