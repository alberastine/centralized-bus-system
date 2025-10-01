import { Card, Descriptions, Tag, Table, Typography, Skeleton } from 'antd';
import { useEffect } from 'react';
import { useBusStore } from '../../store/useBusStore';
import { useDriverStore } from '../../store/useDriverStore';
import { useConductorStore } from '../../store/useConductorStore';
import AddBusPermit from '../../components/Bus/AddBusPermit';
import UpdateBusDetails from '../../components/Bus/UpdateBusDetails';

const { Title } = Typography;

const BusDetailsPage = ({ busId }: { busId: string | null }) => {
    const { drivers } = useDriverStore();
    const { conductors } = useConductorStore();
    const { busDetails, tripHistory, isLoadingBus, fetchBusDataById } =
        useBusStore();

    useEffect(() => {
        if (busId) fetchBusDataById(busId);
    }, [busId, fetchBusDataById]);

    const mergedTripHistory = tripHistory.map((trip) => {
        const driver = drivers.find((d) => d.driver_id === trip.driver_id);
        const conductor = conductors.find(
            (c) => c.conductor_id === trip.conductor_id
        );

        return {
            date: trip.trip_date,
            driver: driver ? driver.full_name : 'Unknown',
            conductor: conductor ? conductor.full_name : 'Unknown',
            trips: trip.trips,
            remitted: trip.remitted,
        };
    });

    // Mock data for bus information and documents
    // In a real application, this data would be fetched from a database or API.
    // This is just for demonstration purposes.

    const busInfo = {
        busNumber: 'BC-1021',
        plateNumber: 'XYZ-1234',
        condition: 'Good',
        status: 'Active',
        capacity: 55,
        route: 'Cebu City - Mandaue',
        dateAdded: '2024-11-12',
    };

    const documents = [
        { name: 'LTFRB Franchise', validUntil: '2026-05-01' },
        { name: 'Emission Test', validUntil: '2025-12-31' },
        { name: 'Insurance', validUntil: '2025-07-15' },
    ];

    //columns

    const documentcolumns = [
        {
            title: 'Document Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Valid Until',
            dataIndex: 'validUntil',
            key: 'validUntil',
        },
    ];

    const tripHistorycolumns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Driver',
            dataIndex: 'driver',
            key: 'driver',
        },
        {
            title: 'Conductor',
            dataIndex: 'conductor',
            key: 'conductor',
        },
        {
            title: 'Trips',
            dataIndex: 'trips',
            key: 'trips',
        },
        {
            title: 'Money Remitted (₱)',
            dataIndex: 'remitted',
            key: 'remitted',
            render: (val: number) => `₱${val.toLocaleString()}`,
        },
    ];

    const renderStatusTag = (status: string) => {
        const normalizedStatus = status.trim().toLowerCase();
        switch (normalizedStatus) {
            case 'active':
                return <Tag color="green">Active</Tag>;
            case 'under maintenance':
                return <Tag color="geekblue">Under Maintenance</Tag>;
            case 'inactive':
                return <Tag color="volcano">Inactive</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };

    if (!busId) {
        return <div>Please select a bus to view details.</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Title level={3} style={{ margin: '0' }}>
                Bus Details
            </Title>

            <Card title="Basic Information" extra={<UpdateBusDetails  busId={busId}/>}>
                {isLoadingBus ? (
                    <Skeleton active paragraph={{ rows: 4 }} />
                ) : (
                    busDetails.map((bus) => (
                        <Descriptions
                            key={bus.bus_id}
                            bordered
                            column={2}
                            size="small"
                        >
                            <Descriptions.Item label="Bus Number">
                                {bus.bus_number}
                            </Descriptions.Item>
                            <Descriptions.Item label="Route Number">
                                {bus.route_number}
                            </Descriptions.Item>
                            <Descriptions.Item label="Plate Number">
                                {bus.plate_number}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status">
                                {renderStatusTag(
                                    typeof bus.status === 'string'
                                        ? bus.status
                                        : bus.status
                                        ? 'Active'
                                        : 'Under Maintenance'
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Condition">
                                {busInfo.condition}
                            </Descriptions.Item>

                            <Descriptions.Item label="Capacity">
                                {busInfo.capacity} passengers
                            </Descriptions.Item>
                            <Descriptions.Item label="Route">
                                {busInfo.route}
                            </Descriptions.Item>
                            <Descriptions.Item label="Date Added">
                                {busInfo.dateAdded}
                            </Descriptions.Item>
                        </Descriptions>
                    ))
                )}
            </Card>

            <Card title="Documents" extra={<AddBusPermit  busId={busId}/>}>
                {isLoadingBus ? (
                    <Skeleton active paragraph={{ rows: 3 }} />
                ) : (
                    <Table
                        dataSource={documents}
                        columns={documentcolumns}
                        rowKey="name"
                        pagination={false}
                        size="small"
                    />
                )}
            </Card>

            <Card title="Driver and Conductor History">
                {isLoadingBus ? (
                    <Skeleton active paragraph={{ rows: 5 }} />
                ) : (
                    <Table
                        dataSource={mergedTripHistory}
                        columns={tripHistorycolumns}
                        rowKey="date"
                        pagination={{ pageSize: 5 }}
                        size="small"
                    />
                )}
            </Card>
        </div>
    );
};

export default BusDetailsPage;
