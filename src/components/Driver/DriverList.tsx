import { useEffect } from 'react';
import { Table, Skeleton } from 'antd';
import { useDriverStore } from '../../store/useDriverStore';

const DriverList = () => {
    const { drivers, fetchDriverData, loading } = useDriverStore();

    useEffect(() => {
        fetchDriverData();
    }, [fetchDriverData]);

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
    return (
        <div>
            {loading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
                <Table
                    dataSource={drivers}
                    columns={driverColumns}
                    pagination={false}
                    rowKey="driver_id"
                    size="small"
                    onRow={(record) => ({
                        onClick: () => {
                            console.log(`Driver clicked: ${record.driver_id}`);
                        },
                    })}
                />
            )}
        </div>
    );
};

export default DriverList;
