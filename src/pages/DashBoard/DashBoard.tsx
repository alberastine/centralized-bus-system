import { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { supabase } from '../../services/supabaseClient';
import type { Buses, Drivers, Conductors } from '../../types';
import BusList from '../../components/Bus/BusList';
import ConductorList from '../../components/Conductor/ConductorList';
import DriverList from '../../components/Driver/DriverList';

const DashBoard = ({
    setActiveWidget,
}: {
    setActiveWidget: (key: number) => void;
}) => {
    const [buses, setBuses] = useState<Buses[]>([]);
    const [drivers, setDrivers] = useState<Drivers[]>([]);
    const [conductors, setConductors] = useState<Conductors[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data: busData } = await supabase.from('buses').select('*');
            const { data: driverData } = await supabase
                .from('drivers')
                .select('*');
            const { data: conductorData } = await supabase
                .from('conductors')
                .select('*');

            setBuses(busData || []);
            setDrivers(driverData || []);
            setConductors(conductorData || []);
        };

        fetchData();
    }, []);

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
                <Card title={`Total Buses: ${buses.length}`} size="small">
                    <BusList setActiveWidget={setActiveWidget} />
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
