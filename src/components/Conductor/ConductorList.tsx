import { useEffect } from 'react';
import { Table, Skeleton } from 'antd';
import { useConductorStore } from '../../store/useConductorStore';

const ConductorList = () => {
    const { conductors, loading, fetchConductorData } = useConductorStore();

    useEffect(() => {
        fetchConductorData();
    }, [fetchConductorData]);

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
        <div>
            {loading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
                <Table
                    dataSource={conductors}
                    columns={conductorColumns}
                    pagination={false}
                    rowKey="conductor_id"
                    size="small"
                />
            )}
        </div>
    );
};

export default ConductorList;
