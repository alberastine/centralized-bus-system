import { useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import BusList from '../../components/Bus/BusList';
import ConductorList from '../../components/Conductor/ConductorList';
import DriverList from '../../components/Driver/DriverList';
import { useBusStore } from '../../store/useBusStore';
import { useDriverStore } from '../../store/useDriverStore';
import { useConductorStore } from '../../store/useConductorStore';

const DashBoard = ({
    setActiveWidget,
    setSelectedBusId,
}: {
    setActiveWidget: (key: number) => void;
    setSelectedBusId: (id: string) => void;
}) => {
    const { busDetails, fetchBusData } = useBusStore();
    const { drivers } = useDriverStore();
    const { conductors } = useConductorStore();

    useEffect(() => {
        fetchBusData();
    }, [fetchBusData]);

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
                <Card title={`Total Buses: ${busDetails.length}`} size="small">
                    <BusList
                        setActiveWidget={setActiveWidget}
                        setSelectedBusId={setSelectedBusId}
                    />
                </Card>
            </Col>

            <Col xs={24} md={8}>
                <Card title={`Total Drivers: ${drivers.length}`} size="small">
                    <DriverList />
                </Card>
            </Col>

            <Col xs={24} md={8}>
                <Card
                    title={`Total Conductors: ${conductors.length}`}
                    size="small"
                >
                    <ConductorList />
                </Card>
            </Col>
        </Row>
    );
};

export default DashBoard;
