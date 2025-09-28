import { Card, Typography, Space } from 'antd';
import { MdDirectionsBus } from 'react-icons/md';

const { Title, Text } = Typography;

const BusSummaryCards = ({ busCount }: { busCount: number }) => {
    const statusCounts = {
        all: 12,
        active: 7,
        onTrip: 3,
        inRepair: 2,
    };
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
            }}
        >
            <Card
                hoverable
                style={{
                    transition: 'box-shadow 0.2s',
                }}
            >
                <Space
                    style={{ justifyContent: 'space-between', width: '100%' }}
                >
                    <Text>Total Buses</Text>
                    <MdDirectionsBus style={{ color: '#999' }} />
                </Space>
                <Title level={3}>{busCount || 0}</Title>
                <Text type="secondary">Fleet capacity</Text>
            </Card>

            <Card
                hoverable
                style={{
                    transition: 'box-shadow 0.2s',
                }}
            >
                <Space
                    style={{ justifyContent: 'space-between', width: '100%' }}
                >
                    <Text>Active</Text>
                    <div
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'green',
                        }}
                    />
                </Space>
                <Title level={3} style={{ color: 'green' }}>
                    {statusCounts.active || 0}
                </Title>
                <Text type="secondary">Ready for operation</Text>
            </Card>

            <Card
                hoverable
                style={{
                    transition: 'box-shadow 0.2s',
                }}
            >
                <Space
                    style={{ justifyContent: 'space-between', width: '100%' }}
                >
                    <Text>On Trip</Text>
                    <div
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'blue',
                        }}
                    />
                </Space>
                <Title level={3} style={{ color: 'blue' }}>
                    {statusCounts.onTrip || 0}
                </Title>
                <Text type="secondary">Currently operating</Text>
            </Card>

            <Card
                hoverable
                style={{
                    transition: 'box-shadow 0.2s',
                }}
            >
                <Space
                    style={{ justifyContent: 'space-between', width: '100%' }}
                >
                    <Text>In Repair</Text>
                    <div
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'red',
                        }}
                    />
                </Space>
                <Title level={3} style={{ color: 'red' }}>
                    {statusCounts.inRepair || 0}
                </Title>
                <Text type="secondary">Under maintenance</Text>
            </Card>
        </div>
    );
};

export default BusSummaryCards;
