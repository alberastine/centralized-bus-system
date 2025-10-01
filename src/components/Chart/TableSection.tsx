import { Card, Table, Tag } from 'antd';
import { FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ongoingTrips = [
    {
        busNo: 'Bus 001',
        driver: 'Mike Johnson',
        conductor: 'Sarah Wilson',
        route: 'Downtown → Airport',
        status: 'In Progress',
    },
    {
        busNo: 'Bus 003',
        driver: 'David Brown',
        conductor: 'Lisa Garcia',
        route: 'Mall → Central Station',
        status: 'In Progress',
    },
    {
        busNo: 'Bus 007',
        driver: 'James Davis',
        conductor: 'Emma Thompson',
        route: 'University → Beach',
        status: 'Delayed',
    },
    {
        busNo: 'Bus 012',
        driver: 'Robert Taylor',
        conductor: 'Anna Martinez',
        route: 'Suburbs → City Center',
        status: 'In Progress',
    },
];

const completedTrips = [
    {
        busNo: 'Bus 002',
        driver: 'John Smith',
        conductor: 'Mary Jones',
        completedTime: '2:45 PM',
        income: '₱1,345',
    },
    {
        busNo: 'Bus 005',
        driver: 'Chris Wilson',
        conductor: 'Jennifer Lee',
        completedTime: '2:30 PM',
        income: '₱1,528',
    },
    {
        busNo: 'Bus 008',
        driver: 'Michael Davis',
        conductor: 'Rachel Green',
        completedTime: '2:15 PM',
        income: '₱1,656',
    },
    {
        busNo: 'Bus 004',
        driver: 'William Brown',
        conductor: 'Amanda White',
        completedTime: '2:00 PM',
        income: '₱1,434',
    },
];

const upcomingPayouts = [
    {
        name: 'Mike Johnson',
        role: 'Driver',
        amount: '₱2,400',
        payoutDate: 'Oct 30',
    },
    {
        name: 'Sarah Wilson',
        role: 'Conductor',
        amount: '₱1,800',
        payoutDate: 'Oct 30',
    },
    {
        name: 'David Brown',
        role: 'Driver',
        amount: '₱2,350',
        payoutDate: 'Nov 1',
    },
    {
        name: 'Lisa Garcia',
        role: 'Conductor',
        amount: '₱1,750',
        payoutDate: 'Nov 1',
    },
    {
        name: 'James Davis',
        role: 'Driver',
        amount: '₱2,200',
        payoutDate: 'Nov 2',
    },
];

const getStatusTag = (status: string) => {
    switch (status) {
        case 'In Progress':
            return (
                <Tag
                    color="blue"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontSize: '12px',
                    }}
                >
                    <FaClock style={{ marginRight: 4 }} /> {status}
                </Tag>
            );
        case 'Delayed':
            return (
                <Tag
                    color="orange"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontSize: '12px',
                    }}
                >
                    <FaExclamationCircle style={{ marginRight: 4 }} /> {status}
                </Tag>
            );
        default:
            return <Tag>{status}</Tag>;
    }
};

const TableSection = () => {
    return (
        <>
            {/* Ongoing Trips */}
            <Card
                title={
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <FaClock style={{ color: '#2563eb' }} />
                        Ongoing Trips
                    </span>
                }
                style={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    marginTop: '1rem',
                }}
            >
                <Table
                    dataSource={ongoingTrips}
                    pagination={false}
                    rowKey="busNo"
                    columns={[
                        { title: 'Bus No.', dataIndex: 'busNo', key: 'busNo' },
                        {
                            title: 'Driver',
                            key: 'driver',
                            render: (_, record) => (
                                <div>
                                    <div
                                        style={{
                                            fontSize: '12px',
                                            color: '#6b7280',
                                        }}
                                    >
                                        {record.driver}
                                    </div>
                                </div>
                            ),
                        },
                        {
                            title: 'Conductor',
                            key: 'conductor',
                            render: (_, record) => (
                                <div>
                                    <div
                                        style={{
                                            fontSize: '12px',
                                            color: '#6b7280',
                                        }}
                                    >
                                        {record.conductor}
                                    </div>
                                </div>
                            ),
                        },
                        {
                            title: 'Route',
                            key: 'route',
                            render: (_, record) => (
                                <div>
                                    <div
                                        style={{
                                            fontSize: '12px',
                                            color: '#6b7280',
                                        }}
                                    >
                                        {record.route}
                                    </div>
                                </div>
                            ),
                        },
                        {
                            title: 'Status',
                            key: 'status',
                            render: (_, record) => getStatusTag(record.status),
                        },
                    ]}
                />
            </Card>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                }}
            >
                {/* Recently Completed Trips */}
                <Card
                    title={
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <FaCheckCircle style={{ color: '#16a34a' }} />
                            Recently Completed
                        </span>
                    }
                    style={{
                        borderRadius: '8px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    }}
                >
                    <Table
                        dataSource={completedTrips}
                        pagination={false}
                        rowKey="busNo"
                        columns={[
                            { title: 'Bus', dataIndex: 'busNo', key: 'busNo' },
                            {
                                title: 'Time',
                                key: 'completedTime',
                                render: (_, record) => (
                                    <div>
                                        <div style={{ fontWeight: 500 }}>
                                            {record.completedTime}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '12px',
                                                color: '#6b7280',
                                            }}
                                        >
                                            {record.driver}
                                        </div>
                                    </div>
                                ),
                            },
                            {
                                title: 'Income',
                                dataIndex: 'income',
                                key: 'income',
                                render: (income) => (
                                    <span
                                        style={{
                                            fontWeight: 600,
                                            color: '#16a34a',
                                        }}
                                    >
                                        {income}
                                    </span>
                                ),
                            },
                        ]}
                    />
                </Card>

                {/* Upcoming Salary Payouts */}
                <Card
                    title={
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <FaExclamationCircle style={{ color: '#ea580c' }} />
                            Upcoming Payouts
                        </span>
                    }
                    style={{
                        borderRadius: '8px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    }}
                >
                    <Table
                        dataSource={upcomingPayouts}
                        pagination={false}
                        rowKey="name"
                        columns={[
                            {
                                title: 'Employee',
                                key: 'employee',
                                render: (_, record) => (
                                    <div>
                                        <div style={{ fontWeight: 500 }}>
                                            {record.name}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '12px',
                                                color: '#6b7280',
                                            }}
                                        >
                                            {record.role}
                                        </div>
                                    </div>
                                ),
                            },
                            {
                                title: 'Amount',
                                key: 'amount',
                                render: (_, record) => (
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: 600,
                                                color: '#1890ff',
                                            }}
                                        >
                                            {record.amount}
                                        </div>
                                    </div>
                                ),
                            },
                            {
                                title: 'Date',
                                dataIndex: 'payoutDate',
                                key: 'payoutDate',
                            },
                        ]}
                    />
                </Card>
            </div>
        </>
    );
};

export default TableSection;
