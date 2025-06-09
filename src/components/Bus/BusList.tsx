import { useEffect } from 'react';
import { Table, Skeleton } from 'antd';
import { useBusStore } from '../../store/useBusStore';

const BusList = ({
    setActiveWidget,
    setSelectedBusId,
}: {
    setActiveWidget: (key: number) => void;
    setSelectedBusId: (id: string) => void;
}) => {
    const { busDetails, fetchBusData, loading } = useBusStore();

    useEffect(() => {
        fetchBusData();
    }, [fetchBusData]);

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
        {
            title: 'Plate Number',
            dataIndex: 'plate_number',
            key: 'plate_number',
        },
    ];

    return (
        <div>
            {loading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
                <Table
                    dataSource={busDetails}
                    columns={busColumns}
                    scroll={{ y: 55 * 9 }}
                    pagination={false}
                    rowKey="bus_id"
                    size="small"
                    onRow={(record) => ({
                        onClick: () => {
                            setActiveWidget(4);
                            setSelectedBusId(record.bus_id);
                        },
                    })}
                />
            )}
        </div>
    );
};

export default BusList;
