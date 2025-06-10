import { Layout, theme } from 'antd';
import { useEffect, useState } from 'react';

import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import DashBoard from '../../pages/DashBoard/DashBoard';
import BusesPage from '../../pages/Buses/Buses';
import DriversPage from '../../pages/Drivers/Drivers';
import ConductorsPage from '../../pages/Conductors/Conductors';
import RevenueChart from '../../components/Chart/RevenueChart';
import BusDetailsPage from '../../pages/Buses/BusDetailsPage';
import { useLocation, useNavigate } from 'react-router-dom';

const { Content } = Layout;
const HOME_ACTIVE_WIDGET_KEY = 'homeActiveWidget';

const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [selectedBusId, setSelectedBusIdState] = useState<string | null>(
        () => {
            return sessionStorage.getItem('selectedBusId');
        }
    );

    const [activeWidget, setActiveWidgetState] = useState<number>(() => {
        const saved = sessionStorage.getItem(HOME_ACTIVE_WIDGET_KEY);
        const parsed = saved ? parseInt(saved, 10) : 0;
        return !isNaN(parsed) ? parsed : 0;
    });

    // Handle reset from login only once
    useEffect(() => {
        if (location.state?.resetHomeWidget) {
            sessionStorage.setItem(HOME_ACTIVE_WIDGET_KEY, '0');
            setActiveWidgetState(0);
            // Clear the state so it doesn't persist on refresh
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    // Sync to sessionStorage when activeWidget changes
    useEffect(() => {
        sessionStorage.setItem(HOME_ACTIVE_WIDGET_KEY, activeWidget.toString());
    }, [activeWidget]);

    const setActiveWidget = (key: number) => {
        setActiveWidgetState(key);
    };

    const setSelectedBusId = (id: string | null) => {
        setSelectedBusIdState(id);
        if (id) {
            sessionStorage.setItem('selectedBusId', id);
        } else {
            sessionStorage.removeItem('selectedBusId');
        }
    };

    const renderWidget = (key: number) => {
        switch (key) {
            case 0:
                return (
                    <DashBoard
                        setActiveWidget={setActiveWidget}
                        setSelectedBusId={setSelectedBusId}
                    />
                );
            case 1:
                return (
                    <BusesPage
                        key={selectedBusId}
                        setActiveWidget={setActiveWidget}
                        setSelectedBusId={setSelectedBusId}
                    />
                );
            case 2:
                return <DriversPage />;
            case 3:
                return <ConductorsPage />;
            case 4:
                return (
                    <BusDetailsPage key={selectedBusId} busId={selectedBusId} />
                );
            default:
                return (
                    <DashBoard
                        setActiveWidget={setActiveWidget}
                        setSelectedBusId={setSelectedBusId}
                    />
                );
        }
    };

    return (
        <Layout style={{ height: '100vh', width: '100vw' }}>
            <SideBar
                setActiveWidget={setActiveWidget}
                activeWidget={activeWidget}
                collapsed={collapsed}
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
                    <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                    }}
                >
                    {activeWidget === 0 && (
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
