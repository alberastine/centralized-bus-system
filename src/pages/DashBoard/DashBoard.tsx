import { useEffect, useState } from 'react';
import { Card, Table, Row, Col, Skeleton } from 'antd';
import { supabase } from '../../services/supabaseClient';
import type { Buses, Drivers, Conductors } from '../../types';

const DashBoard = () => {
    const [buses, setBuses] = useState<Buses[]>([]);
    const [drivers, setDrivers] = useState<Drivers[]>([]);
    const [conductors, setConductors] = useState<Conductors[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
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
            setLoading(false);
        };

        fetchData();
    }, []);

    const busColumns = [
        {
            title: 'Route Number',
            dataIndex: 'route_number',
            key: 'route_number',
        },
        {
            title: 'Bus Number',
            dataIndex: 'bus_number',
            key: 'bus_number',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    const driverColumns = [
        {
            title: 'Name',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    const conductorColumns = [
        {
            title: 'Name',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
                <Card
                    title={`Total Buses: ${buses.length}`}
                    size="small"
                    bordered
                >
                    {loading ? (
                        <Skeleton active paragraph={{ rows: 4 }} />
                    ) : (
                        <Table
                            dataSource={buses}
                            columns={busColumns}
                            pagination={false}
                            rowKey="id"
                            size="small"
                        />
                    )}
                </Card>
            </Col>

            <Col xs={24} md={8}>
                <Card
                    title={`Total Drivers: ${drivers.length}`}
                    size="small"
                    bordered
                >
                    {loading ? (
                        <Skeleton active paragraph={{ rows: 4 }} />
                    ) : (
                        <Table
                            dataSource={drivers}
                            columns={driverColumns}
                            pagination={false}
                            rowKey="id"
                            size="small"
                        />
                    )}
                </Card>
            </Col>

            <Col xs={24} md={8}>
                <Card
                    title={`Total Conductors: ${conductors.length}`}
                    size="small"
                    bordered
                >
                    {loading ? (
                        <Skeleton active paragraph={{ rows: 4 }} />
                    ) : (
                        <Table
                            dataSource={conductors}
                            columns={conductorColumns}
                            pagination={false}
                            rowKey="id"
                            size="small"
                        />
                    )}
                </Card>
            </Col>
        </Row>
    );
};

export default DashBoard;
